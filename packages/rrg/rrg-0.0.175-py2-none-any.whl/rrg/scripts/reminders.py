import os
import argparse
from flask_script import Manager
from flask import Flask
from datetime import datetime as dt
from datetime import timedelta as td
from tabulate import tabulate

from rrg.reminders_generation import timecards_set
from rrg.reminders_generation import reminders as period_reminders
from rrg.models import session_maker

parser = argparse.ArgumentParser(description='RRG Weekly Reminders')

parser.add_argument('--db-user', required=True, help='database user', default='marcdba')
parser.add_argument('--mysql-host', required=True, help='database host - MYSQL_PORT_3306_TCP_ADDR', default='marcdba')
parser.add_argument('--mysql-port', required=True, help='database port - MYSQL_PORT_3306_TCP_PORT', default=3306)
parser.add_argument('--db', required=True, help='d', default='rrg')
parser.add_argument('--db-pass', required=True, help='database pw', default='deadbeef')
parser.add_argument(
    '--period', required=True, help='period', default='week', choices=['week', 'biweek', 'semimonth', 'month'])

app = Flask(__name__, instance_relative_config=True)

# Load the default configuration
if os.environ.get('RRG_SETTINGS'):
    settings_file = os.environ.get('RRG_SETTINGS')
else:
    print('Environment Variable RRG_SETTINGS not set')
    quit(1)

if os.path.isfile(settings_file):
    try:
        app.config.from_envvar('RRG_SETTINGS')
    except Exception as e:
        print('something went wrong with config file %s' % settings_file)
        quit(1)
else:
    print('settings file %s does not exits' % settings_file)


def reminders_ep():
    args = parser.parse_args()
    session = session_maker(args.db_user, args.db_pass, args.mysql_host, args.mysql_port, args.db)
    t_set = timecards_set(session)
    w_reminders = period_reminders(session, dt.now() - td(days=90), dt.now(), t_set, args.period)
    tbl = []
    i = 1
    for r in w_reminders:
        tbl.append(
            [i, r[0].client.name, r[0].employee.firstname + ' ' +
             r[0].employee.lastname,
             dt.strftime(r[1], '%m/%d/%Y'), dt.strftime(r[2], '%m/%d/%Y')])
        i += 1
    print(tabulate(tbl, headers=['number', 'client', 'employee', 'start', 'end']))


manager = Manager(app)


@manager.option(
    '-p', '--period', help='period type', choices=['week', 'biweek', 'semimonth', 'month'], required=True)
def reminders(period):
    session = session_maker(
        app.config['MYSQL_USER'], app.config['MYSQL_PASS'], app.config['MYSQL_SERVER_PORT_3306_TCP_ADDR'],
        app.config['MYSQL_SERVER_PORT_3306_TCP_PORT'], app.config['DB'])
    t_set = timecards_set(session)
    w_reminders = period_reminders(session, dt.now() - td(days=90), dt.now(), t_set, period)
    tbl = []
    i = 1
    for r in w_reminders:
        tbl.append(
            [i, r[0].client.name, r[0].employee.firstname + ' ' +
             r[0].employee.lastname,
             dt.strftime(r[1], '%m/%d/%Y'), dt.strftime(r[2], '%m/%d/%Y')])
        i += 1
    print(tabulate(tbl, headers=['number', 'client', 'employee', 'start', 'end']))


if __name__ == "__main__":
    manager.run()

