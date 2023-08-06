#!/usr/bin/env python
# pyinfra
# File: bin/pyinfra
# Desc: the CLI in front of the API

'''
pyinfra
Docs: pyinfra.readthedocs.io

Usage:
    pyinfra -i INVENTORY DEPLOY [-vv options]
    pyinfra -i INVENTORY --run OP ARGS [-vv options]
    pyinfra -i INVENTORY --run COMMAND [-vv options]
    pyinfra -i INVENTORY --fact FACT [-vv options]
    pyinfra -i INVENTORY [DEPLOY] --debug-data [options]
    pyinfra (--facts | --help | --version)

Deploy options:
    DEPLOY               Deploy script filename.
    -i INVENTORY         Inventory script filename or single hostname.
    --run OP ARGS        Run a single operation with args.
          COMMAND        Run a command using the server.shell operation.
    --fact FACT          Name of fact to run/test.
    --limit HOSTNAME     Limit the inventory, supports *wildcards and group names.
    --serial             Run commands on one host at a time.
    --no-wait             Don't wait for all hosts at each operation.
    -v -vv               Prints remote input/output in realtime. -vv prints facts output.
    --dry                Only print proposed changes.
    --debug              Print debug info.
    --debug-data         Print inventory hosts, data and exit (no connect/deploy).
    --debug-state        Print state information and exit (no deploy like --dry).

Config options:
    -p --port PORT       SSH port number.
    -u --user USER       SSH user.
    --key FILE           SSH private key.
    --key-password PASS  SSH key password.
    --sudo               Use sudo.
    --sudo-user USER     Which user to sudo to.
    --su-user USER
    --password PASS      SSH password auth (bad).
    --parallel NUM       Number of parallel processes.
    --fail-percent NUM   Percentage of hosts that can fail before exiting.

Experimental options:
    --enable-pipelining  Enable fact pipelining.
'''

from __future__ import division, unicode_literals, print_function

from gevent import monkey
monkey.patch_all()  # noqa

import sys
import signal
import logging
from os import getcwd, path

from docopt import docopt
from termcolor import colored

# Colorama patch to enable termcolor on Windows
from colorama import init as colorama_init
colorama_init()  # noqa

from pyinfra import logger, pseudo_state, pseudo_host, pseudo_inventory, hook, __version__
from pyinfra.local import exec_file

from pyinfra.cli import run_hook
from pyinfra.cli.arguments import setup_arguments
from pyinfra.cli.config import load_config, load_deploy_config
from pyinfra.cli.fake import FakeInventory, FakeHost, FakeState
from pyinfra.cli.inventory import make_inventory
from pyinfra.cli.log import setup_logging
from pyinfra.cli.prints import (
    dump_state, dump_trace, print_inventory, print_facts_list,
    print_fact, print_meta, print_results,
)

from pyinfra.api import State
from pyinfra.api.ssh import connect_all
from pyinfra.api.operation import add_op
from pyinfra.api.operations import run_ops
from pyinfra.api.attrs import FallbackAttrData
from pyinfra.api.facts import get_facts
from pyinfra.api.exceptions import PyinfraError


# Don't write out deploy.pyc/config.pyc etc
sys.dont_write_bytecode = True

# Make sure imported files (deploy.py/etc) behave as if imported from the cwd
sys.path.append('.')


# Handle ctrl+c
def _signal_handler(signum, frame):
    print('Exiting upon user request!')
    sys.exit(0)

signal.signal(signal.SIGINT, _signal_handler)


# Exit handler
def _exit(code=0):
    print()
    print('<-- Thank you, goodbye')
    print()

    sys.exit(code)


# Exception handler
def _exception(name, e, always_dump=False):
    print()
    if pseudo_host.isset():
        sys.stderr.write('--> [{0}]: {1}: '.format(
            colored(pseudo_host.name, attrs=['bold']),
            colored(name, 'red', attrs=['bold'])
        ))
    else:
        sys.stderr.write('--> {0}: '.format(colored(name, 'red', attrs=['bold'])))

    if e:
        logger.warning(e)

    if arguments.get('debug') or always_dump:
        dump_trace(sys.exc_info())

    _exit(1)


# Get arguments
arguments = docopt(__doc__, version='pyinfra-{0}'.format(__version__))

print()
print('### {0}'.format(colored('Welcome to pyinfra', attrs=['bold'])))
print()

# Setup logging
log_level = logging.DEBUG if arguments['--debug'] else logging.INFO
setup_logging(log_level)


try:
    # Setup arguments
    arguments = setup_arguments(arguments)

    # Quickly list facts & exit if desired
    if arguments['list_facts']:
        logger.info('Available facts list:')
        print_facts_list()
        _exit()

    deploy_dir = getcwd()

    # This is the most common case: we have a deploy file so use it's pathname
    if arguments['deploy'] is not None:
        deploy_dir = path.dirname(arguments['deploy'])

    # If we have a valid inventory, look in it's path and it's parent for group_data or
    # config.py to indicate deploy_dir (--fact, --run)
    elif arguments['inventory'] and path.isfile(arguments['inventory']):
        inventory_dir, _ = path.split(arguments['inventory'])
        above_inventory_dir, _ = path.split(inventory_dir)

        for inventory_path in (inventory_dir, above_inventory_dir):
            if any((
                path.isdir(path.join(inventory_path, 'group_data')),
                path.isfile(path.join(inventory_path, 'config.py'))
            )):
                deploy_dir = inventory_path

    # Set a fake state/host/inventory
    pseudo_state.set(FakeState())
    pseudo_host.set(FakeHost())
    pseudo_inventory.set(FakeInventory())

    # Load up any config.py from the filesystem
    config = load_config(deploy_dir)

    # Load any hooks/config from the deploy file
    load_deploy_config(arguments['deploy'], config)

    # Unset fake state/host/inventory
    pseudo_host.reset()
    pseudo_state.reset()
    pseudo_inventory.reset()

    # Arg based config overrides
    if arguments['sudo']:
        config.SUDO = True
        if arguments['sudo_user']:
            config.SUDO_USER = arguments['sudo_user']

    if arguments['su_user']:
        config.SU_USER = arguments['su_user']

    if arguments['parallel']:
        config.PARALLEL = arguments['parallel']

    if arguments['fail_percent'] is not None:
        config.FAIL_PERCENT = arguments['fail_percent']

    # Load up the inventory from the filesystem
    inventory, inventory_group = make_inventory(
        arguments['inventory'],
        deploy_dir=deploy_dir,
        limit=arguments['limit'],
        ssh_user=arguments['user'],
        ssh_key=arguments['key'],
        ssh_key_password=arguments['key_password'],
        ssh_port=arguments['port'],
        ssh_password=arguments['password'],
    )

    # If --debug-data dump & exit
    if arguments['debug_data']:
        print_inventory(inventory)
        _exit()

    # Attach to pseudo inventory
    pseudo_inventory.set(inventory)

    # Create/set the state
    state = State(inventory, config)
    state.is_cli = True
    state.deploy_dir = deploy_dir

    # Setup printing on the new state
    print_output = arguments['verbose'] > 0
    if arguments['deploy'] is None and arguments['op'] is None:
        print_fact_output = print_output
    else:
        print_fact_output = arguments['verbose'] > 1

    state.print_output = print_output  # -v
    state.print_fact_info = print_output  # -v
    state.print_fact_output = print_fact_output  # -vv
    state.print_lines = True

    # Attach to pseudo state
    pseudo_state.set(state)

    # Setup the data to be passed to config hooks
    hook_data = FallbackAttrData(
        state.inventory.get_override_data(),
        state.inventory.get_group_data(inventory_group),
        state.inventory.get_data()
    )

    # Run the before_connect hook if provided
    run_hook(state, 'before_connect', hook_data)

    # Connect to all the servers
    print('--> Connecting to hosts...')
    connect_all(state)

    print()

    # Run the before_connect hook if provided
    run_hook(state, 'before_facts', hook_data)

    # Just getting a fact?
    if arguments['fact']:
        fact_data = get_facts(
            state, arguments['fact'], args=arguments['fact_args'],
            sudo=arguments['sudo'], sudo_user=arguments['sudo_user'],
            su_user=arguments['su_user']
        )
        print_fact(fact_data)
        _exit()

    # We're building a deploy!
    print('--> Building deploy scripts...')

    # Deploy file
    if arguments['deploy']:
        def loop_hosts():
            # This actually does the op build
            for host in inventory:
                pseudo_host.set(host)
                exec_file(arguments['deploy'])
                state.ready_host(host)

                logger.info('{0} {1}'.format(
                    '[{}]'.format(colored(host.name, attrs=['bold'])),
                    colored('Ready', 'green')
                ))

        if arguments['pipelining']:
            with state.pipeline_facts:
                loop_hosts()
        else:
            loop_hosts()

        # Remove any pseudo host
        pseudo_host.reset()

        # Un-ready the hosts - this is so that any hooks or callbacks during the deploy
        # can still use facts as expected.
        state.ready_hosts = set()

    # One off op run
    else:
        # Setup args if present
        args, kwargs = [], {}
        if isinstance(arguments['op_args'], tuple):
            args, kwargs = arguments['op_args']

        # Add the op w/args
        add_op(
            state, arguments['op'],
            *args, **kwargs
        )

    # Always show meta output
    print()
    print('--> Proposed changes:')
    print_meta(state, inventory)

    # If --debug-state, dump state (ops, op order, op meta) now & exit
    if arguments['debug_state']:
        dump_state(state)
        _exit()

    # Run the operations we generated with the deploy file
    if not arguments['dry']:
        print()

        # Run the before_deploy hook if provided
        run_hook(state, 'before_deploy', hook_data)

        print('--> Beginning operation run...')
        run_ops(
            state,
            serial=arguments['serial'],
            no_wait=arguments['no_wait']
        )

        # Run the after_deploy hook if provided
        run_hook(state, 'after_deploy', hook_data)

        print('--> Results:')
        print_results(state, inventory)

# Hook errors
except hook.Error as e:
    _exception('hook error', e)

# Internal exceptions
except PyinfraError as e:
    _exception('pyinfra error', e)

# IO errors
except IOError as e:
    _exception('local IO error', e)

# Unexpected exceptions/everything else
except Exception as e:
    _exception('unknown error', e, always_dump=True)


_exit()
