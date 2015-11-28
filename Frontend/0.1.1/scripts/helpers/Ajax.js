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
        }

        request.onerror = function(e) {
            callback(request.statusText, null);
        }

        request.send(null);
    };

    var saveData = function(url, data, callback) {
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.onLoad = function(e) {
            if(request.readyState === 4) {
                if(request.status === 200) {
                    var resultObject = JSON.parse(request.responseText);
                    callback(null, resultObject);
                }
                else {
                    callback(request.statusText, null);
                }
            }
        }

        request.onerror = function(e) {
            callback(request.statusText, null);
        }

        request.send(data);
    }

    //Return
    return {
        getData : getData,
        saveData : saveData
    };
})();

module.exports = ajax;