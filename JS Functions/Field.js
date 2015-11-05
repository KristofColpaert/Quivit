/**
 * Created by BartCallant on 5/11/15.
 */

function Field(x, y, width, height)
{
    // 1 + (8/2) - 1
    this.goalLeft = new Goal(x, y + (height / 2) - 1, y + (height / 2) + 1);
    this.goalRight = new Goal(x + width, y + (height / 2) - 1, y + (height / 2) + 1);

    this.width = width;
    this.height = height;
    this.location = new Location(x, y);
}

Field.prototype.topLeft = function()
{
    return this.location;
};
Field.prototype.topRight = function()
{
    return new Location(this.location.x + this.width, this.location.y);
};
Field.prototype.bottomLeft = function()
{
    return new Location(this.location.x, this.location.y + this.height);
};
Field.prototype.bottomRight = function()
{
    return new Location(this.location.x + this.width, this.location.y + this.height);
};
Field.prototype.center = function()
{
    return new Location(this.location.x + (this.width / 2), this.location.y + (this.height /2));
};