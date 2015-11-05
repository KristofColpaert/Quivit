/**
 * Created by BartCallant on 5/11/15.
 */

function Ball(x, y, radius)
{
    this.location = new Location(x, y);
    this.locations = [];
    this.radius = radius;
}

Ball.prototype.ballRight = function()
{
    // x + radius: 4
    return this.x + this.radius;
};
Ball.prototype.ballTop  = function()
{
    // y - radius: 4
    return this.y - this.radius;
};
Ball.prototype.ballBottom = function()
{
    // y + radius: 6
    return this.y + this.radius;
};
Ball.prototype.ballLeft = function()
{
    // x - radius: 2
    return this.x - this.radius;
};

Ball.prototype.setLocation = function(x, y)
{
    this.locations.push(this.location);
    this.location = {x: x, y: y};
};