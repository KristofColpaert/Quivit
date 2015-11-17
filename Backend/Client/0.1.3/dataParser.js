/**
 * Created by kristofcolpaert on 10/11/15.
 */

var dataParser = (function() {
    'use strict';

    //Functions
    var parse = function(data, callback) {
        if(data) {
            var dataObject = JSON.parse(data);
            callback(null, dataObject);
        }

        else {
            var error = "No data found.";
            callback(error, null);
        }
    }

    //Return
    return {
        parse : parse
    }
})();

module.exports = dataParser;