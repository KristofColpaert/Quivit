var positionHandler = (function(io) {
    'use strict'

    //Variables
    var io = io;

    //When someone connects to socket
    io.on('connection', function(socket) {
        socket.on('position', function(msg) {
           io.emit(msg.gameId, msg);
        });
    });
})();

module.exports = positionHandler;