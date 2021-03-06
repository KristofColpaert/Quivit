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