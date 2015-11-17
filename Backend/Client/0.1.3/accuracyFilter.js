var accuracyFilter = (function() {
    'use strict';

    //Variables
    var averageCalculator = require('./averageCalculator.js');
    var servers;
    var maxDifference;
    var accuracies = [];

    //Functions
    var createAccuracyFilter = function(tempServers, tempMaxDifference) {
        servers = tempServers;
        maxDifference = tempMaxDifference;

        servers.forEach(function(server) {
            accuracies[server.address] = [];
        });
    };

    var filterAccuracy = function(beaconObject, callback) {
        if(accuracies[beaconObject.serverIp].length <= 20) {
            addToAccuracy(beaconObject);
        }

        else {
            deleteFirstFromAccuracy(beaconObject);
            addToAccuracy(beaconObject);
        }
        if(accuracies[beaconObject.serverIp].length > 4)
        {
            var tempAccuracies = [];
            servers.forEach(function(server) {
                tempAccuracies[server.address] = accuracies[server.address].slice();
            });
            deleteMin(tempAccuracies, function(minTempAccuracies) {
                deleteMax(minTempAccuracies, function(maxTempAccuracies) {
                    makeResultArray(maxTempAccuracies, function(resultArray) {
                        callback(resultArray);
                    });
                });
            });
        }
    };

    var addToAccuracy = function(beaconObject) {
        accuracies[beaconObject.serverIp].push(beaconObject.data.accuracy);
    };

    var deleteFirstFromAccuracy = function(beaconObject) {
        accuracies[beaconObject.serverIp].shift();
    };

    var deleteMin = function(tempAccuracies, callback) {
        servers.forEach(function(server) {
            var firstMin = 200000000;
            var secondMin = 199999999;
            tempAccuracies[server.address].forEach(function(accuracy) {
                if(accuracy < firstMin) {
                    secondMin = firstMin;
                    firstMin = accuracy;
                }

                else if(accuracy < secondMin) {
                    secondMin = accuracy;
                }
            });
            var index1 = tempAccuracies[server.address].indexOf(firstMin);
            var index2 = tempAccuracies[server.address].indexOf(secondMin);

            tempAccuracies[server.address].splice(index1, 1);
            tempAccuracies[server.address].splice(index2, 1);
        });
        callback(tempAccuracies);
    };

    var deleteMax = function(tempAccuracies, callback) {
        servers.forEach(function(server) {
            var firstMax = -200000000;
            var secondMax = -199999999;
            tempAccuracies[server.address].forEach(function(accuracy) {
                if(accuracy > firstMax) {
                    secondMax = firstMax;
                    firstMax = accuracy;
                }

                else if(accuracy > secondMax) {
                    secondMax = accuracy;
                }
            });
            var index1 = tempAccuracies[server.address].indexOf(firstMax);
            var index2 = tempAccuracies[server.address].indexOf(secondMax);

            tempAccuracies[server.address].splice(index1, 1);
            tempAccuracies[server.address].splice(index2, 1);
        });
        callback(tempAccuracies);
    };

    var makeResultArray = function(tempAccuracies, callback) {
        var resultArray = [];
        servers.forEach(function(server) {
            averageCalculator.calculate(tempAccuracies[server.address], function(error, average) {
               if(!error) {
                   var resultObject = {
                       serverIp : server.address,
                       accuracy : average
                   };
                   resultArray.push(resultObject);
               }
            });
        });
        callback(resultArray);
    };

    //Return
    return {
        createAccuracyFilter : createAccuracyFilter,
        filterAccuracy : filterAccuracy
    };
})();

module.exports = accuracyFilter;