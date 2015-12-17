var express = require('express'),
    router = express.Router(),
    Game = require('../../models/Game.js'),
    gameRepository = require('../../data/gameRepository.js'),
    heatMapGenerator = require('../../modules/heatMapGenerator.js');

//GET: get game by id
router.get('/:id', function(req, res) {
    //Get id
    var id = req.params.id;
    gameRepository.getSingle(id, function(result) {
       res.json(result);
    });
});

//GET: get heat map
router.get('/:gameId/:playerId', function(req, res) {
    //Get ids
    var gameId = req.params.gameId;
    var playerId = req.params.playerId;

    heatMapGenerator.getHeatMapData(gameId, playerId, function(error, result) {
        if(!error) {
            res.json(result);
        }
    });
});

//GET: get games by date
router.get('/:year/:month/:day/:method', function(req, res) {
    //Get games of today
    if(req.params.method === 'included') {
        var gameDate = '' + req.params.year + req.params.month + req.params.day;
        gameRepository.getByDateIncluded(gameDate, function(result) {
            res.json(result);
        });
    }

    else if(req.params.method === 'excluded') {
        var gameDate = '' + req.params.year + req.params.month + req.params.day;
        gameRepository.getByDateExcluded(gameDate, function(result) {
            res.json(result);
        });
    }

    else if(req.params.method === 'past') {
        gameRepository.getPast(req.params.year, req.params.month, req.params.day, function(result) {
           res.json(result);
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
    gameRepository.getFuture(gameDate, function(result) {
       res.json(result);
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
    var image = req.body.image;
    var newGame = new Game(gameDate, gameTime, teamHomeId, teamAwayId, estimoteLocationId, isGameFinished, 0, 0, image);
    gameRepository.add(newGame, function(result) {
        res.json(result);
    });
});

module.exports = router;