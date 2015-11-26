var express = require('express'),
    router = express.Router(),
    Team = require('../../models/Team.js'),
    errorLogger = require('../../modules/errorLogger.js'),
    mongoskin = require('mongoskin'),
    db = mongoskin.db('mongodb://quivitUser:Test123@quivitdb.cloudapp.net/quivitserver', {safe : true}),
    ObjectID = require('mongoskin').ObjectID;

//GET: get team by id
router.get('/:id', function(req, res) {
    //Get id
    var id = req.params.id;

    db.collection('teams').find({ _id : ObjectID(id) }).toArray(function(error, result) {
        if(error) {
            errorLogger.log('database', error);
        }
        else {
            res.json(result);
        }
    })
})

//GET: get all teams
router.get('/', function(req, res) {
    db.collection('teams').find().toArray(function(error, result) {
        if(error) {
            errorLogger.log('database', error);
        }
        else {
            res.json(result);
        }
    });
});

//POST: insert new team
router.post('/', function(req, res) {
    //Make new object
    var name = req.body.name;
    var primaryColor = req.body.primaryColor;
    var secondaryColor = req.body.secondaryColor;
    var newTeam = new Team(name, primaryColor, secondaryColor);

    var teamId;

    db.collection('teams').insert(newTeam, function(error, result) {
        if(error) {
            errorLogger.log('database', error);
        }
        else {
            teamId = result.insertedIds[0];
            res.json({ _id : teamId });
        }
    });
});

module.exports = router;