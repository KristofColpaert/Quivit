var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    playerConstants = require('../helpers/playerConstants.js'),
    constants = require('../helpers/urlConstants.js'),
    ajax = require('../helpers/ajax.js'),
    indexedDb = require('../helpers/indexedDb.js');

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
                playerActions.getPlayerByIdResponse(data[0]);
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

    //Get players by team
    getPlayersByTeamResponse : function(homePlayers, awayPlayers) {
        AppDispatcher.handleServerAction({
            actionType : playerConstants.GET_PLAYERS_BY_TEAM_RESPONSE,
            homePlayers : homePlayers,
            awayPlayers : awayPlayers
        });
    },

    getPlayersByTeamRequest : function(teamHomeId, teamAwayId) {
        ajax.getData(constants.baseApiPlayerUrl + 'team/' + teamHomeId, function(error, homeData) {
            if(!error && homeData) {
                ajax.getData(constants.baseApiPlayerUrl + 'team/' + teamAwayId, function(error, awayData) {
                    if(!error && awayData) {
                        playerActions.getPlayersByTeamResponse(homeData, awayData);
                    }
                });
            }

            else {
                var homePlayers = [];
                var awayPlayers = [];
                indexedDb.get('players', function(data) {
                    data.forEach(function(player) {
                        if(player.teamId === teamHomeId) {
                            homePlayers.push(player);
                        }
                        if(player.teamId === teamAwayId) {
                            awayPlayers.push(player);
                        }
                    });
                    playerActions.getPlayersByTeamResponse(homePlayers, awayPlayers);
                })
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