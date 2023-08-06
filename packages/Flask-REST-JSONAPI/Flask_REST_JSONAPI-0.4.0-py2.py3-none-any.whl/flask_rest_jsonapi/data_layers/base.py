# -*- coding: utf-8 -*-


class BaseDataLayer(object):

    def __init__(self, *args, **kwargs):
        """Intialize an data layer instance with kwargs

        :param dict kwargs: information about data layer instance
        """
        for key, value in kwargs.items():
            setattr(self, key, value)

    def get_items(self, *args, **kwargs):
        """Get a collection of items through the data layer
        """
        raise NotImplemented

    def get_item(self, *args, **kwargs):
        """Get an item through the data layer
        """
        raise NotImplemented

    def create_and_save_item(self, *args, **kwargs):
        """Create an instance of the item and store it through the data layer
        """
        raise NotImplemented

    def update_and_save_item(self, *args, **kwargs):
        """Update an instance of an item and store changes through the data layer
        """
        raise NotImplemented

    def delete_item(self, *args, **kwargs):
        """Delete an item through the data layer
        """
        raise NotImplemented

    def configure(self, *args, **kwargs):
        """Make change on the class instance. For example: add new methods to the data layer instance class.
        """
        pass
