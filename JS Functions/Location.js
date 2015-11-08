/**
 * Created by BartCallant on 5/11/15.
 */

var LocationModule = (function()
{
    'use strict';

    // Modules
    // /Modules

    // Variables
    Location.prototype.x = null;
    Location.prototype.y = null;
    // /Variables

    // Functions
    function Location(x, y)
    {
        this.x = x;
        this.y = y;
    }
    // /Functions

    return {
        Location: Location
    };
})();

module.exports = LocationModule;