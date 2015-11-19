var accuracyFilter = (function() {
    'use strict';

    //Variables
    var averageCalculator = require('./averageCalculator.js');
    var servers;
    var maxDifference;
    var accuracies = [];
    var previousAverages = [];

    //Functions
    var createAccuracyFilter = function(tempServers, tempMaxDifference) {
        servers = tempServers;
        maxDifference = tempMaxDifference;

        servers.forEach(function(server) {
            accuracies[server.address] = [];
            previousAverages[server.address] = null;
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

        callback(makeResultArray());
    };

    var addToAccuracy = function(beaconObject) {
        accuracies[beaconObject.serverIp].push(beaconObject.data.accuracy);
    };

    var deleteFirstFromAccuracy = function(beaconObject) {
        accuracies[beaconObject.serverIp].shift();
    };

    var makeResultArray = function() {
        var resultArray = [];
        servers.forEach(function(server) {
            averageCalculator.calculate(accuracies[server.address], function(error, average) {
                if(!error) {
                    if(previousAverages[server.address] == null) {
                        previousAverages[server.address] = average;
                        console.log("hier");
                    }

                    else if(previousAverages[server.address] <= average) {
                        calculateBiggerPercentage(previousAverages[server.address], average, function(percentage) {
                            if(percentage < maxDifference) {
                                var resultObject = {
                                    serverIp : server.address,
                                    accuracy : average
                                };
                                resultArray.push(resultObject);
                            }

                            else {
                                var resultObject = {
                                    serverIp : server.address,
                                    accuracy : previousAverages[server.address]
                                };
                                resultArray.push(resultObject);
                            }
                        });
                    }

                    else if(previousAverages[server.address] > average) {
                        calculateSmallerPercentage(previousAverages[server.address], average, function(percentage) {
                            if(percentage < maxDifference) {
                                var resultObject = {
                                    serverIp : server.address,
                                    accuracy : average
                                };
                                resultArray.push(resultObject);
                            }

                            else {
                                var resultObject = {
                                    serverIp : server.address,
                                    accuracy : previousAverages[server.address]
                                };
                                resultArray.push(resultObject);
                            }
                        });
                    }
                }
            });
        });
        return resultArray;
    };

    var calculateBiggerPercentage = function(previousAverage, average, callback) {
        var percentage = 100 - ((previousAverage / average) * 100);
        callback(percentage);
    };

    var calculateSmallerPercentage = function(previousAverage, average, callback) {
        var percentage = ((previousAverage / average) * 100) - 100;
        callback(percentage);
    };

    //Return
    return {
        createAccuracyFilter : createAccuracyFilter,
        filterAccuracy : filterAccuracy
    };
})();

module.exports = accuracyFilter;