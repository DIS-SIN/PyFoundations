from sqlalchemy.ext.declarative import DeclarativeMeta
from flask import json
from datetime import datetime


class AlchemyEncoder(json.JSONEncoder):
    """
    global JSON converter for SQLAlchemy models
    """

    def default(self, obj, depth=2):  # pylint: disable=E0202
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
        # check if obj is instance of DeclarativeMeta
        if isinstance(obj.__class__, DeclarativeMeta):
            # an SQLAlchemy class
            json_data = {}
            for f in obj.__json_fields__():
                print(f)
                try:
                    # dumps used to validated data, throws exception if non-encodable
                    data = obj.__getattribute__(f)
                    if isinstance(data, datetime):
                        json_data[f] = data.strftime("%Y-%M-%d %H:%M:%S")
                    else:
                        json.dumps(data)
                        json_data[f] = data
                except TypeError:
                    json_data[f] = None
            if hasattr(obj, "__json_relationships__") and depth > 0:
                depth -= 1  # We've entered the relationships so decrement
                # [[]]
                for r in obj.__json_relationships__():
                    value = None
                    # returns list of tags
                    data = obj.__getattribute__(r[0])
                    if isinstance(data, list):
                        value = []
                        for dp in data:
                            value.append(self.default(dp, depth))
                    elif isinstance(data, r[1]):
                        value = self.default(data, depth)
                    json_data[r[0]] = value
            return json_data
        # fall back to parent default if not
        return super().default(obj)
