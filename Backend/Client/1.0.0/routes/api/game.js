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
router.get('/:year/:month/:day', function(req, res) {
    //Get games of today
    var gameDate = '' + req.params.year + req.params.month + req.params.day;
    db.collection('games').find({ gameDate : gameDate }).toArray(function(error, result) {
        if(error) {
            errorLogger.log('database', error);
        }
        else {
            res.json(result);
        }
    });
});

//GET: get future games
router.get('/', function(req, res) {
    var tempGameDate = new Date();
    var gameDate = '' + tempGameDate.getFullYear() + (tempGameDate.getMonth() + 1) + tempGameDate.getDate();
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