from sqlalchemy.ext.declarative import DeclarativeMeta
from flask import json


class AlchemyEncoder(json.JSONEncoder):
    """
    global JSON converter for SQLAlchemy models
    """
    def default(self, obj):  # pylint: disable=E0202
        """
        default encoder for SQLAlchemy models

        if obj parameter is not an instance of sqlalchemy.ext.declarative.DeclarativeMeta super method will be called

        Parameters
        ----------
        obj
            sqlalchemy.ext.declarative.DeclarativeMeta
            the result of the queried model
        Returns
        ---------
        dict
            JSON serializable dictionary 
        """
        #check if obj is instance of DeclarativeMeta
        if isinstance(obj.__class__, DeclarativeMeta):
            fields = {}
            #loop over fields in DeclarativeMeta object
            for field in [
                x for x in dir(obj) if not x.startswith("_") and x != "metadata"
            ]:
                #get the field from the object
                data = obj.__getattribute__(field)
                try:
                    # this will fail on non-encodable values, like other classes
                    json.dumps(data)
                    fields[field] = data
                except TypeError:
                    fields[field] = None
            # a json-encodable dict
            return fields
        #fall back to parent default if not
        return super().default(obj)
