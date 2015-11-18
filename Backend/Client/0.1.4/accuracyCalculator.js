/**
 * Created by kristofcolpaert on 17/11/15.
 */

var accuracyCalculator = (function() {
    'use strict';

    //Functions
    var calculate = function(rssis, callback) {
        rssis.forEach(function(rssi) {
            var ratio = rssi.armaResult * 1.0 / rssi.measuredPower;
            if(ratio < 1.0) {
                rssi.accuracy = Math.pow(ratio, 10);
            }
            else {
                rssi.accuracy = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
            }
        });
        callback(rssis);
    };

    //Return
    return {
        calculate : calculate
    };
})();

module.exports = accuracyCalculator;