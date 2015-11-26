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
    }
};

module.exports = PlayerPosition;