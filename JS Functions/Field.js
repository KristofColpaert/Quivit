/**
 * Created by BartCallant on 5/11/15.
 */

var FieldModule = (function()
{
    'use strict';

    // Modules
    var locationModule = require('./Location');
    var goalModule = require('./Goal');
    // /Modules

    // Variables
    Field.prototype.goalLeft = null;
    Field.prototype.goalRight = null;
    Field.prototype.width = null;
    Field.prototype.height = null;
    Field.prototype.location = null;
    // /Variables

    // Functions
    function Field(x, y, width, height)
    {
        // 1 + (8/2) - 1
        this.goalLeft = new goalModule.Goal(x, y + (height / 2) - 1.5, y + (height / 2) + 1.5);
        this.goalRight = new goalModule.Goal(x + width, y + (height / 2) - 1.5, y + (height / 2) + 1.5);

        this.width = width;
        this.height = height;
        this.location = new locationModule.Location(x, y);
    }

    Field.prototype.topLeft = function() { return this.location; };
    Field.prototype.topRight = function() { return new locationModule.Location(this.location.x + this.width, this.location.y); };
    Field.prototype.bottomLeft = function() { return new locationModule.Location(this.location.x, this.location.y + this.height); };
    Field.prototype.bottomRight = function() { return new locationModule.Location(this.location.x + this.width, this.location.y + this.height); };
    Field.prototype.center = function() { return new locationModule.Location(this.location.x + (this.width / 2), this.location.y + (this.height /2)); };
    // /Functions

    return {
        Field: Field
    };
})();

module.exports = FieldModule;