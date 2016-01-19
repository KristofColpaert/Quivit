var offlineHelper = (function() {
    var isOnline = function(callback) {
        if(window.navigator.onLine) {
            callback(true);
        }
        else {
            callback(false);
        }
    };

    //Return
    return {
        isOnline : isOnline
    };
})();

module.exports = offlineHelper;