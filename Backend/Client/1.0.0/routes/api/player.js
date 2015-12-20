var express = require('express'),
    router = express.Router(),
    Player = require('../../models/Player.js'),
    playerRepository = require('../../data/playerRepository.js'),
    authenticator = require('../../modules/authenticator.js');

//GET: get all players
router.get('/', function(req, res) {
    playerRepository.getAll(function(result) {
       res.json(result);
    });
});

//GET: get players by team or by id
router.get('/:method/:value', function(req, res) {
    //Get method and value
    var method = req.params.method;
    var value = req.params.value;

    if(method == 'id') {
        playerRepository.getSingle(value, function(result) {
            res.json(result);
        });
    }

    else if(method == 'team') {
        playerRepository.getByTeam(value, function(result) {
            res.json(result);
        });
    }
});

//POST: insert new player
router.post('/', authenticator, function(req, res) {
    //Make new object
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var kitNumber = req.body.kitNumber;
    var teamId = req.body.teamId;
    var newPlayer = new Player(firstName, lastName, kitNumber, teamId);
    playerRepository.add(newPlayer, function(result) {
        res.json(result);
    });
});

module.exports = router;