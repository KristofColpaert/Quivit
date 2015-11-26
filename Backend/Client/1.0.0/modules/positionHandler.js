var positionHandler = function(io) {
    'use strict'

    //Variables
    var io = io;
    var errorLogger = require('./errorLogger.js');
    var mongoskin = require('mongoskin');
    var db = mongoskin.db('mongodb://quivitUser:Test123@quivitdb.cloudapp.net/quivitserver', {safe : true});
    var PlayerPosition = require('../models/PlayerPosition.js');

    //When someone connects to socket
    io.on('connection', function(socket) {
        //Server gets a position and emits it to subscribers.
        socket.on('position', function(msg) {
            var msgObject = JSON.parse(msg);
            io.emit(msgObject.gameId, msg);
        });

        //Server gets a positions and saves it in the database.
        socket.on('position', function(msg) {
            var msgObject = JSON.parse(msg);
            var newPlayerPosition = new PlayerPosition(msgObject.x, msgObject.y, msgObject.orientation, msgObject.timestamp,
                msgObject.estimoteLocationId, msgObject.playerId, msgObject.teamId, msgObject.gameId);
            db.collection(newPlayerPosition.toString()).insert(newPlayerPosition, function(error, result){
                if(error) {
                    errorLogger.log('database', error);
                }
            });
        });
    });
};

module.exports = positionHandler;