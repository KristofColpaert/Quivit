var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    offlineConstants = require('../helpers/offlineConstants.js'),
    constants = require('../helpers/urlConstants.js'),
    ajax = require('../helpers/ajax.js'),
    indexedDb = require('../helpers/indexedDb.js');

indexedDb.initialize();

var offlineActions = {
    //Get positions of player in a game
    offlineSavePlayerPositionsResponse : function(gameId, playerId, playerPositions) {
        var data = { _id : gameId + playerId, playerPositions : playerPositions };
        indexedDb.add('playerPositions', data, function(success) {
            AppDispatcher.handleServerAction({
                actionType : offlineConstants.OFFLINE_SAVE_PLAYER_POSITIONS_RESPONSE,
                playerPositions : playerPositions
            });
        });
    },

    offlineSavePlayerPositionsRequest : function(gameId, playerId) {
        offlineActions.offlineSavePlayerPositions(gameId, playerId, function(data) {
            offlineActions.offlineSavePlayerPositionsResponse(gameId, playerId, data);
        });
    },

    offlineSavePlayerPositions : function(gameId, playerId, callback) {
        var page = 0;
        var playerPositions = [];
        var getNextPage = function() {
            var url = constants.baseApiPlayerPositionUrl + gameId + '/' + playerId + '/' + page;
            ajax.getData(url, function(error, data) {
                if(!error) {
                    playerPositions = playerPositions.concat(data);
                    if(data.length === 500) {
                        page++;
                        getNextPage();
                    }
                    else {
                        callback(playerPositions);
                    }
                }
            });
        }
        getNextPage();
    },

    //Get a game and save it local
    offlineSaveGameResponse : function(game) {
        indexedDb.add('games', game, function(success) {
            AppDispatcher.handleServerAction({
                actionType : offlineConstants.OFFLINE_SAVE_GAME_RESPONSE,
                game : game
            });
        });
    },

    offlineSaveGameRequest : function(gameId) {
        ajax.getData(constants.baseApiGameUrl + gameId, function (error, result) {
            if (!error) {
                offlineActions.offlineSaveGameResponse(result[0]);
            }
        })
    },

    //Get teams and save them local
    offlineSaveTeamResponse : function(team) {
        indexedDb.add('teams', team, function(success) {
            AppDispatcher.handleServerAction({
                actionType : offlineConstants.OFFLINE_SAVE_TEAM_RESPONSE,
                team : team
            });
        });
    },

    offlineSaveTeamRequest : function(teamId) {
        ajax.getData(constants.baseApiTeamUrl + teamId, function (error, result) {
            if(!error) {
                offlineActions.offlineSaveTeamResponse(result[0]);
            }
        });
    },

    //Get estimoteLocations and save them local
    offlineSaveEstimoteLocationResponse : function(estimoteLocation) {
        indexedDb.add('estimoteLocations', estimoteLocation, function(success) {
            AppDispatcher.handleServerAction({
                actionType : offlineConstants.OFFLINE_SAVE_ESTIMOTE_LOCATION_RESPONSE,
                estimoteLocation : estimoteLocation
            });
        });
    },

    offlineSaveEstimoteLocationRequest : function(estimoteLocationId) {
        ajax.getData(constants.baseApiEstimoteLocationUrl + 'id/' + estimoteLocationId, function(error, result) {
            if(!error) {
                offlineActions.offlineSaveEstimoteLocationResponse(result[0]);
            }
        });
    }
};

module.exports = offlineActions;