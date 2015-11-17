var accuracyFilter = (function() {
    'use strict';

    //Variables
    var servers;
    var maxDifference;
    var accuracies = [];
    var averageCalculator = require('./averageCalculator.js');

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

        var resultArray = [];
        servers.forEach(function(server) {
            calculateAverage(server.address, accuracies[server.address], function(resultObject){
                resultArray.push(resultObject);
            });
        });
        callback(resultArray);
    };

    var addToAccuracy = function(beaconObject) {
        accuracies[beaconObject.serverIp].push(beaconObject.data.accuracy);
    };

    var deleteFirstFromAccuracy = function(beaconObject) {
        accuracies[beaconObject.serverIp].shift();
    };

    var calculateAverage = function(serverIp, serverAccuracies, callback) {
        throwAwayMinMax(serverAccuracies, function(newServerAccuracties) {
            averageCalculator.calculate(newServerAccuracties, function(error, average) {
                if(!error) {
                    var resultObject = {
                        serverIp : serverIp,
                        accuracy : average
                    };
                    callback(resultObject);
                }
            });
        });
    };

    var throwAwayMinMax = function(serverAccuracies, callback) {
        averageCalculator.calculate(serverAccuracies, function(error, average) {
            serverAccuracies.forEach(function(serverAccuracy) {
               if(average > serverAccuracy) {
                   calculateSmallerPercentage(average, serverAccuracy, function(percentage) {
                       if(percentage >= maxDifference) {
                           var index = serverAccuracies.indexOf(serverAccuracy);
                           serverAccuracies.splice(index, 1);
                       }
                   });
               }
               else {
                   calculateBiggerPercentage(average, serverAccuracy, function(percentage) {
                       if(percentage >= maxDifference) {
                           var index = serverAccuracies.indexOf(serverAccuracy);
                           serverAccuracies.splice(index, 1);
                       }
                   });
               }
            });
        });
        callback(serverAccuracies);
    };

    var calculateBiggerPercentage = function(average, serverAccuracy, callback) {
        var percentage = 100 - ((average / serverAccuracy) * 100);
        callback(percentage);
    };

    var calculateSmallerPercentage = function(average, serverAccuracy, callback) {
        var percentage = ((average / serverAccuracy) * 100) - 100;
        callback(percentage);
    };

    //Return
    return {
        createAccuracyFilter : createAccuracyFilter,
        filterAccuracy : filterAccuracy
    };
})();

module.exports = accuracyFilter;