var Player = function(firstName, lastName, kitNumber, teamId) {
    'use strict';

    var self = this;

    this.firstName = firstName;
    this.lastName = lastName;
    this.kitNumber = kitNumber;
    this.teamId = teamId;
}

Player.prototype = {
    toString : function() {
        return this.firstName + ' ' + this.lastName;
    }
}

module.exports = Player;