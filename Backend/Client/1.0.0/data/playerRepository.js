var playerRepository = (function() {
    'use strict';

    //Variables
    var mongoskin = require('mongoskin')
    var db = mongoskin.db('mongodb://quivitUser:Test123@quivitdb.cloudapp.net/quivitserver', {safe : true});
    var errorLogger = require('../modules/errorLogger.js');
    var ObjectID = require('mongoskin').ObjectID;

    //Methods
    var getSingle = function(id, callback) {
        db.collection('players').find({ _id : ObjectID(id) }).toArray(function(error, result) {
            if(error) {
                errorLogger('database', error);
            }
            else {
                callback(result);
            }
        });
    };

    var getAll = function(callback) {
        db.collection('players').find().toArray(function(error, result) {
            if(error) {
                errorLogger('database', error);
            }
            else {
                callback(result);
            }
        })
    };

    var getByTeam = function(teamId, callback) {
        db.collection('players').find({ teamId : teamId }).toArray(function(error, result) {
            if(error) {
                errorLogger('database', error);
            }
            else {
                callback(result);
            }
        });
    };

    var add = function(newPlayer, callback) {
        db.collection('players').insert(newPlayer, function(error, result) {
            if(error) {
                errorLogger.log('database', error);
            }
            else {
                var playerId = result.insertedIds[0];
                var resultObject = newPlayer.toJSON();
                resultObject._id = playerId;
                callback(result);
            }
        });
    };

    //Return
    return {
        getSingle : getSingle,
        getAll : getAll,
        getByTeam : getByTeam,
        add : add
    }
})();

module.exports = playerRepository;