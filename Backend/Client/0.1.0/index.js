/**
 * Created by kristofcolpaert on 09/11/15.
 */

//Variables
var PiClient = require('./PiClient.js');
var averageCalculcator = require('./averageCalculator.js');
var laterationCalculator = require('./laterationCalculator.js');
var dataParser = require('./dataParser.js');

var servers = [{ port : 1337, address : '192.168.0.193'}, { port : 1337, address : '192.168.0.101' }];
var positions = [];
positions['192.168.0.193'] = [];
positions['192.168.0.101'] = [];

//Methods
var client = new PiClient(servers);
client.createPiClient();
client.on('beacon', function(data) {
    var beaconData = data.split(';');
    dataParser.parse(beaconData[0], function(error, beaconObject) {
        var currentBeaconDistance = beaconObject.data.accuracy;
        if(positions[beaconObject.serverIp].length <= 10) {
            averageCalculcator.calculate(positions[beaconObject.serverIp], function(error, average) {
                if(error) {
                    positions[beaconObject.serverIp].push(currentBeaconDistance);
                }

                else {
                    if(average < currentBeaconDistance) {
                        var percentge = 100 - ((average / currentBeaconDistance) * 100);
                        if(percentge < 30) {
                            positions[beaconObject.serverIp].push(currentBeaconDistance);
                        }
                    }

                    else if (average >= currentBeaconDistance) {
                        var percentage = ((average / currentBeaconDistance) * 100) - 100;
                        if(percentage < 30) {
                            positions[beaconObject.serverIp].push(currentBeaconDistance);
                        }
                    }
                }
            });
        }

        else {
            averageCalculcator.calculate(positions[beaconObject.serverIp], function(error, average) {
                if(error) {
                    positions[beaconObject.serverIp].push(currentBeaconDistance);
                }

                else {
                    if(average < currentBeaconDistance) {
                        var percentge = 100 - ((average / currentBeaconDistance) * 100);
                        if(percentge < 30) {
                            positions[beaconObject.serverIp].shift();
                            positions[beaconObject.serverIp].push(currentBeaconDistance);
                        }
                    }

                    else if(average >= currentBeaconDistance) {
                        var percentage = ((average / currentBeaconDistance) *100) - 100;
                        if(percentage < 30) {
                            positions[beaconObject.serverIp].shift();
                            positions[beaconObject.serverIp].push(currentBeaconDistance);
                        }
                    }
                }
            });
        }
    });

    //One observation, others are dummy data.
    var positionObjects = [
        { x : 0, y : 140, distance : ((positions['192.168.0.193'][positions['192.168.0.193'].length - 1] * 100) * 1.3) },
        { x : 431, y : 264, distance : ((positions['192.168.0.101'][positions['192.168.0.101'].length - 1] * 100) * 1.3) },
        { x : 150, y : 0, distance : 210 },
        { x : 431, y : 210, distance : 281 },
    ];

    laterationCalculator.laterate(positionObjects, function(error, position) {
        console.log(position);
    });
});