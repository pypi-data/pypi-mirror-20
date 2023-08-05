import os
import argparse
from flask_script import Manager
from flask import Flask
from datetime import datetime as dt
from tabulate import tabulate

from rrg.invoices import open_invoices as sa_open_invoices
from rrg.models import session_maker

parser = argparse.ArgumentParser(description='RRG Open Invoices')

parser.add_argument('--db-user', required=True, help='database user',
                    default='marcdba')
parser.add_argument('--mysql-host', required=True,
                    help='database host - MYSQL_PORT_3306_TCP_ADDR',
                    default='marcdba')
parser.add_argument('--mysql-port', required=True,
                    help='database port - MYSQL_PORT_3306_TCP_PORT',
                    default=3306)
parser.add_argument('--db', required=True, help='d', default='rrg')
parser.add_argument('--db-pass', required=True, help='database pw',
                    default='deadbeef')

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


def open_invoices_ep():
    args = parser.parse_args()
    session = session_maker(args.db_user, args.db_pass, args.mysql_host, args.mysql_port, args.db)

    w_open_invoices = sa_open_invoices(session)
    tbl = []
    i = 1
    for r in w_open_invoices:
        tbl.append(
            [i, r.contract.client.name, r.contract.employee.firstname + ' ' +
             r.contract.employee.lastname,
             dt.strftime(r.period_start, '%m/%d/%Y'), dt.strftime(r.period_end, '%m/%d/%Y')])
        i += 1
    print(tabulate(tbl, headers=['number', 'client', 'employee', 'start', 'end']))


manager = Manager(app)


@manager.option(
    '-f', '--format', help='format of commissions report - plain, latex', choices=['plain', 'latex'], default='plain')
def open_invoices(format):
    session = session_maker(
        app.config['MYSQL_USER'], app.config['MYSQL_PASS'], app.config['MYSQL_SERVER_PORT_3306_TCP_ADDR'],
        app.config['MYSQL_SERVER_PORT_3306_TCP_PORT'], app.config['DB'])
    w_open_invoices = sa_open_invoices(session)
    tbl = []
    i = 1
    for r in w_open_invoices:
        tbl.append(
            [i, r.contract.client.name, r.contract.employee.firstname + ' ' +
             r.contract.employee.lastname,
             dt.strftime(r.period_start, '%m/%d/%Y'), dt.strftime(r.period_end, '%m/%d/%Y')])
        i += 1
    print(tabulate(tbl, headers=['number', 'client', 'employee', 'start', 'end']))


if __name__ == "__main__":
    manager.run()

