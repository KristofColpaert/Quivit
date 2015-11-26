var express = require('express'),
    router = express.Router(),
    Player = require('../../models/Player.js'),
    errorLogger = require('../../modules/errorLogger.js'),
    mongoskin = require('mongoskin'),
    db = mongoskin.db('mongodb://quivitUser:Test123@quivitdb.cloudapp.net/quivitserver', {safe : true}),
    ObjectID = require('mongoskin').ObjectID;

//GET: get players by team or by id
router.get('/:method/:value', function(req, res) {
    //Get method and value
    var method = req.params.method;
    var value = req.params.value;

    if(method == 'id') {

        db.collection('players').find({ _id : ObjectID(value) }).toArray(function(error, result) {
            if(error) {
                errorLogger('database', error);
            }
            else {
                res.json(result);
            }
        });
    }

    else if(method == 'team') {
        db.collection('players').find({ teamId : value }).toArray(function(error, result) {
            if(error) {
                errorLogger('database', error);
            }
            else {
                res.json(result);
            }
        });
    }
})

//POST: insert new player
router.post('/', function(req, res) {
    //Make new object
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var kitNumber = req.body.kitNumber;
    var teamId = req.body.teamId;
    var newPlayer = new Player(firstName, lastName, kitNumber, teamId);

    var playerId;

    db.collection('players').insert(newPlayer, function(error, result) {
        if(error) {
            errorLogger.log('database', error);
        }
        else {
            playerId = result.insertedIds[0];
            res.json({ _id : playerId })
        }
    });
});

module.exports = router;