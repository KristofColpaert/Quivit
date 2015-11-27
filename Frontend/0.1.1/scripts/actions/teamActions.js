var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    teamConstants = require('../helpers/teamConstants.js'),
    constants = require('../helpers/urlConstants.js'),
    ajax = require('../helpers/ajax.js');

var teamActions = {

    //Team by id
    getTeamByIdResponse : function(team) {
        AppDispatcher.handleServerAction({
            actionType : teamConstants.GET_TEAM_BY_ID_RESPONSE,
            team : team
        });
    },

    getTeamByIdRequest : function(id) {
        ajax.getData(constants.baseApiTeamUrl + id, function(error, data) {
           if(!error) {
               teamActions.getTeamByIdResponse(data);
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
    getTeamHomeAwayByIdResponse : function(teams) {
        AppDispatcher.handleServerAction({
            actionType : teamConstants.GET_TEAM_HOME_AWAY_RESPONSE,
            teams : teams
        });
    },

    getTeamHomeAwayByidRequest : function(idHome , idAway) {
        var teams = [];
        ajax.getData(constants.baseApiTeamUrl + idHome, function(error, dataHome) {
            if(!error) {
                teams.push(dataHome[0]);
                ajax.getData(constants.baseApiTeamUrl + idAway, function(error, dataAway) {
                    if(!error) {
                        teams.push(dataAway[0]);
                        teamActions.getTeamHomeAwayByIdResponse(teams);
                    }
                });
            }
        });
    }
};

module.exports = teamActions;