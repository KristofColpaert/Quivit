var express = require('express'),
    router = express.Router(),
    Game = require('../../models/Game.js'),
    MongoDbClient = require('../../helpers/MongoDbClient.js')

//POST: new game
router.post('/', function(req, res) {
    //Make new object
    var matchDate = req.body.matchDate;
    var teamHome = req.body.teamHome;
    var teamAway = req.body.teamAway;
    var newGame = new Game(matchDate, teamHome, teamAway);

    //Make database connection
    var dbClient = new MongoDbClient();

    dbClient.on('connection', function(dbConnection) {
        //Insert data
        dbClient.insertData(dbConnection, newGame.toString() + 'Settings', newGame);
    });
    dbClient.on('error', function(error) {
        console.log(error);
    });
    dbClient.on('insert', function(insert) {
        res.json(insert.ops);
    });

    dbClient.createMongoDbClient();
});

module.exports = router;