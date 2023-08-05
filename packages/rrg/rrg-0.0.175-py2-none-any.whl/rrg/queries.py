from sqlalchemy import and_

from rrg.models import Contract
from rrg.models import Client
from rrg.models import Employee
from rrg.models import periods
from rrg.sales import salespersons_notes_payments
from rrg.sales import salespersons_notes

periods = {
    'week': 1,
    'semimonth': 2,
    'month': 3,
    'biweek': 5,
}


def contracts_per_period(session, period):
    """
    returns active contracts of period type - weekly, semimonthly, monthly
    and biweekly
    """
    if period not in periods:
        print('wrong period type')
    with session.no_autoflush:
        contracts = session.query(Contract, Client, Employee).join(Client) \
            .join(Employee).filter(
            and_(Contract.active == 1, Client.active == 1,
                 Employee.active == 1,
                 Contract.period_id == periods[period])).all()
        return contracts


def sheree_notes_payments(session, sheree):
    return salespersons_notes_payments(session, sheree)


def sherees_notes(session, sheree):
    return salespersons_notes(session, sheree)
