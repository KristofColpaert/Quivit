var Game = function(gameDate, teamHomeId, teamAwayId, estimoteLocationId, isGameFinished, scoreHome, scoreAway) {
    'use strict';

    var self = this;

    this.gameDate = gameDate;
    this.teamHomeId = teamHomeId;
    this.teamAwayId = teamAwayId;
    this.estimoteLocationId = estimoteLocationId;
    this.isGameFinished = isGameFinished;
    this.scoreHome = scoreHome;
    this.scoreAway = scoreAway;
}

Game.prototype = {
    toString : function() {
        return this.teamHome + ' - ' + this.teamAway;
    }
}

module.exports = Game;