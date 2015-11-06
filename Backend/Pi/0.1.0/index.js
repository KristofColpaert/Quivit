/**
 * Created by kristofcolpaert on 06/11/15.
 */

var TcpServer = require('./PiServer.js');
var PiBeacon = require('./PiBeacon.js');

TcpServer.createPiServer(1337);
PiBeacon.createPiBeacon(function(error, data) {
    if(!error) {
        var clientObject = {
            "serverIp" : TcpServer.getPiServerIp(),
            "data" : data
        };
        var clientString = JSON.stringify(clientObject);

        TcpServer.writeData(clientString, function(error, result) {
            if(error) {
                console.log(error);
            }

            else {
                console.log(result);
            }
        });
    }
})