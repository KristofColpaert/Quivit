var errorLogger = (function() {
    'use strict';

    //Variables
    var winston = require('winston');
    winston.add(winston.transports.File, { filename: 'logs/errorLog.log'});

    //Function
    var log = function(message) {
        winston.log('info', message);
    };

    //Return
    return {
        log : log
    };
})();

module.exports = errorLogger;