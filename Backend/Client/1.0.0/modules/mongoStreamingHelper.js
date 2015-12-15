var util = require('util');
var EventEmitter = require('events').EventEmitter;

var MongoStreamingHelper = function() {
    'use strict';

    //Variables
    var MongoClient = require('mongodb').MongoClient;
    var constants = require('../data/constants.js');
    var errorLogger = require('../modules/errorLogger.js');
    var dbConnection;
    var self = this;

    //Functions
    EventEmitter.call(self);

    self.createMongoDbClient = function() {
        MongoClient.connect(constants.DATABASE_URL, function(error, db) {
            if(error) {
                errorLogger.log(error);
            }
            else {
                dbConnection = db;
                self.emit('connection', 'open');
            }
        })
    };

    self.getStreamingData = function(collectionName, limit, page) {
        var stream = dbConnection.collection(collectionName).find().limit(limit).skip(page * limit).stream();

        stream.on('end', function() {
            self.emit('connection', 'close');
            dbConnection.close();
        });

        stream.on('data', function(data) {
            self.emit('data', data);
        });
    };
};

util.inherits(MongoStreamingHelper, EventEmitter);

module.exports = MongoStreamingHelper;