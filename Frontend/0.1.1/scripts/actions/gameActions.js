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

    //Set saved to false
    falsifyIsGameSaved : function() {
        AppDispatcher.handleServerAction({
            actionType : gameConstants.FALSIFY_IS_GAME_SAVED,
        });
    }
};

module.exports = gameActions;