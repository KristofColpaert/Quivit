var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    EventEmitter = require('events').EventEmitter,
    objectAssign = require('object-assign'),
    offlineConstants = require('../helpers/offlineConstants.js');

var CHANGE_EVENT = 'change';

//Stored objects
var storeOfflineObjects = {
    playerPositionsSavedCount : 0,
    teamsSavedCount : 0,
    playersSavedCount : 0,
    isGameSaved : false,
    isEstimoteLocationSaved : false,
    playerPositions : {}
};

var offlineStore = objectAssign({}, EventEmitter.prototype, {
    emitChange : function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener : function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener : function(callback) {
        storeOfflineObjects.playerPositions = {};
        storeOfflineObjects.isEstimoteLocationSaved = false;
        storeOfflineObjects.isGameSaved = false;
        storeOfflineObjects.playerPositionsSavedCount = 0;
        storeOfflineObjects.playersSavedCount = 0;
        storeOfflineObjects.teamsSavedCount = 0;
        this.removeListener(CHANGE_EVENT, callback);
    },

    getPlayerPositionsSavedCount : function() {
        return storeOfflineObjects.playerPositionsSavedCount;
    },

    getTeamsSavedCount : function() {
        return storeOfflineObjects.teamsSavedCount;
    },

    getPlayersSavedCount : function() {
        return storeOfflineObjects.playersSavedCount;
    },

    getIsGameSaved : function() {
        return storeOfflineObjects.isGameSaved;
    },

    getIsEstimoteLocationSaved : function() {
        return storeOfflineObjects.isEstimoteLocationSaved;
    },

    getPlayerPositions : function() {
        return storeOfflineObjects.playerPositions;
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case offlineConstants.OFFLINE_GET_PLAYER_POSITIONS_RESPONSE:
            var playerPositionObject = payload.action.playerPositions;
            storeOfflineObjects.playerPositions[playerPositionObject._id] = playerPositionObject.playerPositions;
            break;

        case offlineConstants.OFFLINE_SAVE_PLAYER_POSITIONS_RESPONSE:
            storeOfflineObjects.playerPositionsSavedCount++;
            break;

        case offlineConstants.OFFLINE_SAVE_GAME_RESPONSE:
            storeOfflineObjects.isGameSaved = true;
            break;

        case offlineConstants.OFFLINE_SAVE_PLAYER_RESPONSE:
            storeOfflineObjects.playersSavedCount++;
            break;

        case offlineConstants.OFFLINE_SAVE_TEAM_RESPONSE:
            storeOfflineObjects.teamsSavedCount++;
            break;

        case offlineConstants.OFFLINE_SAVE_ESTIMOTE_LOCATION_RESPONSE:
            storeOfflineObjects.isEstimoteLocationSaved = true;
            break;
    }

    offlineStore.emitChange();

    return true;
});

module.exports = offlineStore;