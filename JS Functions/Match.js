/**
 * Created by BartCallant on 5/11/15.
 */

function Match(homeTeam, awayTeam) //field, homeTeam, awayTeam, ball
{
    this.field = new Field(1, 1, 8, 8);
    this.ball = new Ball(5, 5, 1);

    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;

    this.goalsHomeTeam = 0;
    this.goalsAwayTeam = 0;

    this.matchEvents = [];
}

Match.prototype.checkForGoal = function()
{
    if (this.ball.ballRight < this.field.topLeft.x)
    {// Ball over left line
        if(this.ball.ballTop > this.field.goalLeft.post1.y && this.ball.ballBottom < this.field.goalLeft.post2.y)
        {// ball between posts
            return true; // GOAL
        }
        return false;
    }
    else if(this.ball.ballLeft > this.field.topRight.x)
    {// Ball over right line
        if(this.ball.ballTop > this.field.goalRight.post1.y && this.ball.ballBottom < this.field.goalRight.post2.y)
        {// ball between posts
            return true; // GOAL
        }
        return false;
    }
    else
    {
        return false;
    }
};

Match.prototype.score = function()
{
    return "{this.goalsHomeTeam}-{this.goalsAwayTeam}";
};