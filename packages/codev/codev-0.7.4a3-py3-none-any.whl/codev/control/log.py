import logging
import sys

from colorama import Fore as color

from codev.core.log import LOGLEVELS, error_filter, info_filter, debug_filter


def logging_config(loglevel=None, control_perform=False):
    """
    :param loglevel:
    :param control_command:
    :param perform:
    :param control_perform:
    :return:
    """
    global actual_loglevel

    if loglevel is None:
        loglevel = actual_loglevel
    else:
        actual_loglevel = loglevel

    control_perform_loglevel = logging.DEBUG if control_perform else logging.INFO

    loglevel = LOGLEVELS[loglevel]

    shell_formatter = logging.Formatter(
        color.RESET + '%(message)s'
    )

    control_info_formatter = logging.Formatter(
        color.BLUE + '[CONTROL]' + color.RESET + ' [%(levelname)s] %(message)s'
    )

    control_formatter = logging.Formatter(
        color.BLUE + '[CONTROL]' + color.RESET + ' [%(levelname)s] <%(name)s:%(lineno)s> %(message)s'
    )

    control_error_formatter = logging.Formatter(
        color.BLUE + '[CONTROL]' + color.RED + ' [%(levelname)s] %(message)s' + color.RESET
    )

    control_debug_formatter = logging.Formatter(
        color.BLUE +
        '[CONTROL]' + color.RESET +
        ' [%(levelname)s]' +
        color.MAGENTA +
        ' [DEBUG] %(message)s' +
        color.RESET
    )

    # logger for output from remote run
    control_command_perform_formatter = logging.Formatter(
        color.YELLOW + '[PERFORM]' + color.RESET + ' %(message)s'
    )
    control_command_output_formatter = logging.Formatter(
        color.BLUE +
        '[CONTROL]' +
        color.RESET +
        ' [%(levelname)s]' +
        color.CYAN +
        ' [OUTPUT] %(message)s' +
        color.RESET
    )

    shell_handler = logging.StreamHandler(stream=sys.stdout)
    shell_handler.setLevel(logging.DEBUG)
    shell_handler.formatter = shell_formatter

    control_error_handler = logging.StreamHandler(stream=sys.stderr)
    control_error_handler.setLevel(logging.ERROR)
    control_error_handler.formatter = control_error_formatter
    control_error_handler.addFilter(error_filter)

    control_info_handler = logging.StreamHandler(stream=sys.stdout)
    control_info_handler.setLevel(logging.INFO)
    control_info_handler.formatter = control_info_formatter
    control_info_handler.addFilter(info_filter)

    control_handler = logging.StreamHandler(stream=sys.stdout)
    control_handler.setLevel(logging.DEBUG)
    control_handler.formatter = control_formatter
    control_handler.addFilter(debug_filter)

    control_debug_handler = logging.StreamHandler(stream=sys.stdout)
    control_debug_handler.setLevel(loglevel)
    control_debug_handler.formatter = control_debug_formatter

    control_command_perform_handler = logging.StreamHandler(stream=sys.stdout)
    control_command_perform_handler.setLevel(control_perform_loglevel)
    control_command_perform_handler.formatter = control_command_perform_formatter

    control_command_output_handler = logging.StreamHandler(stream=sys.stdout)
    control_command_output_handler.setLevel(loglevel)
    control_command_output_handler.formatter = control_command_output_formatter

    shell_logger = logging.getLogger('shell')
    shell_logger.setLevel(logging.DEBUG)
    for handler in list(shell_logger.handlers):
        shell_logger.removeHandler(handler)
    shell_logger.addHandler(shell_handler)

    codev_logger = logging.getLogger('codev')
    codev_logger.setLevel(loglevel)
    for handler in list(codev_logger.handlers):
        codev_logger.removeHandler(handler)
    codev_logger.addHandler(control_handler)
    codev_logger.addHandler(control_info_handler)
    codev_logger.addHandler(control_error_handler)

    debug_logger = logging.getLogger('debug')
    debug_logger.setLevel(loglevel)
    for handler in list(debug_logger.handlers):
        debug_logger.removeHandler(handler)
    debug_logger.addHandler(control_debug_handler)

    command_output_logger = logging.getLogger('command_output')
    command_output_logger.setLevel(loglevel)
    for handler in list(command_output_logger.handlers):
        command_output_logger.removeHandler(handler)
    command_output_logger.addHandler(control_command_output_handler)

    if control_perform:
        command_logger = logging.getLogger('command')
        command_logger.setLevel(control_perform_loglevel)
        for handler in list(command_logger.handlers):
            command_logger.removeHandler(handler)
        command_logger.addHandler(control_command_perform_handler)
    else:
        command_logger = logging.getLogger('command')
        command_logger.setLevel(loglevel)
        for handler in list(command_logger.handlers):
            command_logger.removeHandler(handler)
        command_logger.addHandler(control_command_perform_handler)
