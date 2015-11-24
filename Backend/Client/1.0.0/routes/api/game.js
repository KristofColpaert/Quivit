var express = require('express'),
    router = express.Router(),
    Game = require('../../models/Game.js'),
    errorLogger = require('../../helpers/errorLogger.js'),
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
    //Get date
    console.log('hier');
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

//POST: insert new game
router.post('/', function(req, res) {
    //Make new object
    var gameDate = req.body.gameDate;
    var teamHomeId = req.body.teamHomeId;
    var teamAwayId = req.body.teamAwayId;
    var estimoteLocationId = req.body.estimoteLocationId;
    var newGame = new Game(gameDate, teamHomeId, teamAwayId, estimoteLocationId);

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