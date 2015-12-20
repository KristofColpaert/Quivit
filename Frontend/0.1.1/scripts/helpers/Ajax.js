var ajax = (function() {
    'use strict';

    //Variables
    var token = window.localStorage.getItem('token');

    //Functions
    var getData = function(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.setRequestHeader('x-auth', token);
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
        request.setRequestHeader('x-auth', token);
        request.onreadystatechange = function(e) {
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
    };

    var uploadFile = function(url, data, callback) {
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('x-auth', token);
        request.onreadystatechange = function(e) {
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
    };

    //Return
    return {
        getData : getData,
        saveData : saveData,
        uploadFile : uploadFile
    };
})();

module.exports = ajax;