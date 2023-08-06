"""
This script implements the main command-line interface to the CEA. It allows running the various scripts through a
standard interface.
"""
import os
import sys


def demand(args):
    """Run the demand script with the arguments provided."""
    import cea.demand.demand_main
    cea.demand.demand_main.run_as_script(scenario_path=args.scenario, weather_path=args.weather)


def demand_helper(args):
    """Run the demand helper script with the arguments provided."""
    import cea.demand.preprocessing.properties
    cea.demand.preprocessing.properties.run_as_script(scenario_path=args.scenario)


def weather_files(_):
    """List the available weather files to STDOUT."""
    import cea.inputlocator
    weather_names = cea.inputlocator.InputLocator(None).get_weather_names()
    for weather_name in weather_names:
        print(weather_name)


def file_location(args):
    """Locate a file using the InputLocator. The file to find is named the same as the InputLocator
    attribute."""
    import cea.inputlocator
    locator = cea.inputlocator.InputLocator(args.scenario)
    print(getattr(locator, args.attribute)())


def main(args):
    """Parse the arguments and run the program."""
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('-s', '--scenario', help='Path to the scenario folder', default=os.curdir)
    subparsers = parser.add_subparsers()

    demand_parser = subparsers.add_parser('demand')
    demand_parser.add_argument('-w', '--weather', help='Path to the weather file')
    demand_parser.set_defaults(func=demand)

    demand_helper_parser = subparsers.add_parser('demand-helper')
    demand_helper_parser.set_defaults(func=demand_helper)

    weather_files_parser = subparsers.add_parser('weather-files')
    weather_files_parser.set_defaults(func=weather_files)

    file_location_parser = subparsers.add_parser('locate')
    file_location_parser.add_argument('attribute', metavar='ATTR',
                                      help='The name of the file to find, denoted by InputLocator.ATTR()')
    file_location_parser.set_defaults(func=file_location)

    parsed_args = parser.parse_args(args)
    parsed_args.func(parsed_args)


if __name__ == '__main__':
    main(sys.argv[1:])
