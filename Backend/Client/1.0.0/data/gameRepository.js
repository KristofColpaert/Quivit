var gameRepository = (function() {
    'use strict';

    //Variables
    var mongoskin = require('mongoskin')
    var db = mongoskin.db('mongodb://quivitUser:Test123@quivitdb.cloudapp.net/quivitserver', {safe : true});
    var errorLogger = require('../modules/errorLogger.js');
    var ObjectID = require('mongoskin').ObjectID;

    //Functions
    var getSingle = function(id, callback) {
        db.collection('games').find({ _id : ObjectID(id) }).toArray(function(error, result) {
            if(error) {
                errorLogger.log('database', error);
            }
            else {
                callback(result);
            }
        });
    };

    var getByDateExcluded = function(gameDate, callback) {
        db.collection('games').find({ gameDate : gameDate }).toArray(function(error, result) {
            if(error) {
                errorLogger.log('database', error);
            }
            else {
                callback(result);
            }
        });
    };

    var getByDateIncluded = function(gameDate, callback) {
        db.collection('games').find({ gameDate : gameDate }).toArray(function(error, result) {
            if(error) {
                errorLogger.log('database', error);
            }
            else {
                var counter = 0;
                result.forEach(function(resultObject) {
                    db.collection('teams').find({ _id : ObjectID(resultObject.teamHomeId) }).toArray(function(error, teamHomeResult) {
                        if(error) {
                            errorLogger.log('database', error);
                        }
                        else {
                            resultObject.teamHome = teamHomeResult[0];
                            db.collection('teams').find({ _id : ObjectID(resultObject.teamAwayId) }).toArray(function(error, teamAwayResult) {
                                if(error) {
                                    errorLogger.log('database', error);
                                }
                                else {
                                    resultObject.teamAway = teamAwayResult[0];

                                    //Send games, loaded with home teams and away teams.
                                    if(counter == (result.length - 1)) {
                                        callback(result);
                                    }
                                    counter++;
                                }
                            });
                        }
                    });
                });
            }
        });
    };

    var getFuture = function(gameDate, callback) {
        db.collection('games').find({ gameDate : { $gt : gameDate }}).toArray(function(error, result) {
            if(error) {
                errorLogger.log('database', error);
            }
            else {
                callback(result);
            }
        });
    };

    var add = function(newGame, callback) {
        db.collection('games').insert(newGame, function(error, result) {
            if(error) {
                errorLogger.log('database', error);
            }
            else {
                var gameId = result.insertedIds[0];
                var resultObject = newGame.toJSON();
                resultObject._id = gameId;
                callback(result);
            }
        });
    }

    //Return
    return {
        getSingle : getSingle,
        getByDateExcluded : getByDateExcluded,
        getByDateIncluded : getByDateIncluded,
        getFuture : getFuture,
        add : add
    };
})();

module.exports = gameRepository;