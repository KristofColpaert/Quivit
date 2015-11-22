var Game = function(matchDate, teamHome, teamAway) {
    'use strict';

    var self = this;

    this.matchDate = matchDate;
    this.teamHome = teamHome;
    this.teamAway = teamAway;
}

Game.prototype = {
    toString : function() {
        return '' + this.matchDate + this.teamHome + this.teamAway;
    }
}

module.exports = Game;