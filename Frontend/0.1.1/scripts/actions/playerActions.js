var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    playerConstants = require('../helpers/playerConstants.js'),
    constants = require('../helpers/urlConstants.js'),
    ajax = require('../helpers/ajax.js');

var playerActions = {

    //All players
    getPlayersResponse : function(players) {
        AppDispatcher.handleServerAction({
            actionType : playerConstants.GET_PLAYERS_RESPONSE,
            players : players
        });
    },

    getPlayersRequest : function() {
        ajax.getData(constants.baseApiPlayerUrl, function(error, data) {
            if(!error) {
                playerActions.getPlayersResponse(data);
            }
        });
    },

    //Player by id
    getPlayerByIdResponse : function(player) {
        AppDispatcher.handleServerAction({
            actionType : playerConstants.GET_PLAYER_RESPONSE,
            player : player
        });
    },

    getPlayerByIdRequest : function(id) {
        ajax.getData(constants.baseApiPlayerUrl + 'id/' + id, function(error, data) {
            if(!error) {
                playerActions.getPlayerByIdResponse(data);
            }
        });
    },

    //Save player
    savePlayerResponse : function(player) {
        AppDispatcher.handleServerAction({
            actionType : playerConstants.SAVE_PLAYER_RESPONSE,
            player : player
        });
    },

    savePlayerRequest : function(player) {
        player = JSON.stringify(player);
        ajax.saveData(constants.baseApiPlayerUrl, player, function(error, data) {
            if(!error) {
                playerActions.savePlayerResponse(data);
            }
        });
    },

    //Set saved to false
    falsifyIsPlayerSaved : function() {
        AppDispatcher.handleServerAction({
            actionType : playerConstants.FALSIFY_IS_PLAYER_SAVED
        });
    }
};

module.exports = playerActions;