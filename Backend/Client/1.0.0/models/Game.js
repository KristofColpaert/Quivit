var Game = function(gameDate, gameTime, teamHomeId, teamAwayId, estimoteLocationId, isGameFinished, scoreHome, scoreAway, image) {
    'use strict';

    var self = this;

    this.gameDate = gameDate;
    this.gameTime = gameTime;
    this.teamHomeId = teamHomeId;
    this.teamAwayId = teamAwayId;
    this.estimoteLocationId = estimoteLocationId;
    this.isGameFinished = isGameFinished;
    this.scoreHome = scoreHome;
    this.scoreAway = scoreAway;
    this.image = image;
}

Game.prototype = {
    toString : function() {
        return this.teamHome + ' - ' + this.teamAway;
    },

    toJSON : function() {
        return {
            gameDate : this.gameDate,
            gameTime : this.gameTime,
            teamHomeId : this.teamHomeId,
            teamAwayId : this.teamAwayId,
            estimoteLocationId : this.estimoteLocationId,
            isGameFinished : this.isGameFinished,
            scoreHome : this.scoreHome,
            scoreAway : this.scoreAway,
            image : this.image
        };
    }
}

module.exports = Game;