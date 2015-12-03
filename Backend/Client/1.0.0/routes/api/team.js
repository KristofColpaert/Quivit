var express = require('express'),
    router = express.Router(),
    Team = require('../../models/Team.js'),
    teamRepository = require('../../data/teamRepository.js');

//GET: get team by id
router.get('/:id', function(req, res) {
    //Get id
    var id = req.params.id;
    teamRepository.getSingle(id, function(result) {
        res.json(result);
    });
})

//GET: get all teams
router.get('/', function(req, res) {
    teamRepository.getAll(function(result) {
       res.json(result);
    });
});

//POST: insert new team
router.post('/', function(req, res) {
    //Make new object
    var name = req.body.name;
    var primaryColor = req.body.primaryColor;
    var secondaryColor = req.body.secondaryColor;
    var newTeam = new Team(name, primaryColor, secondaryColor);
    teamRepository.add(newTeam, function(result) {
        res.json(result);
    });
});

module.exports = router;