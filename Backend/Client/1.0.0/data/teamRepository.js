var teamRepository = (function() {
    'use strict';

    //Variables
    var constants = require('./constants.js');
    var mongoskin = require('mongoskin');
    var errorLogger = require('../modules/errorLogger.js');
    var db = mongoskin.db(constants.DATABASE_URL, {safe : true});
    var ObjectID = require('mongoskin').ObjectID;

    //Functions
    var getSingle = function(id, callback) {
        db.collection('teams').find({ _id : ObjectID(id) }).toArray(function(error, result) {
            if(error) {
                errorLogger.log(error);
            }
            else {
                callback(result);
            }
        });
    };

    var getAll = function(callback) {
        db.collection('teams').find().toArray(function(error, result) {
            if(error) {
                errorLogger.log(error);
            }
            else {
                callback(result);
            }
        });
    };

    var add = function(newTeam, callback) {
        db.collection('teams').insert(newTeam, function(error, result) {
            if(error) {
                errorLogger.log(error);
            }
            else {
                var teamId = result.insertedIds[0];
                var resultObject = newTeam.toJSON();
                resultObject._id = teamId;
                callback(resultObject);
            }
        });
    };

    var remove = function(id, callback) {
        db.collection('teams').remove({ _id : ObjectID(id) }, function(error, result) {
            if(error) {
                errorLogger.log(error);
            }
            else {
                callback(result);
            }
        });
    }

    //Return
    return {
        getSingle : getSingle,
        getAll : getAll,
        add : add,
        remove : remove
    };
})();

module.exports = teamRepository;