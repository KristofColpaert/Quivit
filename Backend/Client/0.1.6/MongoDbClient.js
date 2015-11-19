/**
 * Created by kristofcolpaert on 16/11/15.
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;

function MongoDbClient(url) {
    'use strict';

    //Variables
    var MongoClient = require('mongodb').MongoClient;
    var url = url;
    var dbConnection;
    var self = this;

    //Functions
    EventEmitter.call(self);

    self.createMongoDbClient = function() {
        MongoClient.connect(url, function(error, db) {
            if(error) {
               self.emit('error', 'Error. Failed to connect to the specified MongoDB instance.')
            }
            else {
                dbConnection = db;
            }
        });
    };

    self.insertData = function(collection, data) {
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
                    self.emit('result', result);
                }
            });
        }
    };

    self.deleteMongoDbClient = function() {
        dbConnection.close();
    };
};

util.inherits(MongoDbClient, EventEmitter);

module.exports = MongoDbClient;