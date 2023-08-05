import copy
import datetime
from dateutil.parser import parse
from decimal import Decimal
import uuid

from amaascore.error_messages import ERROR_LOOKUP
from amaascore.exceptions import TransactionNeedsSaving
from amaascore.core.amaas_model import AMaaSModel
from amaascore.core.reference import Reference
from amaascore.transactions.children import Charge, Code, Comment, Link, Party


class Transaction(AMaaSModel):

    @staticmethod
    def children():
        """ A dict of which of the attributes are collections of other objects, and what type """
        return {'charges': Charge, 'codes': Code, 'comments': Comment, 'links': Link, 'parties': Party,
                'references': Reference}

    def __init__(self, asset_manager_id, asset_book_id, counterparty_book_id, transaction_action, asset_id, quantity,
                 transaction_date, settlement_date, price, transaction_currency, settlement_currency,
                 asset=None, execution_time=None, transaction_type='Trade', transaction_id=None,
                 transaction_status='New', charges=None, codes=None, comments=None, links=None, parties=None,
                 references=None, *args, **kwargs):

        self.asset_manager_id = asset_manager_id
        self.asset_book_id = asset_book_id
        self.counterparty_book_id = counterparty_book_id
        self.transaction_action = transaction_action
        self.asset_id = asset_id  # This is duplicated on the child asset.  Remove?
        self.quantity = quantity
        self.transaction_date = transaction_date
        self.settlement_date = settlement_date
        self.price = price
        self.transaction_currency = transaction_currency
        self.settlement_currency = settlement_currency
        self.transaction_type = transaction_type
        self.transaction_status = transaction_status

        # Cannot be in method signature or the value gets bound to the constructor call
        self.execution_time = execution_time or datetime.datetime.utcnow()
        self.transaction_id = transaction_id or uuid.uuid4().hex

        self.charges = charges or {}
        self.codes = codes or {}
        self.comments = comments or {}
        self.links = links or {}
        self.parties = parties or {}
        self.references = references or {}
        self.references['AMaaS'] = Reference(reference_value=self.transaction_id)  # Upserts the AMaaS Reference

        self.postings = []
        self.asset = asset
        super(Transaction, self).__init__(*args, **kwargs)

    @property
    def quantity(self):
        return self._quantity

    @quantity.setter
    def quantity(self, value):
        """
        Force the quantity to always be a decimal
        :param value:
        :return:
        """
        self._quantity = Decimal(value)

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, value):
        """
        Force the price to always be a decimal
        :param value:
        :return:
        """
        self._price = Decimal(value)

    @property
    def transaction_date(self):
        return self._transaction_date

    @transaction_date.setter
    def transaction_date(self, value):
        """
        Force the transaction_date to always be a date
        :param value:
        :return:
        """
        if value:
            self._transaction_date = parse(value).date() if isinstance(value, (str, unicode)) else value

    @property
    def settlement_date(self):
        return self._settlement_date

    @settlement_date.setter
    def settlement_date(self, value):
        """
        Force the settlement_date to always be a date
        :param value:
        :return:
        """
        if value:
            self._settlement_date = parse(value).date() if isinstance(value, (str, unicode)) else value

    @property
    def execution_time(self):
        return self._execution_time

    @execution_time.setter
    def execution_time(self, value):
        """
        Force the execution_time to always be a datetime
        :param value:
        :return:
        """
        if value:
            self._execution_time = parse(value) if isinstance(value, (str, unicode)) else value

    @property
    def gross_settlement(self):
        if hasattr(self, '_gross_settlement'):
            return self.__gross_settlement
        return self.quantity * self.price

    @gross_settlement.setter
    def gross_settlement(self, gross_settlement):
        """

        :param gross_settlement:
        :return:
        """
        if gross_settlement:
            self._gross_settlement = Decimal(gross_settlement)

    @property
    def net_settlement(self):
        if hasattr(self, '_net_settlement'):
            return self._net_settlement
        return self.gross_settlement - self.charges_net_effect()

    @net_settlement.setter
    def net_settlement(self, net_settlement):
        """

        :param gross_settlement:
        :return:
        """
        if net_settlement:
            self._net_settlement = Decimal(net_settlement)

    def charges_net_effect(self):
        """
        The total effect of the net_affecting charges (note affect vs effect here).

        Currently this is single currency only (AMAAS-110).

        Cast to Decimal in case the result is zero (no net_affecting charges).

        :return:
        """
        return Decimal(sum([charge.charge_value for charge in self.charges.values()
                            if charge.active and charge.net_affecting]))

    def charge_types(self):
        """
        TODO - are these helper functions useful?
        :return:
        """
        return self.charges.keys()

    def code_types(self):
        """
        TODO - are these helper functions useful?
        :return:
        """
        return self.codes.keys()

    def reference_types(self):
        """
        TODO - are these helper functions useful?
        :return:
        """
        return self.references.keys()

    def __str__(self):
        return "Transaction object - ID: %s" % self.transaction_id

    @property
    def postings(self):
        if hasattr(self, '_postings'):
            return self._postings
        else:
            raise TransactionNeedsSaving

    @postings.setter
    def postings(self, postings):
        """
        TODO - when do we save this from AMaaS Core?
        :param postings:
        :return:
        """
        if postings:
            self._postings = postings

    # Upsert methods for safely adding children - this is more important for cases where we trigger action when there
    # is a change, e.g. for the case of a @property on the collection.  Since we don't have that case yet for
    # transactions, I have not yet filled out all of these.
    def upsert_code(self, code_type, code):
        codes = copy.deepcopy(self.codes)
        codes.update({code_type: code})
        self.codes = codes

    def upsert_link_list(self, link_type, link_list):
        """
        Remove an item altogether by setting link_list to None.
        Currently, only links can contain multiple children of the same type.
        :param link_type:
        :param link_list:
        :return:
        """
        if link_list is None:
            self.links.pop(link_type, None)
            return
        links = copy.deepcopy(self.links)
        links.update({link_type: link_list})
        self.links = links

    def add_link(self, link_type, linked_transaction_id):
        new_link = Link(linked_transaction_id=linked_transaction_id)
        link_list = self.links.get(link_type)
        if link_list:
            if not isinstance(link_list, list):
                link_list = [link_list]
            link_list.append(new_link)
            # Remove duplicates - perhaps log or raise a warning?
            link_list = list(set(link_list))
        else:
            link_list = new_link
        self.upsert_link_list(link_type=link_type, link_list=link_list)

    def remove_link(self, link_type, linked_transaction_id):
        link_list = self.links.get(link_type)
        if not link_list:
            raise ValueError(ERROR_LOOKUP.get('transaction_link_not_found'))
        if isinstance(link_list, Link):
            if link_list.linked_transaction_id == linked_transaction_id:
                link_list = None
            else:
                raise ValueError(ERROR_LOOKUP.get('transaction_link_not_found'))
        else:
            output = [i for i, link in enumerate(link_list) if link.linked_transaction_id == linked_transaction_id]
            if output:
                link_list.pop(output[0])
            else:
                raise ValueError(ERROR_LOOKUP.get('transaction_link_not_found'))
        self.upsert_link_list(link_type=link_type, link_list=link_list)
