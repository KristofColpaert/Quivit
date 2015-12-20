var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    gameConstants = require('../helpers/gameConstants.js'),
    constants = require('../helpers/urlConstants.js'),
    ajax = require('../helpers/ajax.js');

var gameActions = {

    //Games of today
    getTodaysGamesResponse : function(games) {
        AppDispatcher.handleServerAction({
            actionType : gameConstants.GET_GAMES_TODAY_RESPONSE,
            games : games
        });
    },

    getTodayGamesRequest : function() {
        ajax.getData(constants.baseApiGameTodayUrl, function(error, data) {
            if(!error) {
                gameActions.getTodaysGamesResponse(data);
            }
        });
    },

    //Future games
    getFutureGamesResponse : function(games) {
        AppDispatcher.handleServerAction({
            actionType : gameConstants.GET_GAMES_FUTURE_RESPONSE,
            games : games
        });
    },

    getFutureGamesRequest : function() {
        ajax.getData(constants.baseApiGameUrl, function(error, data) {
           if(!error) {
               gameActions.getFutureGamesResponse(data);
           }
        });
    },

    //New game
    saveGameResponse : function(game) {
        AppDispatcher.handleServerAction({
            actionType : gameConstants.SAVE_GAME_RESPONSE,
            game : game
        });
    },

    saveGameRequest : function(game) {
        game = JSON.stringify(game);
        ajax.saveData(constants.baseApiGameUrl, game, function(error, data) {
            if(!error) {
                gameActions.saveGameResponse(data);
            }
        });
    },

    //Get single game
    getGameResponse : function(game) {
        AppDispatcher.handleServerAction({
            actionType : gameConstants.GET_GAME_RESPONSE,
            game : game
        });
    },

    getGameRequest : function(id) {
        ajax.getData(constants.baseApiGameUrl + id, function(error, data) {
            if(!error) {
                gameActions.getGameResponse(data[0]);
            }
        });
    },

    //Get past games
    getPastGamesResponse : function(games) {
        AppDispatcher.handleServerAction({
            actionType : gameConstants.GET_GAMES_PAST_RESPONSE,
            games : games
        });
    },

    getPastGamesRequest : function() {
        ajax.getData(constants.baseApiGamePastUrl, function(error, data) {
            if(!error) {
                gameActions.getPastGamesResponse(data);
            }
        });
    },

    //Get heat map of player in game
    getPlayerGameHeatMapResponse : function(heatMap) {
        AppDispatcher.handleServerAction({
            actionType : gameConstants.GET_PLAYER_GAME_HEAT_MAP_RESPONSE,
            heatMap : heatMap
        });
    },

    getPlayerGameHeatMapRequest : function(gameId, playerId) {
        ajax.getData(constants.baseApiGameUrl + gameId + '/' + playerId, function(error, data) {
            if(!error) {
                gameActions.getPlayerGameHeatMapResponse(data);
            }
        });
    },

    //Upload image
    uploadImageResponse : function(url) {
        AppDispatcher.handleServerAction({
            actionType : gameConstants.UPLOAD_FILE_RESPONSE,
            url : url
        })
    },

    uploadImageRequest : function(formData) {
        ajax.uploadFile('http://localhost:3000/upload', formData, function(error, data) {
            if(!error) {
                gameActions.uploadImageResponse(data);
            }
        });
    },

    //Set saved to false
    falsifyIsGameSaved : function() {
        AppDispatcher.handleServerAction({
            actionType : gameConstants.FALSIFY_IS_GAME_SAVED,
        });
    }
};

module.exports = gameActions;