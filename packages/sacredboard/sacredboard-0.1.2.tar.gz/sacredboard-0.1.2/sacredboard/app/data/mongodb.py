# coding=utf-8
import bson
import pymongo


class PyMongoDataAccess:
    """ Access records in MongoDB. """

    def __init__(self, uri, database_name, collection_name):

        self._uri = uri
        self._db_name = database_name
        self._client = None
        self._db = None
        self._collection_name = collection_name

    def connect(self):
        self._client = pymongo.MongoClient(host=self._uri)
        self._db = getattr(self._client, self._db_name)

    def get_runs(self, sort_by=None, sort_direction=None, start=0, limit=None):
        cursor = getattr(self._db, self._collection_name).find()
        if sort_by is not None:
            cursor = self._apply_sort(cursor, sort_by, sort_direction)
        cursor = cursor.skip(start)
        if limit is not None:
            cursor = cursor.limit(limit)
        return cursor

    def get_run(self, run_id):
        try:
            cursor = getattr(self._db, self._collection_name) \
                .find({"_id": int(run_id)})
        except ValueError:
            # Probably not a number.
            cursor = getattr(self._db, self._collection_name) \
                .find({"_id": bson.ObjectId(run_id)})
        run = None
        for c in cursor:
            run = c
        return run

    @staticmethod
    def _apply_sort(cursor, sort_by, sort_direction):
        """
        :type sort_direction: str
        :return:
        :rtype: pymongo.Cursor
        """
        if sort_direction is not None and sort_direction.lower() == "desc":
            sort = pymongo.DESCENDING
        else:
            sort = pymongo.ASCENDING
        return cursor.sort(sort_by, sort)

    @staticmethod
    def build_data_access(host, port, database_name, collection_name):
        """
       :param host: The database server to connect to
       :type host: str
       :param port: Database port
       :type port: int
       :param database_name: Database name
       :type database_name: str
       :param collection_name: Name of the collection
        where Sacred stores its runs
       :type collection_name: str
               """
        return PyMongoDataAccess("mongodb://%s:%d" % (host, port),
                                 database_name, collection_name)

    @staticmethod
    def build_data_access_with_uri(uri, database_name, collection_name):
        """
       :param uri: Connection string as defined in
                https://docs.mongodb.com/manual/reference/connection-string/
       :type uri: str
       :param database_name: Database name
       :type database_name: str
       :param collection_name: Name of the collection
        where Sacred stores its runs
       :type collection_name: str
               """
        return PyMongoDataAccess(uri, database_name, collection_name)
