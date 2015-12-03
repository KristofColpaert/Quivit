var positionHandler = function(io) {
    'use strict'

    //Variables
    var io = io;
    var playerPositionRepository = require('../data/playerPositionRepository.js');
    var PlayerPosition = require('../models/PlayerPosition.js');

    //When someone connects to socket
    io.on('connection', function(socket) {
        //Server gets a position and emits it to subscribers.
        socket.on('position', function(msg) {
            io.emit(msg.gameId, msg);
        });

        //Server gets a positions and saves it in the database.
        socket.on('position', function(msg) {
            var newPlayerPosition = new PlayerPosition(msg.x, msg.y, msg.orientation, msg.timestamp,
                msg.estimoteLocationId, msg.playerId, msg.teamId, msg.gameId);

            playerPositionRepository.add(newPlayerPosition);
        });

        socket.on('error', function(error) {
            console.log(error);
        });
    });
};

module.exports = positionHandler;