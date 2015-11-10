/**
 * Created by kristofcolpaert on 09/11/15.
 */

//Variables
var PiClient = require('./PiClient.js');
var averageCalculcator = require('./averageCalculator.js');
var laterationCalculator = require('./laterationCalculator.js');
var dataParser = require('./dataParser.js');

var servers = [{ port : 1337, address : '192.168.0.193' }];
var positions = [];

//Methods
var client = new PiClient(servers);
client.createPiClient();
client.on('beacon', function(data) {
    var beaconData = data.split(';');
    dataParser.parse(beaconData[0], function(error, beaconObject) {
        var currentBeaconDistance = beaconObject.data.accuracy;
        if(positions.length <= 10) {
            averageCalculcator.calculate(positions, function(error, average) {
                if(error) {
                    positions.push(currentBeaconDistance);
                }

                else {
                    if(average < currentBeaconDistance) {
                        var percentge = 100 - ((average / currentBeaconDistance) * 100);
                        if(percentge < 45) {
                            positions.push(currentBeaconDistance);
                        }
                    }

                    else if (average >= currentBeaconDistance) {
                        var percentage = ((average / currentBeaconDistance) * 100) - 100;
                        if(percentage < 45) {
                            positions.push(currentBeaconDistance);
                        }
                    }
                }
            });
        }

        else {
            averageCalculcator.calculate(positions, function(error, average) {
                if(error) {
                    positions.push(currentBeaconDistance);
                }

                else {
                    if(average < currentBeaconDistance) {
                        var percentge = 100 - ((average / currentBeaconDistance) * 100);
                        if(percentge < 45) {
                            positions.shift();
                            positions.push(currentBeaconDistance);
                        }
                    }

                    else if(average >= currentBeaconDistance) {
                        var percentage = ((average / currentBeaconDistance) *100) - 100;
                        if(percentage < 45) {
                            positions.shift();
                            positions.push(currentBeaconDistance);
                        }
                    }
                }
            });
        }
    });

    //One observation, others are dummy data.
    var positionObjects = [
        { x : 0, y : 0, distance : (positions[positions.length - 1]) },
        { x : 2, y : 0, distance : 0 },
        { x : 1, y : 0, distance : 1 },
        { x : 2, y : 2, distance : 2 },
        { x : 2, y : 1, distance : 1 },
    ]
    laterationCalculator.laterate(positionObjects, function(error, position) {
        console.log(position);
    });
});