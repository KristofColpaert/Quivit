var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    EventEmitter = require('events').EventEmitter,
    objectAssign = require('object-assign'),
    playerConstants = require('../helpers/playerConstants.js');

var CHANGE_EVENT = 'change';

//Stored objects
var storedPlayers = {
    isPlayerSaved : false,
    allPlayers : [],
    singlePlayer : []
};

//PlayerStore
var playerStore = objectAssign({}, EventEmitter.prototype, {
    emitChange : function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener : function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener : function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getAllPlayers : function() {
        return storedPlayers.allPlayers;
    },

    getSinglePlayer : function() {
        return storedPlayers.singlePlayer;
    },

    isPlayerSaved : function() {
        return storedPlayers.isPlayerSaved;
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case playerConstants.GET_PLAYERS_RESPONSE:
            storedPlayers.allPlayers = payload.action.players;
            break;

        case playerConstants.GET_PLAYER_RESPONSE:
            storedPlayers.singlePlayer = payload.action.player;
            break;

        case playerConstants.SAVE_PLAYER_RESPONSE:
            var newPlayer = payload.action.player;
            storedPlayers.allPlayers.push(newPlayer);
            storedPlayers.isPlayerSaved = true;
            break;

        case playerConstants.FALSIFY_IS_PLAYER_SAVED:
            storedPlayers.isPlayerSaved = false;
            break;
    }

    playerStore.emitChange();

    return true;
});

module.exports = playerStore;