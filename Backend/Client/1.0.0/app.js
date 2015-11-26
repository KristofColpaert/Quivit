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
    path = require('path');

var routeGame = require('./routes/api/game.js'),
    routePlayer = require('./routes/api/player.js'),
    routeTeam = require('./routes/api/team.js'),
    routeRoot = require('./routes/root.js');

//Setup port of server.
var port = 3000;

//Start server.
var server = app.listen(port);
console.log('Server is listening to port ' + port);

//Setup socket.io.
var io = require('socket.io')(server);
var positionHandler = require('./modules/positionHandler.js')(io);

/*
** Setup
 */

//Setup logging.
app.use(logger('dev'));

//Tell Express to use bodyparser. Bodyparser lets us parse the body of POST requests.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Set socket.io
app.set('socketio', io);

/*
** Routes
 */

app.use('/', routeRoot);
app.use('/api/game', routeGame);
app.use('/api/player', routePlayer);
app.use('/api/team', routeTeam);

/*
** Errors
 */

//Catch 404
app.use(function(req, res, next) {
    var error = new Error('Not found');
    error.status = 404;
    next(error);
});