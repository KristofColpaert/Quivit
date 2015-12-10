/**
 * Created by kristofcolpaert on 22/11/15.
 */

/*
** Variables
*/

var express = require('express'),
    app = express(),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    path = require('path'),
    fs = require('fs');

var routeGame = require('./routes/api/game.js'),
    routePlayer = require('./routes/api/player.js'),
    routeTeam = require('./routes/api/team.js'),
    routeEstimoteLocation = require('./routes/api/estimoteLocation.js'),
    routeRoot = require('./routes/root.js');

/*
** Setup
 */

//Setup logging.
var logStream = fs.createWriteStream(__dirname + '/logs/httpErrors.log', {flags : 'a'})
app.use(logger('combined', {
    skip : function(req, res) {
        return res.statusCode < 400;
    },
    stream : logStream
}));

//Allow CORS (Cross-Origin Resource Sharing)
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({type : 'application/json' }));

/*
** Routes
 */

app.use('/', routeRoot);
app.use('/api/game', routeGame);
app.use('/api/player', routePlayer);
app.use('/api/team', routeTeam);
app.use('/api/estimoteLocation', routeEstimoteLocation);

/*
** Errors
 */

//Catch 404
app.use(function(req, res, next) {
    var error = new Error('Not found');
    error.status = 404;
    next(error);
});

module.exports = app;