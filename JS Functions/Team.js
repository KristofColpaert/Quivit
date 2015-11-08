/**
 * Created by BartCallant on 5/11/15.
 */

var TeamModule = (function()
{
    'use strict';

    // Modules
    // /Modules

    // Variables
    Team.prototype.name = null;
    Team.prototype.players = null;
    Team.prototype.pictureUrl = null;
    // /Variables

    // Functions
    function Team(name, players, pictureUrl)
    {
        this.name = name;
        this.players = players;
        this.pictureUrl = pictureUrl;
    }

    Team.prototype.findLastPlayer = function(side)
    {
        // FIRST PLAYER
        var lp = this.players[0];

        // LOOP OVER EVERY PLAYER
        for(var i = 1, l = this.players.length; i < l; i++)
        {
            // GET PLAYER
            var p = this.players[i];

            // IF PLAYER IS NOT GOALKEEPER
            if(p.postition != "GK")
            {
                // CHECK SIDE
                if(side)
                {   // RIGHT SIDE
                    if(p.location.x > lp.location.x)
                    {   // PLAYER IS MORE TO THE RIGHT THAN LAST MOST RIGHT PLAYER
                        lp = p;
                    }
                }
                else
                {   // LEFT SIDE
                    if(p.location.x < lp.location.x)
                    {   // PLAYER IS MORE TO THE LEFT THAN LAST MOST LEFT PLAYER
                        lp = p;
                    }
                }
            }
        }

        return lp;
    };
    // /Functions

    return {
        Team: Team
    };
})();

module.exports = TeamModule;