try:
    from urllib.parse import quote_plus
except ImportError:
    from urllib import quote_plus

import processout

from processout.networking.request  import Request
from processout.networking.response import Response

# The content of this file was automatically generated

class Refund(object):
    def __init__(self, client, prefill = None):
        self._client = client

        self._id = None
        self._transaction = None
        self._reason = None
        self._information = None
        self._amount = None
        self._metadata = None
        self._sandbox = None
        self._created_at = None
        if prefill != None:
            self.fill_with_data(prefill)

    
    @property
    def id(self):
        """Get id"""
        return self._id

    @id.setter
    def id(self, val):
        """Set id
        Keyword argument:
        val -- New id value"""
        self._id = val
        return self
    
    @property
    def transaction(self):
        """Get transaction"""
        return self._transaction

    @transaction.setter
    def transaction(self, val):
        """Set transaction
        Keyword argument:
        val -- New transaction value"""
        if isinstance(val, dict):
            obj = processout.Transaction(self._client)
            obj.fill_with_data(val)
            self._transaction = obj
        else:
            self._transaction = val
        return self
    
    @property
    def reason(self):
        """Get reason"""
        return self._reason

    @reason.setter
    def reason(self, val):
        """Set reason
        Keyword argument:
        val -- New reason value"""
        self._reason = val
        return self
    
    @property
    def information(self):
        """Get information"""
        return self._information

    @information.setter
    def information(self, val):
        """Set information
        Keyword argument:
        val -- New information value"""
        self._information = val
        return self
    
    @property
    def amount(self):
        """Get amount"""
        return self._amount

    @amount.setter
    def amount(self, val):
        """Set amount
        Keyword argument:
        val -- New amount value"""
        self._amount = val
        return self
    
    @property
    def metadata(self):
        """Get metadata"""
        return self._metadata

    @metadata.setter
    def metadata(self, val):
        """Set metadata
        Keyword argument:
        val -- New metadata value"""
        self._metadata = val
        return self
    
    @property
    def sandbox(self):
        """Get sandbox"""
        return self._sandbox

    @sandbox.setter
    def sandbox(self, val):
        """Set sandbox
        Keyword argument:
        val -- New sandbox value"""
        self._sandbox = val
        return self
    
    @property
    def created_at(self):
        """Get created_at"""
        return self._created_at

    @created_at.setter
    def created_at(self, val):
        """Set created_at
        Keyword argument:
        val -- New created_at value"""
        self._created_at = val
        return self
    

    def fill_with_data(self, data):
        """Fill the current object with the new values pulled from data
        Keyword argument:
        data -- The data from which to pull the new values"""
        if "id" in data.keys():
            self.id = data["id"]
        if "transaction" in data.keys():
            self.transaction = data["transaction"]
        if "reason" in data.keys():
            self.reason = data["reason"]
        if "information" in data.keys():
            self.information = data["information"]
        if "amount" in data.keys():
            self.amount = data["amount"]
        if "metadata" in data.keys():
            self.metadata = data["metadata"]
        if "sandbox" in data.keys():
            self.sandbox = data["sandbox"]
        if "created_at" in data.keys():
            self.created_at = data["created_at"]
        
        return self

    def find(self, transaction_id, refund_id, options = {}):
        """Find a transaction's refund by its ID.
        Keyword argument:
        transaction_id -- ID of the transaction on which the refund was applied
        refund_id -- ID of the refund
        options -- Options for the request"""
        self.fill_with_data(options)

        request = Request(self._client)
        path    = "/transactions/" + quote_plus(transaction_id) + "/refunds/" + quote_plus(refund_id) + ""
        data    = {

        }

        response = Response(request.get(path, data, options))
        return_values = []
        
        body = response.body
        body = body["refund"]
                
                
        obj = processout.Refund(self._client)
        return_values.append(obj.fill_with_data(body))
                

        
        return return_values[0]

    def apply(self, transaction_id, options = {}):
        """Apply a refund to a transaction.
        Keyword argument:
        transaction_id -- ID of the transaction
        options -- Options for the request"""
        self.fill_with_data(options)

        request = Request(self._client)
        path    = "/transactions/" + quote_plus(transaction_id) + "/refunds"
        data    = {
            'amount': self.amount, 
            'metadata': self.metadata, 
            'reason': self.reason, 
            'information': self.information
        }

        response = Response(request.post(path, data, options))
        return_values = []
        
        return_values.append(response.success)

        
        return return_values[0]

    
