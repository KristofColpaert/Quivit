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
    },

    toJSON : function() {
        return {
            firstName : this.firstName,
            lastName : this.lastName,
            kitNumber : this.kitNumber,
            teamId : this.teamId
        }
    }
}

module.exports = Player;