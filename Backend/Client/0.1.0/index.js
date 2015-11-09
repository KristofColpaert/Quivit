var PiClient = require('./PiClient.js');
var servers = [{ port : 1337, address : 'localhost' }];

var client = new PiClient(servers);
client.createPiClient();
client.on('beacon', function(data) {
    console.log(data);
});