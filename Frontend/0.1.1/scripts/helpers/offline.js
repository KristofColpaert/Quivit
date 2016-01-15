var offline = (function() {
    'use strict';

    var isUserOffline = function() {
        return !navigator.onLine;
    };

    var isUserOnline = function() {
        return !navigator.onLive
    };

    return {
        isUserOffline : isUserOffline,
        isUserOnline : isUserOnline
    };
})();

module.exports = offline;