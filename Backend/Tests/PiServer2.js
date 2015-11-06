/**
 * Created by kristofcolpaert on 02/11/15.
 */

var bleacon = require('bleacon'),
    net = require('net'),
    sockets = [],
    serverId = 2;

/**
 * Create a TCP server and listen to port 1337 for connections.
 */
var server = net.createServer(function(socket) {
    sockets.push(socket);
    socket.setEncoding('utf8');

    socket.on('end', function(data) {
        var socketIndex = sockets.indexOf(socket);
        sockets.splice(socketIndex, 1);
    });
}).listen(1337);

/**
 * Start scanning for beacons. When a beacon is discovered, push its data to all sockets.
 */
bleacon.startScanning();

bleacon.on('discover', function(bleacon) {
    var bleaconObject = { 'serverId' : serverId, 'beacon' : bleacon};
    var bleaconString = JSON.stringify(bleaconObject) + ';';

    if(sockets.length != null) {
        sockets.forEach(function(socket) {
            socket.write(bleaconString);
        });
    }
});