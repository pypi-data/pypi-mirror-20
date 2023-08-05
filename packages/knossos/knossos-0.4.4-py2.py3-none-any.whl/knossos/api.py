## Copyright 2017 Knossos authors, see NOTICE file
##
## Licensed under the Apache License, Version 2.0 (the "License");
## you may not use this file except in compliance with the License.
## You may obtain a copy of the License at
##
##     http://www.apache.org/licenses/LICENSE-2.0
##
## Unless required by applicable law or agreed to in writing, software
## distributed under the License is distributed on an "AS IS" BASIS,
## WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
## See the License for the specific language governing permissions and
## limitations under the License.

from __future__ import absolute_import, print_function

import sys
import os
import logging
import json
import shlex
import glob
import pickle

from . import uhf
uhf(__name__)

from . import center, util, repo, launcher, integration
from .qt import QtCore, QtWidgets
from .tasks import run_task, CheckUpdateTask, CheckTask, FetchTask, InstallTask, UninstallTask
from .ui.select_list import Ui_SelectListDialog
from .windows import ModSettingsWindow, ModInstallWindow
from .repo import ModNotFound
from .ipc import IPCComm
from .runner import run_fs2, run_fred, run_fs2_silent, stringify_cmdline

# TODO: Split this file up into smaller parts and move them into the respective modules
# (i.e. run_mod should be in runner).

ipc_block = None
translate = QtCore.QCoreApplication.translate


def save_settings():
    center.settings['hash_cache'] = dict()
    for path, info in util.HASH_CACHE.items():
        # Skip deleted files
        if os.path.exists(path):
            center.settings['hash_cache'][path] = info

    for mod in center.settings['cmdlines'].copy():
        if mod != '#default' and mod not in center.installed.mods:
            del center.settings['cmdlines'][mod]

    center.settings['pins'] = center.installed.pins

    with open(os.path.join(center.settings_path, 'settings.pick'), 'wb') as stream:
        pickle.dump(center.settings, stream, 2)


def select_fs2_path(interact=True, tc_mode=False):
    if interact:
        if center.settings['fs2_path'] is None:
            path = os.path.expanduser('~')
        else:
            path = center.settings['fs2_path']

        if tc_mode:
            title = translate('api', 'Please select the installation directory.')
        else:
            title = translate('api', 'Please select your FS2 directory.')

        fs2_path = QtWidgets.QFileDialog.getExistingDirectory(
            center.main_win.win, title, path)
    else:
        fs2_path = center.settings['fs2_path']

    if fs2_path is not None and os.path.isdir(fs2_path):
        center.settings['fs2_path'] = os.path.abspath(fs2_path)

        bins = get_executables()
        if len(bins) == 1:
            # Found only one binary, select it by default.

            center.settings['fs2_bin'] = bins[0][1]
        elif len(bins) > 1:
            # Let the user choose.

            select_win = util.init_ui(Ui_SelectListDialog(), QtWidgets.QDialog(center.main_win.win))
            has_default = False
            bins.sort()

            for i, path in enumerate(bins):
                select_win.listWidget.addItem(path[0])

                if not has_default and 'DEBUG' not in path[0]:
                    # Select the first non-debug build as default.

                    select_win.listWidget.setCurrentRow(i)
                    has_default = True

            select_win.listWidget.itemDoubleClicked.connect(select_win.accept)
            select_win.okButton.clicked.connect(select_win.accept)
            select_win.cancelButton.clicked.connect(select_win.reject)

            if select_win.exec_() == QtWidgets.QDialog.Accepted:
                center.settings['fs2_bin'] = bins[select_win.listWidget.currentRow()][1]

            select_win.deleteLater()
        else:
            center.settings['fs2_bin'] = None

        center.main_win.check_fso()
        center.signals.fs2_path_changed.emit()

        if center.settings['fs2_bin'] is not None:
            center.signals.fs2_bin_changed.emit()


def get_fso_flags():
    global fso_flags

    if center.settings['fs2_bin'] is None:
        return None

    if center.fso_flags is not None and center.fso_flags[0] == center.settings['fs2_bin']:
        return center.fso_flags[1]

    fs2_bin = os.path.join(center.settings['fs2_path'], center.settings['fs2_bin'])
    if not os.path.isfile(fs2_bin):
        return None

    if sys.platform.startswith('win'):
        flags_path = os.path.join(center.settings['fs2_path'], os.path.dirname(center.settings['fs2_bin']), 'flags.lch')
    else:
        flags_path = os.path.join(center.settings['fs2_path'], 'flags.lch')

    rc = run_fs2_silent(['-get_flags'])

    flags = None

    if rc != 1 and rc != 0:
        logging.error('Failed to run FSO! (Exit code was %d)', rc)
    elif not os.path.isfile(flags_path):
        logging.error('Could not find the flags file "%s"!', flags_path)
    else:
        with open(flags_path, 'rb') as stream:
            flags = util.FlagsReader(stream)

    center.fso_flags = (center.settings['fs2_bin'], flags)
    return flags


def get_executables():
    exes = []
    fs2_path = center.settings['fs2_path']

    for mid, mvs in center.installed.mods.items():
        for mod in mvs:
            for pkg in mod.packages:
                for item in pkg.executables:
                    name = mod.title + ' ' + item.get('version', '')
                    if item.get('debug', False):
                        name += ' (DEBUG)'

                    path = os.path.join(mod.folder, item['file'])
                    exes.append((name, path))

    if fs2_path is not None and os.path.isdir(fs2_path):
        fs2_path = os.path.abspath(fs2_path)
        if sys.platform == 'darwin':
            for app in glob.glob(os.path.join(fs2_path, '*.app')):
                name = os.path.basename(app)
                exes.append((name, os.path.join(name, 'Contents', 'MacOS', name[:-4])))
        else:
            bins = glob.glob(os.path.join(fs2_path, 'f*2_open_*'))

            for path in bins:
                path = os.path.basename(path)

                if not path.endswith(('.map', '.pdb')):
                    exes.append((path, path))

    return exes


def fetch_list():
    return run_task(FetchTask())


def get_cmdline(mod):
    if mod is None:
        return center.settings['cmdlines'].get('#default', [])[:]

    if mod.mid in center.settings['cmdlines']:
        return center.settings['cmdlines'][mod.mid][:]
    elif mod.cmdline != '':
        return shlex.split(mod.cmdline)
    else:
        return center.settings['cmdlines'].get('#default', [])[:]


def get_old_fso_profile_path():
    if sys.platform.startswith('linux'):
        leg_path = os.path.expanduser('~/.fs2_open')
    elif sys.platform == 'darwin':
        leg_path = os.path.expanduser('~/Library/FS2_Open')
    else:
        leg_path = center.settings['fs2_path']

    return leg_path


_new_profile_path = None
def get_new_fso_profile_path():
    global _new_profile_path

    if _new_profile_path is None:
        try:
            _new_profile_path = util.check_output(launcher.get_cmd(['--fso-config-path'])).strip()
        except:
            logging.exception('Failed to retrieve FSO profile path from SDL!')
            _new_profile_path = 'None'

    return _new_profile_path


def get_fso_profile_path():
    path = get_new_fso_profile_path()
    leg_path = get_old_fso_profile_path()

    if leg_path and (path in ('', 'None') or
        (not os.path.exists(os.path.join(path, 'fs2_open.ini')) and os.path.exists(leg_path))
    ):
        profile_path = leg_path
    else:
        profile_path = path

    logging.info('Using profile path "%s".', profile_path)
    return profile_path


def read_fso_cmdline():
    # Look for the cmdline path.
    path = get_fso_profile_path()
    if path is None:
        return []

    path = os.path.join(path, 'data/cmdline_fso.cfg')

    # Read the current cmdline.
    cmdline = []
    if os.path.exists(path):
        try:
            with open(path, 'r') as stream:
                cmdline = shlex.split(stream.read().strip())
        except:
            logging.exception('Failed to read "%s", assuming empty cmdline.', path)

    for i, part in enumerate(cmdline):
        if part.strip() == '-mod':
            del cmdline[i]

            if len(cmdline) > i:
                del cmdline[i]

            break

    return cmdline


def run_mod(mod, fred=False):
    global installed

    if mod is None:
        mod = repo.Mod()

    modpath = util.ipath(os.path.join(center.settings['fs2_path'], mod.folder))
    mods = []

    def check_install():
        if not os.path.isdir(modpath) or mod.mid not in center.installed.mods:
            QtWidgets.QMessageBox.critical(center.app.activeWindow(), translate('api', 'Error'),
                translate('api', 'Failed to install "%s"! Check the log for more information.') % (mod.title))
        else:
            run_mod(mod)

    if center.settings['fs2_bin'] is None:
        select_fs2_path()

        if center.settings['fs2_bin'] is None:
            QtWidgets.QMessageBox.critical(center.app.activeWindow(), translate('api', 'Error'),
                translate('api', 'I couldn\'t find a FS2 executable. Can\'t run FS2!!'))
            return

    try:
        inst_mod = center.installed.query(mod)
    except repo.ModNotFound:
        inst_mod = None

    if inst_mod is None:
        deps = center.mods.process_pkg_selection(mod.resolve_deps())
        titles = [pkg.name for pkg in deps if not center.installed.is_installed(pkg)]

        msg = QtWidgets.QMessageBox()
        msg.setIcon(QtWidgets.QMessageBox.Question)
        msg.setText(translate('api', 'You don\'t have %s, yet. Shall I install it?') % (mod.title))
        msg.setInformativeText(translate('api', '%s will be installed.') % (', '.join(titles)))
        msg.setStandardButtons(QtWidgets.QMessageBox.Yes | QtWidgets.QMessageBox.No)
        msg.setDefaultButton(QtWidgets.QMessageBox.Yes)

        if msg.exec_() == QtWidgets.QMessageBox.Yes:
            task = InstallTask(deps)
            task.done.connect(check_install)
            run_task(task)

        return

    try:
        mods = mod.get_mod_flag()
    except repo.ModNotFound as exc:
        QtWidgets.QMessageBox.critical(None, 'Knossos',
            translate('api', 'Sorry, I can\'t start this mod because its dependency "%s" is missing!') % exc.mid)
        return

    if mods is None:
        return

    # Look for the cmdline path.
    path = os.path.join(get_fso_profile_path(), 'data/cmdline_fso.cfg')
    cmdline = get_cmdline(mod)

    if len(mods) == 0:
        for i, part in enumerate(cmdline):
            if part == '-mod':
                del cmdline[i]

                if len(cmdline) > i:
                    del cmdline[i]

                break

    elif '-mod' not in cmdline:
        cmdline.append('-mod')
        cmdline.append(','.join(mods))

    if not os.path.isfile(path):
        basep = os.path.dirname(path)
        if not os.path.isdir(basep):
            os.makedirs(basep)

    try:
        with open(path, 'w') as stream:
            stream.write(stringify_cmdline(cmdline))
    except:
        logging.exception('Failed to modify "%s". Not starting FS2!!', path)

        QtWidgets.QMessageBox.critical(center.app.activeWindow(), translate('api', 'Error'),
            translate('api', 'Failed to edit "%s"! I can\'t change the current mod!') % path)
    else:
        logging.info('Starting mod "%s" with cmdline "%s".', mod.title, cmdline)

        center.settings['last_played'] = mod.mid
        save_settings()

        if fred:
            run_fred()
        else:
            run_fs2()


def check_retail_files():
    if center.settings['fs2_path'] is None:
        return

    has_retail = False
    for item in os.listdir(center.settings['fs2_path']):
        if item.lower() == 'root_fs2.vp':
            has_retail = True
            break

    if has_retail:
        logging.debug('The FS2 path (%s) contains retail files!', center.settings['fs2_path'])
    else:
        logging.debug('The FS2 path (%s) does not contain retail files!', center.settings['fs2_path'])

    if has_retail != center.has_retail:
        center.has_retail = has_retail
        run_task(CheckTask())


##############
# Public API #
##############


def is_fso_installed():
    fs2_path = center.settings['fs2_path']
    if fs2_path is not None:
        fs2_bin = os.path.join(fs2_path, center.settings['fs2_bin'])

    return fs2_path is not None and fs2_bin is not None and os.path.isdir(fs2_path) and os.path.isfile(fs2_bin)


def get_mod(mid, version=None):
    if center.mods is None:
        QtWidgets.QMessageBox.critical(None, 'Knossos', translate('api', 'Hmm... I never got a mod list. Get a coder!'))
        return None
    else:
        try:
            return center.mods.query(mid, version)
        except ModNotFound:
            QtWidgets.QMessageBox.critical(None, 'Knossos', translate('api', 'Mod "%s" could not be found!') % mid)
            return None


# TODO: Create a proper window for this and move it to the windows module.
def uninstall_pkgs(pkgs, name=None, cb=None):
    titles = [pkg.name for pkg in pkgs if center.installed.is_installed(pkg)]

    if name is None:
        name = translate('api', 'these packages')

    msg = QtWidgets.QMessageBox()
    msg.setIcon(QtWidgets.QMessageBox.Question)
    msg.setText(translate('api', 'Do you really want to uninstall %s?') % name)
    msg.setInformativeText(translate('api', '%s will be removed.') % (', '.join(titles)))
    msg.setStandardButtons(QtWidgets.QMessageBox.Yes | QtWidgets.QMessageBox.No)
    msg.setDefaultButton(QtWidgets.QMessageBox.No)

    if msg.exec_() == QtWidgets.QMessageBox.Yes:
        task = UninstallTask(pkgs)
        if cb is not None:
            task.done.connect(cb)

        run_task(task)
        return True
    else:
        return False


#########
# Tools #
#########


def install_scheme_handler(interactive=True):
    logging.info('Installing scheme handler...')

    try:
        if integration.current.install_scheme_handler():
            if interactive:
                QtWidgets.QMessageBox.information(None, 'Knossos', translate('api', 'Done!'))
            return
    except:
        logging.exception('Failed to install the scheme handler!')

    QtWidgets.QMessageBox.critical(None, 'Knossos',
        translate('api', 'I probably failed to install the scheme handler.\nRun me as administrator and try again.'))


def setup_ipc():
    global ipc_block

    ipc_block = IPCComm(center.settings_path)
    ipc_block.messageReceived.connect(handle_ipc)
    ipc_block.listen()


def shutdown_ipc():
    global ipc_block

    ipc_block.close()


def handle_ipc(msg):
    msg = msg.data().decode('utf8', 'ignore').strip()

    try:
        msg = json.loads(msg)
    except:
        logging.exception('Failed to parse IPC message %s.', msg)
        return

    if msg[0] == 'focus':
        center.main_win.win.activateWindow()
        center.main_win.win.raise_()
    elif msg[0] == 'run':
        if len(msg) < 2:
            QtWidgets.QMessageBox.critical(None, 'Knossos',
                translate('api.handle_ipc', 'The fso://run/<mod id> link is missing a parameter!'))
        else:
            mod = get_mod(msg[1])

            if mod is not None:
                run_mod(mod)
            else:
                QtWidgets.QMessageBox.critical(None, 'Knossos',
                    translate('api.handle_ipc', 'The mod "%s" was not found!') % msg[1])
    elif msg[0] == 'install':
        if len(msg) < 2:
            QtWidgets.QMessageBox.critical(None, 'Knossos',
                translate('api.handle_ipc', 'The fso://install/<mod id> link is missing a parameter!'))
            return

        mod = get_mod(msg[1])
        pkgs = []

        if not mod:
            # TODO: Maybe we should update the mod DB here?
            QtWidgets.QMessageBox.critical(None, 'Knossos',
                translate('api.handle_ipc', 'The mod "%s" was not found!') % msg[1])
            return

        if len(msg) > 2:
            for pname in msg[2:]:
                for pkg in mod.packages:
                    if pkg.name == pname:
                        pkgs.append(pkg)

        center.main_win.win.activateWindow()

        if mod.mid not in center.installed.mods:
            ModInstallWindow(mod, pkgs)
        else:
            QtWidgets.QMessageBox.information(None, 'Knossos',
                translate('api.handle_ipc', 'Mod "%s" is already installed!') % (mod.title))
    elif msg[0] == 'settings':
        center.main_win.win.activateWindow()

        if len(msg) == 1 or msg[1] == '':
            center.main_win.show_fso_settings()
        else:
            mod = get_mod(msg[1])

            if mod is None or mod.mid not in center.installed.mods:
                if mod is None:
                    name = msg[1]
                else:
                    name = mod.title

                QtWidgets.QMessageBox.information(None, 'Knossos',
                    translate('api.handle_ipc', 'Mod "%s" is not yet installed!') % (name))
            else:
                ModSettingsWindow(mod)
    else:
        QtWidgets.QMessageBox.critical(None, 'Knossos',
            translate('api.handle_ipc', 'The action "%s" is unknown!') % (msg[0]))


def _read_default_cmdline():
    if '#default' not in center.settings['cmdlines']:
        center.settings['cmdlines']['#default'] = read_fso_cmdline()


def enable_raven():
    try:
        from raven import Client
    except ImportError:
        logging.exception('Failed to import raven!')
        return False

    from raven.transport.threaded_requests import ThreadedRequestsHTTPTransport
    from raven.handlers.logging import SentryHandler

    if hasattr(sys, 'frozen'):
        from six.moves.urllib.parse import quote as urlquote
        center.SENTRY_DSN += '&ca_certs=' + urlquote(os.path.join(sys._MEIPASS, 'requests', 'cacert.pem'))

    center.raven = Client(
        center.SENTRY_DSN,
        release=center.VERSION,
        environment='debug' if center.DEBUG else 'production',
        transport=ThreadedRequestsHTTPTransport
    )
    center.raven.tags_context({
        'os': sys.platform
    })
    center.raven_handler = SentryHandler(center.raven, level=logging.ERROR)
    logging.getLogger().addHandler(center.raven_handler)

    return True


def disable_raven():
    if center.raven_handler:
        logging.getLogger().removeHandler(center.raven_handler)

    center.raven = None
    center.raven_handler = None


def init_self():
    setup_ipc()
    center.signals.fs2_path_changed.connect(_read_default_cmdline)
    center.signals.fs2_path_changed.connect(check_retail_files)

    center.main_win.check_fso(False)
    center.main_win.update_mod_list()

    if center.settings['update_notify'] and not center.VERSION.endswith('-dev'):
        run_task(CheckUpdateTask())
