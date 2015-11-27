var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    EventEmitter = require('events').EventEmitter,
    objectAssign = require('object-assign'),
    gameConstants = require('../helpers/gameConstants.js');

var CHANGE_EVENT = 'change'

//Stored objects
var storedGames = {
    todaysGames : [],
    futureGames : []
};

//GameStore
var gameStore = objectAssign({}, EventEmitter.prototype, {
    emitChange : function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener : function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener : function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getTodaysGames : function() {
        return storedGames.todaysGames;
    },

    getFutureGames : function() {
        return storedGames.futureGames;
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case gameConstants.GET_GAMES_TODAY_RESPONSE:
            storedGames.todaysGames = payload.action.games;
            break;

        case gameConstants.GET_GAMES_FUTURE_RESPONSE:
            storedGames.futureGames = payload.action.games;
            break;
    }

    gameStore.emitChange();

    return true;
});

module.exports = gameStore;