/**
 * Created by BartCallant on 5/11/15.
 */

function Team(name, players, pictureUrl)
{
    this.name = name;
    this.players = players;
    this.pictureUrl = pictureUrl;
}

Team.prototype.findLastPlayer = function(side)
{
    // LAST PLAYER
    var lp = null;

    // LOOP OVER EVERY PLAYER
    for(var i = 0, l = this.players.length; i < l; i++)
    {
        // GET PLAYER
        var p = this.players[i];

        if(!lp)
        {
            lp = p;
            continue;
        }

        // IF PLAYER IS NOT GOALKEEPER
        if(p.postition != "GK")
        {
            // CHECK SIDE
            if(side)
            { // RIGHT SIDE
                if(p.location.x > lp.location.x)
                {
                    // PLAYER IS MORE TO THE RIGHT THAN LAST MOST RIGHT PLAYER
                    lp = p;
                }
            }
            else
            { // LEFT SIDE
                if(p.location.x < lp.location.x)
                {
                    // PLAYER IS MORE TO THE LEFT THAN LAST MOST LEFT PLAYER
                    lp = p;
                }
            }
        }
    }

    return lp;
};