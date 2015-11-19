var averageCalculator = (function() {
    'use strict';

    //Functions
    var calculate = function(values, callback) {
        if(values.length > 0) {
            var valuesSum = sum(values);
            var valuesAverage = (valuesSum / values.length);
            callback(null, valuesAverage);
        }

        else {
            var error = "Values array contains no elements.";
            callback(error, null);
        }
    };

    var sum = function(values) {
        var sum = 0;
        values.forEach(function(value) {
            sum += value;
        });
        return sum;
    }

    //Return
    return {
        calculate : calculate
    };
})();

module.exports = averageCalculator;