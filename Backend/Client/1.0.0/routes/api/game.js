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
    var matchDate = '' + req.params.year + req.params.month + req.params.day;
    db.collection('games').find({ matchDate : matchDate }).toArray(function(error, result) {
        if(error) {
            errorLogger.log('database', error);
        }
        else {
            res.json(result);
        }
    });
});

//POST: new game
router.post('/', function(req, res) {
    //Make new object
    var matchDate = req.body.matchDate;
    var teamHome = req.body.teamHome;
    var teamAway = req.body.teamAway;
    var estimoteLocationId = req.body.estimoteLocationId;
    var newGame = new Game(matchDate, teamHome, teamAway, estimoteLocationId);

    var matchId;

    //Insert in date collection
    db.collection('games').insert(newGame, function(error, result) {
        if(error) {
            errorLogger.log('database', error);
        }
        else {
            matchId = result.insertedIds[0];

            //Make settings collection and insert
            db.collection('Settings' + matchId).insert(newGame, function(error, result) {
                if(error) {
                    errorLogger.log('database', error);
                }
                else {
                    res.json({ _id : matchId });
                }
            });
        }
    });
});

module.exports = router;