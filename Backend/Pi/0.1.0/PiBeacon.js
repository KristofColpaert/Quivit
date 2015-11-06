/**
 * Created by kristofcolpaert on 06/11/15.
 */

/**
 * This module creates a beacon scanner.
 * @type {{createPiBeacon}}
 */
var PiBeacon = (function() {
    //Variables
    var bleacon = require('bleacon');

    //Functions
    var createPiBeacon = function(callback) {
        startPiBeaconScanning(function(error, result) {
            if(error) {
                callback(error, null);
            }

            else {
                bleacon.on('discover', function(bleacon) {
                    callback(null, bleacon);
                });
            }
        });
    }

    var startPiBeaconScanning = function(callback) {
        try {
            bleacon.startScanning();
            callback(null, true);
        }

        catch(exception) {
            var error = "Oops! Something went wrong while scanning for beacons.";
            callback(error, null);
        }
    }

    //Return
    return {
        createPiBeacon : createPiBeacon
    };
})();

module.exports = PiBeacon;