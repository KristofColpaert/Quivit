var teamRepository = (function() {
    'use strict';

    //Variables
    var constants = require('./constants.js');
    var mongoskin = require('mongoskin')
    var db = mongoskin.db(constants.DATABASE_URL, {safe : true});
    var errorLogger = require('../modules/errorLogger.js');
    var ObjectID = require('mongoskin').ObjectID;

    //Functions
    var getSingle = function(id, callback) {
        db.collection('teams').find({ _id : ObjectID(id) }).toArray(function(error, result) {
            if(error) {
                errorLogger.log('database', error);
            }
            else {
                callback(result);
            }
        });
    };

    var getAll = function(callback) {
        db.collection('teams').find().toArray(function(error, result) {
            if(error) {
                errorLogger.log('database', error);
            }
            else {
                callback(result);
            }
        });
    };

    var add = function(newTeam, callback) {
        db.collection('teams').insert(newTeam, function(error, result) {
            if(error) {
                errorLogger.log('database', error);
            }
            else {
                var teamId = result.insertedIds[0];
                var resultObject = newTeam.toJSON();
                resultObject._id = teamId;
                callback(result);
            }
        });
    };

    //Return
    return {
        getSingle : getSingle,
        getAll : getAll,
        add : add
    };
})();

module.exports = teamRepository;