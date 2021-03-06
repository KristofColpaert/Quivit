var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    EventEmitter = require('events').EventEmitter,
    objectAssign = require('object-assign'),
    gameConstants = require('../helpers/gameConstants.js');

var CHANGE_EVENT = 'change'

//Stored objects
var storedGames = {
    isGameSaved : false,
    todaysGames : [],
    futureGames : [],
    pastGames : [],
    playerGameHeatMap : [],
    singleGame : {},
    imageUrl : null
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
        storedGames.playerGameHeatMap = [];
    },

    getTodaysGames : function() {
        return storedGames.todaysGames;
    },

    getFutureGames : function() {
        return storedGames.futureGames;
    },

    getSingleGame : function() {
        return storedGames.singleGame;
    },

    getPastGames : function() {
        return storedGames.pastGames;
    },

    getPlayerGameHeatMap : function() {
        return storedGames.playerGameHeatMap;
    },

    getImageUrl : function() {
        return storedGames.imageUrl;
    },

    isImageUrlSet : function() {
        if(storedGames.imageUrl === null) {
            return false;
        }
        else {
            return true;
        }
    },

    isGameSaved : function() {
        return storedGames.isGameSaved;
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

        case gameConstants.SAVE_GAME_RESPONSE:
            var newGame = payload.action.game;
            var currentDate = new Date();
            var gameDate = '' + currentDate.getFullYear() + (currentDate.getMonth + 1) + currentDate.getDate();
            if(newGame.gameDate === gameDate) {
                storedGames.todaysGames.push(newGame);
            }

            else {
                storedGames.futureGames.push(newGame);
            }

            storedGames.isGameSaved = true;
            break;

        case gameConstants.GET_GAME_RESPONSE:
            storedGames.singleGame = payload.action.game;
            break;

        case gameConstants.GET_GAMES_PAST_RESPONSE:
            storedGames.pastGames = payload.action.games;
            break;

        case gameConstants.GET_PLAYER_GAME_HEAT_MAP_RESPONSE:
            storedGames.playerGameHeatMap = payload.action.heatMap;
            break;

        case gameConstants.FALSIFY_IS_GAME_SAVED:
            storedGames.isGameSaved = false;
            break;

        case gameConstants.UPLOAD_FILE_RESPONSE:
            storedGames.imageUrl = payload.action.url.url;
            break;
    }

    gameStore.emitChange();

    return true;
});

module.exports = gameStore;