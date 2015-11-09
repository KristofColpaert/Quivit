/**
 * Created by kristofcolpaert on 09/11/15.
 */

var PiClient = require('./PiClient.js');
var servers = [{ port : 1337, address : 'localhost' }];

var client = new PiClient(servers);
client.createPiClient();
client.on('beacon', function(data) {
    console.log(data);
});