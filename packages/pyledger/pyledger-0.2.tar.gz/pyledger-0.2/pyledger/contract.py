#    Pyledger. A simple ledger for smart contracts implemented in Python
#    Copyright (C) 2017  Guillem Borrell Nogueras
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as published
#    by the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.

from sqlalchemy import desc
from uuid import uuid4
from pyledger.db import DB, Contract, Status
from datetime import datetime
import hashlib
import inspect


try:
    import dill
except ImportError:
    print('Check that you are building the documentation')
    dill = None


class Attrs:
    def __init__(self, **kwargs):
        self.__dict__.update(**kwargs)

    def get_attributes(self):
        return self.__dict__

    def __repr__(self):
        return 'attrs: ' + str(self.__dict__)


class Builder:
    def __init__(self, name='', obj=None):
        if obj is None: 
            self.attributes = {}
            self.methods = {}
        else:
            raise NotImplemented('Inspecting from class not supported yet')

        if name:
            if ' ' in name:
                raise ValueError('The name of the contract should include no spaces')
            self.name = name
        else:
            self.name = str(uuid4())

        self.description = ''
    
    def add_description(self, description: str):
        self.description = description

    def add_attribute(self, name: str, value):
        """
        Add attribute *name* to the contract with an initial value of *value*
        """
        self.attributes[name] = value

    def add_method(self, method, name: str=''):
        """
        Add a method to the contract
        """
        if not name:
            name = method.__name__

        sig = inspect.signature(method)

        if 'attrs' not in sig.parameters:
            raise ValueError(
                'The first argument of the method must be'
                ' called attrs and not annotated'
            )
        else:
            for param in sig.parameters:
                if not param == 'attrs' and sig.parameters[param].annotation == inspect._empty:
                    raise ValueError(
                        'Parameter {} without signature'.format(
                            param))
                
        self.methods[name] = method

    def call(self, function: str, **kwargs):
        """
        Call the function of the smart contract passing the keyword arguments.
        """
        # Build named tuple with the properies
        attrs = Attrs(**self.attributes)

        signature = inspect.signature(self.methods[function])
        call_args = {'attrs': attrs}

        if function not in self.methods:
            return 'Function not found'
        
        for k, v in kwargs.items():
            if k in signature.parameters:
                # Improve type checking here
                call_args[k] = v

        try:
            attrs = self.methods[function](**call_args)

            if type(attrs) == tuple:
                return_value = attrs[1].encode('utf-8')
                self.attributes = attrs[0].get_attributes()
            else:
                return_value = b'SUCCESS'
                self.attributes = attrs.get_attributes()
            
            return return_value
        except Exception as e:
            return str(e)

    def api(self):
        """
        Return a dictionary with the complete API for the contract
        """
        api_spec = {}
        for method in self.methods:
            function_spec = {}
            sig = inspect.signature(self.methods[method])
            for param in sig.parameters:
                function_spec[param] = sig.parameters[param].annotation

            api_spec[method] = function_spec

        return self.name, api_spec


def commit_contract(contract):
    """
    Commits the contract to the ledger
    """
    stored_contract = Contract()
    stored_contract.name = contract.name
    stored_contract.created = datetime.now()
    stored_contract.description = contract.description
    stored_contract.methods = dill.dumps(contract.methods)
    stored_contract.api = dill.dumps(contract.api()[1])

    signatures = {}
    for k, method in contract.methods.items():
        signatures[k] = inspect.signature(method)
    
    stored_contract.signatures = dill.dumps(signatures) 

    first_status = Status()
    first_status.contract = stored_contract
    first_status.when = datetime.now()
    first_status.attributes = dill.dumps(contract.attributes)
    first_status.key = b'genesis'

    DB.session.add(stored_contract)
    DB.session.add(first_status)
    DB.session.commit()


def ls_contracts():
    """
    Get the name of all the contracts returns an iterator
    """
    for contract in DB.session.query(Contract).order_by(Contract.created):
        yield contract.name


def get_contract(name):
    """
    Get the contract and the current status.
    """
    stored_contract = DB.session.query(Contract).filter(Contract.name == name).first()

    if not stored_contract:
        raise ValueError('Contract not found')

    last_status = DB.session.query(
        Status).filter(
            Status.contract == stored_contract
        ).order_by(desc(Status.when)).first()
    
    contract = Builder(name)
    contract.methods = dill.loads(stored_contract.methods)
    contract.attributes = dill.loads(last_status.attributes)

    return contract


def get_status(name):
    stored_contract = DB.session.query(
        Contract).filter(
            Contract.name == name).one_or_none()

    if not stored_contract:
        raise ValueError('Contract not found')

    last_status = DB.session.query(
        Status).filter(
            Status.contract == stored_contract
        ).order_by(desc(Status.when)).limit(2).all()

    # Verification step
    m = hashlib.sha256()
    m.update(last_status[1].key)
    m.update(last_status[0].when.isoformat().encode('utf-8'))
    m.update(last_status[0].attributes)

    # Assert the correctness of the step
    if m.digest() == last_status[0].key:
        correct = True
    else:
        correct = False

    print(correct)

    return dill.loads(last_status[0].attributes), correct


def verify_contract(name):
    stored_contract = DB.session.query(
        Contract).filter(
            Contract.name == name).one_or_none()

    if not stored_contract:
        raise ValueError('Contract not found')

    previous_key = None

    for status in DB.session.query(
        Status).filter(
            Status.contract == stored_contract
            ).order_by(Status.when):

        if status.key == b'genesis':
            previous_key = status.key

        else:
            m = hashlib.sha256()
            m.update(previous_key)
            m.update(status.when.isoformat().encode('utf-8'))
            m.update(status.attributes)

            if m.digest() == status.key:
                previous_key = status.key

            else:
                return "Chain inconsistency from status {} on {}".format(
                    status.key,
                    status.when.isoformat()
                )

    return "Contract OK"


def update_status(contract):
    """
    Update the status of the contract in the ledger
    """
    m = hashlib.sha256()
    stored_contract = DB.session.query(
        Contract).filter(
            Contract.name == contract.name).one_or_none()

    last_status = DB.session.query(
        Status).filter(
            Status.contract == stored_contract
        ).order_by(desc(Status.when)).first()
    
    status = Status()
    status.contract = stored_contract
    status.when = datetime.now()
    status.attributes = dill.dumps(contract.attributes)

    m.update(last_status.key)
    m.update(status.when.isoformat().encode('utf-8'))
    m.update(status.attributes)

    status.key = m.digest()

    DB.session.add(status)
    DB.session.commit()


def get_api(name):
    """
    Get the contract API
    """
    stored_contract = DB.session.query(Contract).filter(
        Contract.name == name).first()
    if not stored_contract:
        return None

    signatures = dill.loads(stored_contract.signatures)

    api = {}
    for sig in signatures:
        function_spec = {}
        for param in signatures[sig].parameters:
            annotation = signatures[sig].parameters[param].annotation
            if annotation == str:
                function_spec[param] = 'str'
            elif annotation == float:
                function_spec[param] = 'float'
            elif annotation == int:
                function_spec[param] = 'int'
            elif param == 'attrs':
                pass
            
        api[sig] = function_spec

    return api
