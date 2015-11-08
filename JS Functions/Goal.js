/**
 * Created by BartCallant on 5/11/15.
 */

var GoalModule = (function()
{
    'use strict';

    // Modules
    var locationModule = require('./Location');
    // /Modules

    // Variables
    Goal.prototype.post1 = null;
    Goal.prototype.post2 = null;
    // /Variables

    // Functions
    function Goal(x, y1, y2)
    {
        this.post1 = new locationModule.Location(x, y1);
        this.post2 = new locationModule.Location(x, y2);
    }
    // /Functions

    return {
        Goal: Goal
    };
})();

module.exports = GoalModule;