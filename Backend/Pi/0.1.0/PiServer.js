/**
 * Created by kristofcolpaert on 06/11/15.
 */

/**
 * This module creates a TCP server.
 * @type {Function}
 */
var PiServer = (function () {
    'use strict';

    //Variables
    var net = require('net');
    var ip = require('ip');

    var sockets = new Array();
    var serverIp = ip.address();
    var server;

    //Functions
    var getPiServerIp = function() {
        return serverIp;
    };

    var createPiServer = function(port) {
        server = net.createServer(function(socket) {
            sockets.push(socket);
            socket.setEncoding('utf8');

            socket.on('end', function(data) {
                var sockeckIndex = sockets.indexOf(socket);
                sockets.splice(sockeckIndex, 1);
            });
        }).listen(port);
    };

    var writeData = function(data, callback) {
        if(!server) {
            var error = "Oops! Server is not running.";
            callback(error, null);
        }

        else if(!data) {
            var error = "Oops! Please define data before trying to emit it.";
            callback(error, null);
        }

        else {
            try {
                if(sockets.length > 0) {
                    sockets.forEach(function(socket) {
                        socket.write(data);
                    });
                    callback(null, true);
                }

                else {
                    var error = "Oops! No clients connected.";
                    callback(error, null);
                }
            }
            catch(exception) {
                console.log(exception);
                var error = "Oops! Something went wrong sending the data to the clients.";
                callback(error, null);
            }
        }
    }

    //Return
    return {
        getPiServerIp : getPiServerIp,
        createPiServer : createPiServer,
        writeData : writeData
    };
})();

module.exports = PiServer;