/**
 * Created by kristofcolpaert on 02/11/15.
 */

var bleacon = require('bleacon'),
    net = require('net'),
    sockets = [];

var server = net.createServer(
    function(socket) {
        console.log("Welkom op deze server.");
        sockets.push(socket);
        socket.setEncoding('utf8');
    }
).listen(1337);

bleacon.on('discover', function(bleacon) {
    if(sockets.length != null) {
        sockets.forEach(function(socket) {
            socket.write(JSON.stringify(bleacon));
        });
    }
});

bleacon.startScanning();