var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    EventEmitter = require('events').EventEmitter,
    objectAssign = require('object-assign'),
    teamConstants = require('../helpers/teamConstants.js');

var CHANGE_EVENT = 'change';

//Stored objects
var storedTeams = {
    allTeams : [],
    singleTeam : {},
    homeAwayTeams : []
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
        return storedTeams.allTeams;
    },

    getSingleTeam : function() {
        return storedTeams.singleTeam;
    },

    getHomeAwayTeams : function() {
      return storedTeams.homeAwayTeams
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case teamConstants.GET_TEAM_BY_ID_RESPONSE:
            storedTeams.singleTeam = payload.action.team;
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
    }

    teamStore.emitChange();

    return true;
});

module.exports = teamStore;