var errorLoger = (function() {
    'use strict';

    //Variables
    var logPaths = {
        database : '../logs/databaseLog.csv'
    };

    //Methods
    var log = function(file, logMessage) {
        var path = logPaths[file];
        fs.stats(path, function(error, stats) {
            if(!error) {
                fs.appendFile(path, logMessage, function(error) {
                   console.log('Failed to write in error logs.');
                });
            }
        });
    }

    //Return
    return {
        log : log
    };
})();

module.exports = errorLoger;