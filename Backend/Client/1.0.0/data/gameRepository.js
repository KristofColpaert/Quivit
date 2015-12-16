var gameRepository = (function() {
    'use strict';

    //Variables
    var constants = require('./constants.js');
    var mongoskin = require('mongoskin');
    var errorLogger = require('../modules/errorLogger.js');
    var db = mongoskin.db(constants.DATABASE_URL, {safe : true});
    var ObjectID = require('mongoskin').ObjectID;
    var dateCalculator = require('../modules/dateCalculator.js');
    var MongoStreamingHelper = require('../modules/MongoStreamingHelper.js');

    //Functions
    var getSingle = function(id, callback) {
        db.collection('games').find({ _id : ObjectID(id) }).toArray(function(error, result) {
            if(error) {
                errorLogger.log(error);
            }
            else {
                callback(result);
            }
        });
    };

    var getByDateExcluded = function(gameDate, callback) {
        db.collection('games').find({ gameDate : gameDate }).toArray(function(error, result) {
            if(error) {
                errorLogger.log(error);
            }
            else {
                callback(result);
            }
        });
    };

    var getByDateIncluded = function(gameDate, callback) {
        db.collection('games').find({ gameDate : gameDate }).toArray(function(error, result) {
            if(error) {
                errorLogger.log(error);
            }
            else {
                var counter = 0;
                result.forEach(function(resultObject) {
                    db.collection('teams').find({ _id : ObjectID(resultObject.teamHomeId) }).toArray(function(error, teamHomeResult) {
                        if(error) {
                            errorLogger.log(error);
                        }
                        else {
                            resultObject.teamHome = teamHomeResult[0];
                            db.collection('teams').find({ _id : ObjectID(resultObject.teamAwayId) }).toArray(function(error, teamAwayResult) {
                                if(error) {
                                    errorLogger.log(error);
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
                errorLogger.log(error);
            }
            else {
                callback(result);
            }
        });
    };

    var getPast = function(year, month, day, callback) {
        var maxGameDateString = '' + year + month + day;
        var minGameDate = dateCalculator.addMonths(new Date(year, month - 1, day), -1);
        var minGameDateString = '' + minGameDate.getFullYear() + (minGameDate.getMonth() + 1) + minGameDate.getDate();

        db.collection('games').find({ gameDate : { $gt : minGameDateString, $lt : maxGameDateString }}).toArray(function(error, result) {
            if(error) {
                errorLogger.log(error);
            }
            else {
                callback(result);
            }
        });
    };

    var add = function(newGame, callback) {
        db.collection('games').insert(newGame, function(error, result) {
            if(error) {
                errorLogger.log(error);
            }
            else {
                var gameId = result.insertedIds[0];
                var resultObject = newGame.toJSON();
                resultObject._id = gameId;
                callback(resultObject);
            }
        });
    };

    var addToHomeScore = function(gameId, callback) {
        getSingle(gameId, function(result) {
            var score = result[0].scoreHome + 1;
            db.collection('games').update({ _id : ObjectID(gameId)}, { $set : { scoreHome : score }}, function(error) {
                if(error) {
                    errorLogger.log(error);
                }

                else {
                    callback(score);
                }

            });
        })
    };

    var addToAwayScore = function(gameId, callback) {
        getSingle(gameId, function(result) {
            var score = result[0].scoreAway + 1;
            console.log(score);
            db.collection('games').update({ _id : ObjectID(gameId)}, { $set : { scoreAway : score }}, function(error) {
                if(error) {
                    errorLogger.log(error);
                }

                else {
                    callback(score);
                }
            });
        })
    };

    //Return
    return {
        getSingle : getSingle,
        getByDateExcluded : getByDateExcluded,
        getByDateIncluded : getByDateIncluded,
        getFuture : getFuture,
        getPast : getPast,
        add : add,
        addToHomeScore : addToHomeScore,
        addToAwayScore : addToAwayScore
    };
})();

module.exports = gameRepository;