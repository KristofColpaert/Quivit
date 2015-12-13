var estimoteLocationRepository = (function() {
    'use strict';

    //Variables
    var constants = require('./constants.js');
    var mongoskin = require('mongoskin');
    var errorLogger = require('../modules/errorLogger.js');
    var db = mongoskin.db(constants.DATABASE_URL, {safe : true});
    var ObjectID = require('mongoskin').ObjectID;

    //Functions
    var getSingle = function(id, callback) {
        db.collection('estimoteLocations').find({ _id : ObjectID(id) }).toArray(function(error , result) {
            if(error) {
                errorLogger.log(error);
            }
            else {
                callback(result);
            }
        });
    };

    var getByEstimoteLocationId = function(estimoteLocationId, callback) {
        db.collection('estimoteLocations').find({ estimoteLocationId : estimoteLocationId }).toArray(function(error, result) {
            if(error) {
                errorLogger.log(error);
            }
            else {
                callback(result);
            }
        });
    }

    var getAll = function(callback) {
        db.collection('estimoteLocations').find().toArray(function(error, result) {
            if(error) {
                errorLogger.log(error);
            }
            else {
                callback(result);
            }
        });
    };

    var add = function(newEstimoteLocation, callback) {
        db.collection('estimoteLocations').insert(newEstimoteLocation, function(error, result) {
            if(error) {
                errorLogger.log(error);
            }
            else {
                var estimoteLocationId = result.insertedIds[0];
                var resultObject = newEstimoteLocation.toJSON();
                resultObject._id = estimoteLocationId;
                callback(resultObject);
            }
        });
    };

    //Return
    return {
        getSingle : getSingle,
        getByEstimoteLocationId : getByEstimoteLocationId,
        getAll : getAll,
        add : add
    };
})();

module.exports = estimoteLocationRepository;