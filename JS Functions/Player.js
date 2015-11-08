/**
 * Created by BartCallant on 5/11/15.
 */

var PlayerModule = (function()
{
    'use strict';

    // Modules
    // /Modules

    // Variables
    Player.prototype.name = null;
    Player.prototype.position = null;
    Player.prototype.number = null;
    Player.prototype.pictureUrl = null;
    Player.prototype.location = null;
    Player.prototype.locations = null;
    // /Variables

    // Functions
    function Player(name, position, number, pictureUrl)
    {
        this.name = name;
        this.postition = position;
        this.number = number;
        this.pictureUrl = pictureUrl;
        this.location = {x: 1, y: 1};
        this.locations = [];
    }

    Player.prototype.setLocation = function(x, y)
    {
        this.locations.push(this.location);
        this.location = {x: x, y: y};
    };
    // /Functions

    return {
        Player: Player
    };
})();

module.exports = PlayerModule;