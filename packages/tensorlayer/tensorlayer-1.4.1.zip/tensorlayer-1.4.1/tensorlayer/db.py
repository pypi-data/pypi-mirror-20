#! /usr/bin/python
# -*- coding: utf8 -*-
import tensorflow as tf
import tensorlayer as tl
from . import iterate
import numpy as np
import time
import math


import pymongo
import gridfs
import pickle
from pymongo import MongoClient
from datetime import datetime

class TensorDB(object):
    """TensorDB is a MongoDB based manager that help you to manage data, model and logging.

    Parameters
    -------------
    ip : string, localhost or IP address.
    port : int, port number.
    db_name : string, database name.
    user_name : string, set to None if it donnot need authentication.
    password : string.

    Properties
    ------------
    db : ``pymongo.MongoClient[db_name]``, xxxxxx
    fs : ``gridfs.GridFS(db)``, xxxxxxxxxx

    Dependencies
    -------------
    1 : MongoDB, as TensorDB is based on MongoDB, you need to install it in your
       local machine or remote machine.
    2 : pip install pymongo, for MongoDB python API.

    Optional Tools
    ----------------
    1 : You may like to install MongoChef or Mongo Management Studo APP for
       visualizing or testing your MongoDB.
    """
    def __init__(
        self,
        ip = 'localhost',
        port = 27017,
        db_name = 'db_name',
        user_name = None,
        password = 'password',
    ):
        ## connect mongodb
        client = MongoClient(ip, port)
        db = client[db_name]
        if user_name != None:
            db.authenticate(user_name, password)
        self.db = db
        ## define file system (Buckets)
        self.datafs = gridfs.GridFS(self.db, collection="datafs")
        self.modelfs = gridfs.GridFS(self.db, collection="modelfs")
        self.paramsfs = gridfs.GridFS(self.db, collection="paramsfs")
        ##
        print("[TensorDB] Connect SUCCESS {}:{} {} {}".format(ip, port, db_name, user_name))

    # def save_bulk_data(self, data=None, filename='filename'):
    #     """ Put bulk data into TensorDB.datafs, return file ID.
    #     When you have a very large data, you may like to save it into GridFS Buckets
    #     instead of Collections, then when you want to load it, XXXX
    #
    #     Parameters
    #     -----------
    #     data : serialized data.
    #     filename : string, GridFS Buckets.
    #
    #     References
    #     -----------
    #     - MongoDB find, xxxxx
    #     """
    #     s = time.time()
    #     f_id = self.datafs.put(data, filename=filename)
    #     print("[TensorDB] save_bulk_data: {} took: {}s".format(filename, round(time.time()-s, 2)))
    #     return f_id
    #
    # def save_collection(self, data=None, collect_name='collect_name'):
    #     """ Insert data into MongoDB Collections, return xx.
    #
    #     Parameters
    #     -----------
    #     data : serialized data.
    #     collect_name : string, MongoDB collection name.
    #
    #     References
    #     -----------
    #     - MongoDB find, xxxxx
    #     """
    #     s = time.time()
    #     rl = self.db[collect_name].insert_many(data)
    #     print("[TensorDB] save_collection: {} took: {}s".format(collect_name, round(time.time()-s, 2)))
    #     return rl
    #
    # def find(self, args={}, collect_name='collect_name'):
    #     """ Find data from MongoDB Collections.
    #
    #     Parameters
    #     -----------
    #     args : dictionary, arguments for finding.
    #     collect_name : string, MongoDB collection name.
    #
    #     References
    #     -----------
    #     - MongoDB find, xxxxx
    #     """
    #     s = time.time()
    #
    #     pc = self.db[collect_name].find(args)  # pymongo.cursor.Cursor object
    #     flist = pc.distinct('f_id')
    #     fldict = {}
    #     for f in flist: # you may have multiple Buckets files
    #         # fldict[f] = pickle.loads(self.datafs.get(f).read())
    #         # s2 = time.time()
    #         tmp = self.datafs.get(f).read()
    #         # print(time.time()-s2)
    #         fldict[f] = pickle.loads(tmp)
    #         # print(time.time()-s2)
    #         # exit()
    #     # print(round(time.time()-s, 2))
    #     data = [fldict[x['f_id']][x['id']] for x in pc]
    #     data = np.asarray(data)
    #     print("[TensorDB] find: {} get: {} took: {}s".format(collect_name, pc.count(), round(time.time()-s, 2)))
    #     return data

    # def del_data(self, data, args={}):
    #     pass
    #
    # def save_model(self):
    #     pass
    #
    # def load_model(self):
    #     pass
    #
    # def del_model(self):
    #     pass

    def save_params(self, params=[], args={}):#, file_name='parameters'):
        """ Save parameters into MongoDB Buckets, and save the file ID into Params Collections. """
        s = time.time()
        f_id = self.paramsfs.put(pickle.dumps(params, protocol=2))#, file_name=file_name)
        args.update({'f_id': f_id, 'time': datetime.utcnow()})
        self.db.Params.insert_one(args)
        # print("[TensorDB] Save params: {} SUCCESS, took: {}s".format(file_name, round(time.time()-s, 2)))
        print("[TensorDB] Save params: SUCCESS, took: {}s".format(round(time.time()-s, 2)))
        return f_id

    def find_one_params(self, args={}):
        """ Find one parameter from MongoDB Buckets """
        s = time.time()
        d = self.db.Params.find_one(args)

        if d is not None:
            f_id = d['f_id']
        else:
            print("[TensorDB] FAIL! Cannot find: {}".format(args))
            return False, False
        # print(f_id)
        # exit()
        try:
            params = pickle.loads(self.paramsfs.get(f_id).read())
            # print(self.paramsfs)
            print("[TensorDB] Find one params SUCCESS, {} took: {}s".format(args, round(time.time()-s, 2)))
            return params, f_id
        except:
            return False, False

    def find_all_params(self, args={}):
        """ Find all parameter from MongoDB Buckets """
        s = time.time()
        pc = self.db.Params.find(args)

        if pc is not None:
            # f_id = d['f_id']
            f_id_list = pc.distinct('f_id')
            # print(f_id_list[0], type(f_id_list[0]))
            # # print(int(f_id_list[0]))
            # # print(pc)
            # # print(pc['f_id'])
            # tmp = self.paramsfs.get(f_id_list[0]).read()
            # print('xxx...')
            # data = pickle.loads(tmp)
            # print(data)
            # exit()
            # fldict = {}
            params = []
            for f_id in f_id_list: # you may have multiple Buckets files
                # print('f_id', f_id)
                tmp = self.paramsfs.get(f_id).read()
                # print(pickle.loads(tmp)[0].shape)
                params.append(pickle.loads(tmp))
                # fldict[f_id] = pickle.loads(tmp)
                # print(type(fldict[f_id]))
                # print(pickle.loads(tmp))
            # data = [fldict[x['f_id']][x['id']] for x in pc]
            # params = np.asarray(params)
            # params = np.append(params, axis=0)
            # print('')
        else:
            print("[TensorDB] FAIL! Cannot find any: {}".format(args))
            return False

        print("[TensorDB] Find all params SUCCESS, took: {}s".format(round(time.time()-s, 2)))
        return params

    # def del_params(self, args={}):
    #     """ Delete parameters. """
    #     self.db.Params.delete_many(args)
    #     print("[TensorDB] Delete TrainLog SUCCESS")

    def del_params(self, args={}):
        """ Delete params in MongoDB uckets.

        Parameters
        -----------
        args : dictionary, find items to delete.
        """
        pc = self.db.Params.find(args)
        f_id_list = pc.distinct('f_id')
        # remove from Buckets
        for f in f_id_list:
            self.paramsfs.delete(f)
        # remove from Collections
        self.db.Params.remove(args)

        print("[TensorDB] Delete params SUCCESS: {}".format(args))

    def _print_dict(self, args):
        # return " / ".join(str(key) + ": "+ str(value) for key, value in args.items())
        string = ''
        for key, value in args.items():
            if key is not '_id':
                string += str(key) + ": "+ str(value) + " / "
        return string

    def train_log(self, args={}):
        """Save the training log.

        Parameters
        -----------
        args : dictionary, items to save.

        Examples
        ---------
        >>> db.train_log(time=time.time(), {'loss': loss})
        """
        _result = self.db.TrainLog.insert_one(args)
        _log = self._print_dict(args)
        print("[TensorDB] TrainLog: " +_log)
        return _result

    def del_train_log(self):
        """ Delete train log. """
        self.db.TrainLog.delete_many({})
        print("[TensorDB] Delete TrainLog SUCCESS")

    def valid_log(self, args={}):
        """Save the validating log.

        Parameters
        -----------
        args : dictionary, items to save.

        Examples
        ---------
        >>> db.valid_log(time=time.time(), {'loss': loss})
        """
        _result = self.db.ValidLog.insert_one(args)
        # _log = "".join(str(key) + ": " + str(value) for key, value in args.items())
        _log = self._print_dict(args)
        print("[TensorDB] ValidLog: " +_log)
        return _result

    def del_valid_log(self):
        """ Delete validation log. """
        self.db.ValidLog.delete_many({})
        print("[TensorDB] Delete ValidLog SUCCESS")

    def test_log(self, args={}):
        """Save the testing log.

        Parameters
        -----------
        args : dictionary, items to save.

        Examples
        ---------
        >>> db.test_log(time=time.time(), {'loss': loss})
        """
        _result = self.db.TestLog.insert_one(args)
        # _log = "".join(str(key) + str(value) for key, value in args.items())
        _log = self._print_dict(args)
        print("[TensorDB] TestLog: " +_log)
        return _result

    def del_test_log(self):
        """ Delete test log. """
        self.db.TestLog.delete_many({})
        print("[TensorDB] Delete TestLog SUCCESS")

    def __str__(self):
        _s = "[TensorDB] Info:\n"
        _t = _s + "    " + str(self.db)
        return _t















































































































































#
