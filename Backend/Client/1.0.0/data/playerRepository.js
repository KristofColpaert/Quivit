var playerRepository = (function() {
    'use strict';

    //Variables
    var constants = require('./constants.js');
    var mongoskin = require('mongoskin');
    var errorLogger = require('../modules/errorLogger.js');
    var db = mongoskin.db(constants.DATABASE_URL, {safe : true});
    var ObjectID = require('mongoskin').ObjectID;

    //Methods
    var getSingle = function(id, callback) {
        db.collection('players').find({ _id : ObjectID(id) }).toArray(function(error, result) {
            if(error) {
                errorLogger.log(error);
            }
            else {
                callback(result);
            }
        });
    };

    var getAll = function(callback) {
        db.collection('players').find().toArray(function(error, result) {
            if(error) {
                errorLogger.log(error);
            }
            else {
                callback(result);
            }
        })
    };

    var getByTeam = function(teamId, callback) {
        db.collection('players').find({ teamId : teamId }).toArray(function(error, result) {
            if(error) {
                errorLogger.log(error);
            }
            else {
                callback(result);
            }
        });
    };

    var add = function(newPlayer, callback) {
        db.collection('players').insert(newPlayer, function(error, result) {
            if(error) {
                errorLogger.log(error);
            }
            else {
                var playerId = result.insertedIds[0];
                var resultObject = newPlayer.toJSON();
                resultObject._id = playerId;
                callback(resultObject);
            }
        });
    };

    var remove = function(id, callback) {
        db.collection('players').remove({ _id : ObjectID(id) }, function(error, result) {
            if(error) {
                errorLogger.log(error);
            }
            else {
                callback(result);
            }
        });
    };

    //Return
    return {
        getSingle : getSingle,
        getAll : getAll,
        getByTeam : getByTeam,
        add : add,
        remove : remove
    }
})();

module.exports = playerRepository;