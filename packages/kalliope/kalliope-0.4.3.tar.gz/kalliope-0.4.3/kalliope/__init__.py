#!/usr/bin/env python
# coding: utf8
import argparse
import logging

from kalliope.core import ShellGui
from kalliope.core import Utils
from kalliope.core.ConfigurationManager.BrainLoader import BrainLoader
from kalliope.core.EventManager import EventManager
from kalliope.core.MainController import MainController

from _version import version_str
import signal
import sys

from kalliope.core.ResourcesManager import ResourcesManager
from kalliope.core.SynapseLauncher import SynapseLauncher
from kalliope.core.OrderAnalyser import OrderAnalyser

logging.basicConfig()
logger = logging.getLogger("kalliope")


def signal_handler(signal, frame):
    """
    Used to catch a keyboard signal like Ctrl+C in order to kill the kalliope program.

    :param signal: signal handler
    :param frame: execution frame

    """
    print "\n"
    Utils.print_info("Ctrl+C pressed. Killing Kalliope")
    sys.exit(0)

# actions available
ACTION_LIST = ["start", "gui", "install", "uninstall"]


def main():
    """Entry point of Kalliope program."""

    # create arguments
    parser = argparse.ArgumentParser(description='Kalliope')
    parser.add_argument("action", help="[start|gui|install|uninstall]")
    parser.add_argument("--run-synapse",
                        help="Name of a synapse to load surrounded by quote")
    parser.add_argument("--run-order", help="order surrounded by a quote")
    parser.add_argument("--brain-file", help="Full path of a brain file")
    parser.add_argument("--debug", action='store_true',
                        help="Show debug output")
    parser.add_argument("--git-url", help="Git URL of the neuron to install")
    parser.add_argument("--neuron-name", help="Neuron name to uninstall")
    parser.add_argument("--stt-name", help="STT name to uninstall")
    parser.add_argument("--tts-name", help="TTS name to uninstall")
    parser.add_argument("--trigger-name", help="Trigger name to uninstall")
    parser.add_argument('-v', '--version', action='version',
                        version='Kalliope ' + version_str)

    # parse arguments from script parameters
    args = parser.parse_args()

    # require at least one parameter, the action
    if len(sys.argv[1:]) == 0:
        parser.print_usage()
        sys.exit(1)

    # check if we want debug
    configure_logging(debug=args.debug)

    logger.debug("kalliope args: %s" % args)

    # by default, no brain file is set.
    # Use the default one: brain.yml in the root path
    brain_file = None

    # check if user set a brain.yml file
    if args.brain_file:
        brain_file = args.brain_file

    # check the user provide a valid action
    if args.action not in ACTION_LIST:
        Utils.print_warning("%s is not a recognised action\n" % args.action)
        parser.print_help()

    # install modules
    if args.action == "install":
        if not args.git_url:
            Utils.print_danger("You must specify the git url")
        else:
            parameters = {
                "git_url": args.git_url
            }
            res_manager = ResourcesManager(**parameters)
            res_manager.install()
        return

    # uninstall modules
    if args.action == "uninstall":
        if not args.neuron_name and not args.stt_name and not args.tts_name and not args.trigger_name:
            Utils.print_danger("You must specify a module name with --neuron-name or --stt-name or --tts-name "
                               "or --trigger-name")
        else:
            res_manager = ResourcesManager()
            res_manager.uninstall(neuron_name=args.neuron_name, stt_name=args.stt_name,
                                  tts_name=args.tts_name, trigger_name=args.trigger_name)
        return

    # load the brain once
    brain_loader = BrainLoader(file_path=brain_file)
    brain = brain_loader.brain

    if args.action == "start":

        # user set a synapse to start
        if args.run_synapse is not None:
            SynapseLauncher.start_synapse(args.run_synapse, brain=brain)

        if args.run_order is not None:
            order_analyser = OrderAnalyser(args.run_order, brain=brain)
            order_analyser.start()

        if (args.run_synapse is None) and (args.run_order is None):
            # first, load events in event manager
            EventManager(brain.synapses)
            Utils.print_success("Events loaded")
            # then start kalliope
            Utils.print_success("Starting Kalliope")
            Utils.print_info("Press Ctrl+C for stopping")
            # catch signal for killing on Ctrl+C pressed
            signal.signal(signal.SIGINT, signal_handler)
            # start the state machine
            MainController(brain=brain)

    if args.action == "gui":
        ShellGui(brain=brain)


def configure_logging(debug=None):
    """
    Prepare log folder in current home directory.

    :param debug: If true, set the lof level to debug

    """
    logger = logging.getLogger("kalliope")
    logger.propagate = False
    ch = logging.StreamHandler()
    ch.setLevel(logging.DEBUG)
    formatter = logging.Formatter('%(asctime)s :: %(levelname)s :: %(message)s')
    ch.setFormatter(formatter)

    # add the handlers to logger
    logger.addHandler(ch)

    if debug:
        logger.setLevel(logging.DEBUG)
    else:
        logger.setLevel(logging.INFO)

    logger.debug("Logger ready")
