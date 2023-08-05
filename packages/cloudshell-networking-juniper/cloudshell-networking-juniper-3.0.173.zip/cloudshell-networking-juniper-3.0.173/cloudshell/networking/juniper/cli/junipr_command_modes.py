from collections import OrderedDict

from cloudshell.cli.command_mode import CommandMode
from cloudshell.shell.core.api_utils import decrypt_password
from cloudshell.shell.core.context_utils import get_attribute_by_name
import cloudshell.networking.model.networking_standard_attributes as attributes


class CliCommandMode(CommandMode):
    PROMPT = r'%\s*$'
    ENTER_COMMAND = ''
    EXIT_COMMAND = 'exit'

    def __init__(self, context, api):
        self._context = context
        self._api = api
        CommandMode.__init__(self, CliCommandMode.PROMPT, CliCommandMode.ENTER_COMMAND,
                             CliCommandMode.EXIT_COMMAND, enter_action_map=self.enter_action_map(),
                             exit_action_map=self.exit_action_map(), enter_error_map=self.enter_error_map(),
                             exit_error_map=self.exit_error_map())

    def enter_actions(self, cli_operations):
        pass

    def enter_action_map(self):
        return OrderedDict()

    def enter_error_map(self):
        return OrderedDict()

    def exit_action_map(self):
        return OrderedDict()

    def exit_error_map(self):
        return OrderedDict()


class DefaultCommandMode(CommandMode):
    PROMPT = r'>\s*$'
    ENTER_COMMAND = 'cli'
    EXIT_COMMAND = 'exit'

    def __init__(self, context, api):
        self._context = context
        self._api = api
        CommandMode.__init__(self, DefaultCommandMode.PROMPT,
                             DefaultCommandMode.ENTER_COMMAND,
                             DefaultCommandMode.EXIT_COMMAND, enter_action_map=self.enter_action_map(),
                             exit_action_map=self.exit_action_map(), enter_error_map=self.enter_error_map(),
                             exit_error_map=self.exit_error_map())

    def enter_actions(self, cli_operations):
        cli_operations.send_command('set cli screen-length 0')

    def enter_action_map(self):
        return OrderedDict()

    def enter_error_map(self):
        return OrderedDict([(r'[Ee]rror:', 'Command error')])

    def exit_action_map(self):
        return OrderedDict()

    def exit_error_map(self):
        return OrderedDict([(r'[Ee]rror:', 'Command error')])


class ConfigCommandMode(CommandMode):
    PROMPT = r'\[edit\]\n.*#\s*$'
    ENTER_COMMAND = 'configure'
    EXIT_COMMAND = 'exit'

    def __init__(self, context, api):
        self._context = context
        self._api = api
        CommandMode.__init__(self, ConfigCommandMode.PROMPT,
                             ConfigCommandMode.ENTER_COMMAND,
                             ConfigCommandMode.EXIT_COMMAND, enter_action_map=self.enter_action_map(),
                             exit_action_map=self.exit_action_map(), enter_error_map=self.enter_error_map(),
                             exit_error_map=self.exit_error_map())

    def enter_action_map(self):
        return OrderedDict([(r'[Pp]assword', lambda session, logger: session.send_line(
            decrypt_password(self._api,
                             get_attribute_by_name(attributes.ENABLE_PASSWORD, self._context) or get_attribute_by_name(
                                 attributes.PASSWORD, self._context))))])

    def enter_error_map(self):
        return OrderedDict([(r'[Ee]rror:', 'Command error')])

    def exit_action_map(self):
        return OrderedDict()

    def exit_error_map(self):
        return OrderedDict([(r'[Ee]rror:', 'Command error')])


CommandMode.RELATIONS_DICT = {
    CliCommandMode: {
        DefaultCommandMode: {
            ConfigCommandMode: {}
        }
    }
}


# Not mandatory modes
class EditSnmpCommandMode(CommandMode):
    PROMPT = r'\[edit snmp\]\n.*#\s*$'
    ENTER_COMMAND = 'edit snmp'
    EXIT_COMMAND = 'exit'

    def __init__(self):
        CommandMode.__init__(self, EditSnmpCommandMode.PROMPT,
                             EditSnmpCommandMode.ENTER_COMMAND,
                             EditSnmpCommandMode.EXIT_COMMAND)
