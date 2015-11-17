/**
 * Created by kristofcolpaert on 17/11/15.
 */

var accuracyCalculator = (function() {
    'use strict';

    //Functions
    var calculate = function(rssis, callback) {
        rssis.forEach(function(rssi) {
           rssi.accuracy = Math.pow(12.0, 1.5 * ((rssi.armaResult / rssi.measuredPower) - 1));
        });
        callback(rssis);
    };

    //Return
    return {
        calculate : calculate
    };
})();

module.exports = accuracyCalculator;