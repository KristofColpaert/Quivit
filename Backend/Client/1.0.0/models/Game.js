var Game = function(gameDate, teamHomeId, teamAwayId, estimoteLocationId, isGameFinished) {
    'use strict';

    var self = this;

    this.gameDate = gameDate;
    this.teamHomeId = teamHomeId;
    this.teamAwayId = teamAwayId;
    this.estimoteLocationId = estimoteLocationId;
    this.isGameFinished = isGameFinished;
}

Game.prototype = {
    toString : function() {
        return this.teamHome + ' - ' + this.teamAway;
    }
}

module.exports = Game;