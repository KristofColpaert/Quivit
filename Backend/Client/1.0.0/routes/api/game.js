var express = require('express'),
    router = express.Router(),
    Game = require('../../models/Game.js'),
    errorLogger = require('../../modules/errorLogger.js'),
    mongoskin = require('mongoskin'),
    db = mongoskin.db('mongodb://quivitUser:Test123@quivitdb.cloudapp.net/quivitserver', {safe : true}),
    ObjectID = require('mongoskin').ObjectID;

//GET: get game by id
router.get('/:id', function(req, res) {
    //Get id
    var id = req.params.id;
    db.collection('games').find({ _id: ObjectID(id) }).toArray(function(error, result) {
        if(error) {
            errorLogger.log('database', error);
        }
        else {
            res.json(result);
        }
    });
});

//GET: get games by date
router.get('/:year/:month/:day/:method', function(req, res) {
    //Get games of today
    if(req.params.method === 'included') {
        var gameDate = '' + req.params.year + req.params.month + req.params.day;
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
                                        res.json(result);
                                    }
                                    counter++;
                                }
                            });
                        }
                    });
                });
            }
        });
    }

    else if(req.params.method === 'excluded') {
        var gameDate = '' + req.params.year + req.params.month + req.params.day;
        db.collection('games').find({ gameDate : gameDate }).toArray(function(error, result) {
            if(error) {
                errorLogger.log('database', error);
            }
            else {
                res.json(result);
            }
        });
    }
});

//GET: get future games
router.get('/', function(req, res) {
    var tempGameDate = new Date();
    var tempDate = '00';

    if(tempGameDate.getDate() < 10) {
        tempDate = '0' + tempGameDate.getDate();
    }

    else {
        tempDate = tempGameDate.getDate();
    }

    var gameDate = '' + tempGameDate.getFullYear() + (tempGameDate.getMonth() + 1) + tempDate;
    db.collection('games').find({ gameDate : { $gt : gameDate }}).toArray(function(error, result) {
        if(error) {
            errorLogger.log('database', error);
        }
        else {
            res.json(result);
        }
    });
});



//POST: insert new game
router.post('/', function(req, res) {
    //Make new object
    var gameDate = req.body.gameDate;
    var gameTime = req.body.gameTime;
    var teamHomeId = req.body.teamHomeId;
    var teamAwayId = req.body.teamAwayId;
    var estimoteLocationId = req.body.estimoteLocationId;
    var isGameFinished = req.body.isGameFinished;
    var newGame = new Game(gameDate, gameTime, teamHomeId, teamAwayId, estimoteLocationId, isGameFinished, 0, 0);

    var gameId;

    db.collection('games').insert(newGame, function(error, result) {
        if(error) {
            errorLogger.log('database', error);
        }
        else {
            gameId = result.insertedIds[0];
            var resultObject = newGame.toJSON();
            resultObject._id = gameId;
            res.json(resultObject);
        }
    });
});

module.exports = router;