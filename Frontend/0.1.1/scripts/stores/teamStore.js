var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    EventEmitter = require('events').EventEmitter,
    objectAssign = require('object-assign'),
    teamConstants = require('../helpers/teamConstants.js');

var CHANGE_EVENT = 'change';

//Stored objects
var storedTeams = {
    isTeamSaved : false,
    allTeams : [],
    singleTeam : [],
    homeAwayTeams : {}
};

//TeamStore
var teamStore = objectAssign({}, EventEmitter.prototype, {
    emitChange : function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener : function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener : function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getAllTeams : function() {
        console.log(storedTeams);
        return storedTeams.allTeams;
    },

    getSingleTeam : function(playerId) {
        return storedTeams.singleTeam[playerId];
    },

    getHomeAwayTeams : function() {
      return storedTeams.homeAwayTeams;
    },

    isTeamSaved : function() {
        return storedTeams.isTeamSaved;
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case teamConstants.GET_TEAM_OF_PLAYER_BY_ID_RESPONSE:
            var playerId = payload.action.playerId;
            storedTeams.singleTeam[playerId] = payload.action.team;
            break;

        case teamConstants.GET_TEAMS_RESPONSE:
            storedTeams.allTeams = payload.action.teams;
            break;

        case teamConstants.GET_TEAM_HOME_AWAY_RESPONSE:
            storedTeams.homeAwayTeams[payload.action.gameId] = payload.action.teams;
            break;

        case teamConstants.SAVE_TEAM_RESPONSE:
            var newTeam = payload.action.team;
            storedTeams.allTeams.push(newTeam);
            storedTeams.isTeamSaved = true;
            break;

        case teamConstants.FALSIFY_IS_TEAM_SAVED:
            storedTeams.isTeamSaved = false;
            break;
    }

    teamStore.emitChange();

    return true;
});

module.exports = teamStore;