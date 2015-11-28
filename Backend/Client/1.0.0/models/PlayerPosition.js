var PlayerPosition = function(x, y , orientation, timestamp, estimoteLocationId, playerId, teamId, gameId) {
    'use strict';

    var self = this;

    this.x = x;
    this.y = y;
    this.orientation = orientation;
    this.timestamp = timestamp;
    this.estimoteLocationId = estimoteLocationId;
    this.playerId = playerId;
    this.teamId = teamId;
    this.gameId = gameId;
}

PlayerPosition.prototype = {
    toString : function() {
        return '' + this.gameId + this.playerId;
    },

    toJSON : function() {
        return {
            x : this.x,
            y : this.y,
            orientation : this.orientation,
            timestamp : this.timestamp,
            estimoteLocationId : this.estimoteLocationId,
            playerId : this.playerId,
            teamId : this.teamId,
            gameId : this.gameId
        };
    }
};

module.exports = PlayerPosition;