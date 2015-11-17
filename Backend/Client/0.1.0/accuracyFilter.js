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
        if(accuracies[beaconObject.serverIp].length <= 2) {
            averageCalculator.calculate(accuracies[beaconObject.serverIp], function(error, average) {
                if(error) {
                    addToAccuracy(beaconObject);
                }

                else {
                    if(average < beaconObject.data.accuracy) {
                        calculateBiggerPercentage(average, beaconObject, function(percentage) {
                            if(percentage < maxDifference) {
                                addToAccuracy(beaconObject);
                            }
                        });
                    }

                    else if(average >= beaconObject.data.accuracy) {
                        calculateSmallerPercentage(average, beaconObject, function(percentage) {
                           if(percentage < maxDifference) {
                               addToAccuracy(beaconObject);
                           }
                        });
                    }
                }
            });
        }

        else {
            averageCalculator.calculate(accuracies[beaconObject.serverIp], function(error, average) {
                if(error) {
                    addToAccuracy(beaconObject);
                }

                else {
                    if(average < beaconObject.data.accuracy) {
                        calculateBiggerPercentage(average, beaconObject, function(percentage) {
                            if(percentage < maxDifference) {
                                deleteFirstFromAccuracy(beaconObject);
                                addToAccuracy(beaconObject);
                            }
                        });
                    }

                    else if(average >= beaconObject.data.accuracy) {
                        calculateSmallerPercentage(average, beaconObject, function(percentage) {
                            if(percentage < maxDifference) {
                                deleteFirstFromAccuracy(beaconObject);
                                addToAccuracy(beaconObject);
                            }
                        });
                    }
                }
            })
        }

        callback(makeResultArray());
    };

    var addToAccuracy = function(beaconObject) {
        accuracies[beaconObject.serverIp].push(beaconObject.data.accuracy);
    };

    var deleteFirstFromAccuracy = function(beaconObject) {
        accuracies[beaconObject.serverIp].shift();
    };

    var calculateBiggerPercentage = function(average, beaconObject, callback) {
        var percentage = 100 - ((average / beaconObject.data.accuracy) * 100);
        callback(percentage);
    };

    var calculateSmallerPercentage = function(average, beaconObject, callback) {
        var percentage = ((average / beaconObject.data.accuracy) * 100) - 100;
    };

    var makeResultArray = function() {
        var resultArray = [];
        servers.forEach(function(server) {
            var resultObject = {
                serverIp : server.address,
                accuracy : accuracies[server.address][accuracies[server.address].length - 1]
            };
            resultArray.push(resultObject);
        });
        return resultArray;
    };

    //Return
    return {
        createAccuracyFilter : createAccuracyFilter,
        filterAccuracy : filterAccuracy
    };
})();

module.exports = accuracyFilter;