var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    teamConstants = require('../helpers/teamConstants.js'),
    constants = require('../helpers/urlConstants.js'),
    ajax = require('../helpers/ajax.js');

var teamActions = {

    //Team by id
    getTeamOfPlayerByIdResponse : function(team, playerId) {
        AppDispatcher.handleServerAction({
            actionType : teamConstants.GET_TEAM_OF_PLAYER_BY_ID_RESPONSE,
            team : team,
            playerId : playerId
        });
    },

    getTeamOfPlayerByIdRequest : function(id, playerId) {
        ajax.getData(constants.baseApiTeamUrl + id, function(error, data) {
           if(!error) {
               teamActions.getTeamOfPlayerByIdResponse(data[0], playerId);
           }
        });
    },

    //All teams
    getTeamsResponse : function(teams){
        AppDispatcher.handleServerAction({
            actionType : teamConstants.GET_TEAMS_RESPONSE,
            teams : teams
        });
    },

    getTeamsRequest : function() {
        ajax.getData(constants.baseApiTeamUrl, function(error, data) {
            if(!error) {
                teamActions.getTeamsResponse(data);
            }
        });
    },

    //Get home team and away team by id
    getTeamHomeAwayByIdResponse : function(teams, gameId) {
        AppDispatcher.handleServerAction({
            actionType : teamConstants.GET_TEAM_HOME_AWAY_RESPONSE,
            teams : teams,
            gameId : gameId
        });
    },

    getTeamHomeAwayByidRequest : function(idHome , idAway, gameId) {
        var teams = [];
        ajax.getData(constants.baseApiTeamUrl + idHome, function(error, dataHome) {
            if(!error) {
                teams['home'] = dataHome[0];
                ajax.getData(constants.baseApiTeamUrl + idAway, function(error, dataAway) {
                    if(!error) {
                        teams['away'] = dataAway[0];
                        teamActions.getTeamHomeAwayByIdResponse(teams, gameId);
                    }
                });
            }
        });
    },

    //New team
    saveTeamResponse : function(team) {
        AppDispatcher.handleServerAction({
            actionType : teamConstants.SAVE_TEAM_RESPONSE,
            team : team
        });
    },

    saveTeamRequest : function(team) {
        team = JSON.stringify(team);
        ajax.saveData(constants.baseApiTeamUrl, team, function(error, data) {
            if(!error) {
                teamActions.saveTeamResponse(data);
            }
        });
    },

    //Set saved to false
    falsifyIsTeamSaved : function() {
        AppDispatcher.handleServerAction({
            actionType : teamConstants.FALSIFY_IS_TEAM_SAVED
        });
    }
};

module.exports = teamActions;