var PlayerPositions = function(x, y , orientation, timestamp, estimoteLocationId, playerId, teamId, gameId) {
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

PlayerPositions.prototype = {
    toString : function() {
        var date = new Date(this.timestamp);
        var day = date.getDate();
        if(day < 10) {
            day = '0' + day;
        }

        return '' + date.getFullYear() + (date.getMonth() + 1) + day + this.playerId;
    }
};

module.exports = PlayerPositions;