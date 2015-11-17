/**
 * Created by kristofcolpaert on 09/11/15.
 */

/*
** Variables
 */
var PiClient = require('./PiClient.js');
var MongoDbClient = require('./MongoDbClient.js');
var rssiFilter = require('./rssiFilter.js');
var laterationCalculator = require('./laterationCalculator.js');
var accuracyCalculator = require('./accuracyCalculator.js');
var dataParser = require('./dataParser.js');

var servers = [
    { port : 1337, address : '192.168.0.101' },
    { port : 1337, address : '192.168.0.200' },
    { port : 1337, address : '192.168.0.102' },
    { port : 1337, address : '192.168.0.103' }
];
var dbUrl = 'mongodb://quivitUser:Test123@quivitdb.cloudapp.net/quivitserver';

/*
** Methods
 */

//Create an rssiFilter.
rssiFilter.createRssiFilter(servers);

//Create web clients and database clients.
var dbClient = new MongoDbClient(dbUrl);
var webClient = new PiClient(servers);

//Database client init and listeners.
dbClient.createMongoDbClient();

dbClient.on('error', function(error) {
   console.log(error);
});

dbClient.on('result', function(result) {
    console.log(result.result);
});

//Web client init and listeners.
webClient.createPiClient();

webClient.on('beacon', function(data) {
    var beaconData = data.split(';');
    dataParser.parse(beaconData[0], function(error, beaconObject) {
        rssiFilter.filterRssi(beaconObject, function(error, resultArray) {
            if(!error) {
                accuracyCalculator.calculate(resultArray, function(accuracies) {
                    //Two observations, others are dummy data.
                    if(accuracies.length == 4) {
                        console.log(accuracies);
                        var positionObjects = [
                            { x : 0, y : 0, distance : ((accuracies[0].accuracy * 100)) },
                            { x : 280, y : 0, distance : ((accuracies[1].accuracy * 100)) },
                            { x : 415, y : 250, distance : ((accuracies[2].accuracy * 100)) },
                            { x : 310, y : 85, distance : ((accuracies[3].accuracy * 100)) }
                        ];

                        laterationCalculator.laterate(positionObjects, function(error, position) {
                            if(position != null) {
                                position.timestamp = new Date().getTime();
                                console.log(position);
                                //dbClient.insertData('test', position);
                            }
                        });
                    }
                });
            }
        });
    });
});