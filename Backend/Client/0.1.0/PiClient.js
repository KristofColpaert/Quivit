var util = require('util');
var EventEmitter = require('events').EventEmitter;

function PiClient(servers) {
    'use strict';

    //Variables
    var net = require('net');
    var servers = servers;
    var clients = new Array();
    var self = this;

    //Functions
    EventEmitter.call(self);

    self.createPiClient = function(){
        servers.forEach(function(server) {
            var client = net.connect(server.port, server.address);
            clients.push(client);

            client.on('data', function(data) {
                self.emit('beacon', data.toString('utf8'));
            });
        });
    }
};

util.inherits(PiClient, EventEmitter);

module.exports = PiClient;