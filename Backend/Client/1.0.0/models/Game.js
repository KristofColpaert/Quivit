var Game = function(gameDate, teamHomeId, teamAwayId, estimoteLocationId) {
    'use strict';

    var self = this;

    this.gameDate = gameDate;
    this.teamHomeId = teamHomeId;
    this.teamAwayId = teamAwayId;
    this.estimoteLocationId = estimoteLocationId;
}

Game.prototype = {
    toString : function() {
        return this.teamHome + ' - ' + this.teamAway;
    }
}

module.exports = Game;