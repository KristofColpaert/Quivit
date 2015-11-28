var Team = function(name, primaryColor, secondaryColor) {
    'use strict';

    var self = this;

    this.name = name;
    this.primaryColor = primaryColor;
    this.secondaryColor = secondaryColor;
}

Team.prototype = {
    toString : function() {
        return this.name;
    },

    toJSON : function() {
        return {
            name : this.name,
            primaryColor : this.primaryColor,
            secondaryColor : this.secondaryColor
        };
    }
}

module.exports = Team;