var util = require('util');
var EventEmitter = require('events').EventEmitter;

function MongoDbClient() {
    'use strict';

    //Variables
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://quivitUser:Test123@quivitdb.cloudapp.net/quivitserver';
    var self = this;

    //Functions
    EventEmitter.call(self);

    self.createMongoDbClient = function() {
        MongoClient.connect(url, function(error, dbConnection) {
            if(error) {
                self.emit('error', 'Error. Failed to connect to the specified MongoDB instance.')
            }
            else {
                self.emit('connection', dbConnection);
            }
        });
    };

    self.insertData = function(dbConnection, collection, data) {
        if(!dbConnection) {
            self.emit('error', 'Error. Make a connection before inserting data.');
        }
        else {
            var collection = dbConnection.collection(collection);
            collection.insertOne(data, function(error, result) {
                if(error) {
                    self.emit('error', 'Error. Something went wrong inserting data.');
                }
                else {
                    self.emit('insert', result);
                }
            });
        }
    };

    self.deleteMongoDbClient = function(dbConnection) {
        dbConnection.close();
    };
};

util.inherits(MongoDbClient, EventEmitter);

module.exports = MongoDbClient;