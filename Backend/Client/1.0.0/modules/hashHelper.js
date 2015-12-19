var hashHelper = (function() {
    'use strict';

    //Variables
    var bcrypt = require('bcrypt');
    var errorLogger = require('./errorLogger.js');

    //Functions
    var hash = function(password, callback) {
        bcrypt.genSalt(10, function(error, salt) {
            if(error) {
                errorLogger.log(error);
                callback(error, null);
            }
            else {
                bcrypt.hash(password, salt, function(error, hash) {
                    if(error) {
                        errorLogger.log(error);
                        callback(error, null);
                    }
                    else {
                        callback(null, hash);
                    }
                })
            }
        });
    };

    var compare = function(password, hash, callback) {
        bcrypt.compare(password, hash, function(error, result) {
            if(error) {
                errorLogger. log(error);
                callback(error, null);
            }
            else {
                callback(null, result);
            }
        });
    };

    //Return
    return {
        hash : hash,
        compare : compare
    };
})();

module.exports = hashHelper;