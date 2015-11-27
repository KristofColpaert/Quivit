var ajax = (function() {
    'use strict';

    //Functions
    var getData = function(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = function(e) {
            if(request.readyState === 4) {
                if(request.status === 200) {
                    var resultObject = JSON.parse(request.responseText);
                    callback(null, resultObject);
                }
                else {
                    callback(request.statusText, null);
                }
            }
        }.bind(this);

        request.onerror = function(e) {
            callback(request.statusText, null);
        }

        request.send(null);
    };

    //Return
    return {
        getData : getData
    };
})();

module.exports = ajax;