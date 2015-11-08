/**
 * Created by BartCallant on 5/11/15.
 */

var BallModule = (function()
{
    'use strict';

    // Modules
    // /Modules

    // Variables
    Ball.prototype.location = null;
    Ball.prototype.locations = null;
    Ball.prototype.radius = null;
    // /Variables

    // Functions
    function Ball(location, radius)
    {
        this.location = location;
        this.locations = [];
        this.radius = radius;
    }

    Ball.prototype.ballRight = function() { return this.location.x + this.radius; };
    Ball.prototype.ballTop  = function() { return this.location.y - this.radius; };
    Ball.prototype.ballBottom = function() { return this.location.y + this.radius; };
    Ball.prototype.ballLeft = function() { return this.location.x - this.radius; };

    Ball.prototype.setLocation = function(x, y)
    {
        this.locations.push(this.location);
        this.location = {x: x, y: y};
    };
    // /Functions

    return {
        Ball: Ball
    };
})();

module.exports = BallModule;