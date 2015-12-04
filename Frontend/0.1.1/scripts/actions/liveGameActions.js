var AppDispatcher = require('../dispatcher/AppDispatcher.js'),,
    ajax = require('../helpers/ajax.js');

var liveGameActions = {

    //Games of today
    getSocketData : function(socket) {
        AppDispatcher.handleServerAction({
            
        });
    }
};

module.exports = liveGameActions;