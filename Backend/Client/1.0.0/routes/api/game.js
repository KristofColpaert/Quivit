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
    var gameDate = Math.floor(new Date(req.params.year, req.params.month - 1, req.params.day) / 1000) + '';
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
    var gameDate = new Date();
    gameDate.setHours(23);
    gameDate.setMinutes(59);
    gameDate.setSeconds(59);
    gameDate = Math.floor(gameDate / 1000) + '';
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
    var teamHomeId = req.body.teamHomeId;
    var teamAwayId = req.body.teamAwayId;
    var estimoteLocationId = req.body.estimoteLocationId;
    var isGameFinished = req.body.isGameFinished;
    var newGame = new Game(gameDate, teamHomeId, teamAwayId, estimoteLocationId, isGameFinished, 0, 0);

    var gameId;

    db.collection('games').insert(newGame, function(error, result) {
        if(error) {
            errorLogger.log('database', error);
        }
        else {
            gameId = result.insertedIds[0];
            res.json({ _id : gameId });
        }
    });
});

module.exports = router;