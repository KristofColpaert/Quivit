var socketHandler = function(io) {
    'use strict'

    //Variables
    var io = io;
    var playerPositionRepository = require('../data/playerPositionRepository.js');
    var gameRepository = require('../data/gameRepository.js');
    var PlayerPosition = require('../models/PlayerPosition.js');
    var MongoStreamingHelper = require('./MongoStreamingHelper.js');

    //When someone connects to socket
    io.on('connection', function(socket) {
        //Past games
        socket.on('createPast', function(room) {
            var collectionName = room.substr(4);

            socket.join(room);

            socket.on('more', function(page) {
                //Create data stream.
                var stream = new MongoStreamingHelper();

                //If receiving data from database, send to client.
                stream.on('data', function(data) {
                    io.to(room).emit('data', data);
                });

                //If connection is open, start streaming.
                stream.on('connection', function(state) {
                    if(state === 'open') {
                        stream.getStreamingData(collectionName, 500, page, { timestamp : 1 });
                    }
                });

                //Create Mongo Client.
                stream.createMongoDbClient();
            });

            socket.on('goaway', function(state) {
                if(state === 'disconnect') {
                    socket.disconnect();
                }
            });
        });

        //Manage live game
        socket.on('createManage', function(room){
            var gameId = room.substr(4);

            socket.join(room);

            socket.on('home', function(add){
                gameRepository.addToHomeScore(gameId, function(result){
                    io.to(room).emit('score', { team : 'home', score : result });
                });
            });

            socket.on('away', function(add) {
                gameRepository.addToAwayScore(gameId, function(result){
                    io.to(room).emit('score', { team : 'away', score : result });
                });
            });

            socket.on('goaway', function(state) {
                if(state === 'disconnect') {
                    socket.disconnect();
                }
            });
        });

        //Server gets a position and emits it to subscribers.
        socket.on('position', function(msg) {
            io.emit(msg.playerId, msg);
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

module.exports = socketHandler;