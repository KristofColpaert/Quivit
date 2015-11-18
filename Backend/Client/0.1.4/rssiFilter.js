var rssiFilter = (function() {
    'use strict';

    //Variables
    var servers;
    var rssis = [];
    var rollingRssi = [];
    var isInitializeds = [];

    //Functions
    var createRssiFilter = function(tempServers) {
        servers = tempServers;

        servers.forEach(function(server) {
            rssis[server.address] = [];
            rollingRssi[server.address] = null;
            isInitializeds[server.address] = false;
        });
    };

    var filterRssi = function(beaconObject, callback) {
        if(rssis[beaconObject.serverIp].length <= 20) {
            addToRssi(beaconObject);
        }

        else {
            deleteFirstFromRssi(beaconObject);
            addToRssi(beaconObject);
        }

        var resultArray = [];
        servers.forEach(function(server) {
            if(rssis[server.address].length > 1){
                console.log(rssis[server.address][rssis[server.address].length - 1]);
                applyArmaRssiFilter(rssis[server.address][rssis[server.address].length - 1], function(armaResult) {
                    var resultObject = {
                        serverIp : rssis[server.address][rssis[server.address].length - 1].serverIp,
                        armaResult : armaResult,
                        measuredPower : rssis[server.address][rssis[server.address].length - 1].data.measuredPower
                    };
                    resultArray.push(resultObject);
                });
            }
            else {
                var error = "Not enough observations.";
                callback(error, null);
            }
        });
        callback(null, resultArray);
    };

    var addToRssi = function(beaconObject) {
        rssis[beaconObject.serverIp].push(beaconObject);
    };

    var deleteFirstFromRssi = function(beaconObject) {
        rssis[beaconObject.serverIp].shift();
    };

    var applyArmaRssiFilter = function(beaconObject, callback) {
        var rollingFilterFactor = 0.1;
        if(!isInitializeds[beaconObject.serverIp]) {
            rollingRssi[beaconObject.serverIp] = beaconObject.data.rssi;
            isInitializeds[beaconObject.serverIp] = true;
        }
        rollingRssi[beaconObject.serverIp] =
            (beaconObject.data.rssi * rollingFilterFactor) + (rollingRssi[beaconObject.serverIp] * (1.0 - rollingFilterFactor));
        callback(rollingRssi[beaconObject.serverIp]);
    };

    //Return
    return {
        createRssiFilter : createRssiFilter,
        filterRssi : filterRssi
    };
})();

module.exports = rssiFilter;