/**
 * Created by BartCallant on 5/11/15.
 */

var MatchModule = (function()
{
    'use strict';

    // Modules
    var ballModule = require('./Ball');
    var fieldModule = require('./Field');
    // /Modules

    // Variables
    Match.prototype.homeTeam = null;
    Match.prototype.awayTeam = null;
    Match.prototype.ball = null;
    Match.prototype.field = null;
    Match.prototype.goalsHomeTeam = 0;
    Match.prototype.goalsAwayTeam = 0;
    Match.prototype.matchEvents = [];
    Match.prototype.passedFirstHald = false;
    Match.prototype.timeInterval = null;
    Match.prototype.time = {
        minute: 0,
        second: 0,
        fullTime: function() { return ('00'+ this.minute).substring(this.minute.toString().length) + ":" + ('00'+this.second).substring(this.second.toString().length); }
    };
    // /Variables

    // Functions
    function Match(homeTeam, awayTeam, callback)
    {
        if(!homeTeam || homeTeam.count === 0) { callback('No players in home-team', false); return; }
        if(!awayTeam || awayTeam.count === 0) { callback('No players in away-team', false); return; }

        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;

        this.field = new fieldModule.Field(1, 1, 8, 8);
        this.ball = new ballModule.Ball(this.field.center(), 1);

        callback(null, 'Match created');
    }

    Match.prototype.score = function() { return this.goalsHomeTeam + "-" + this.goalsAwayTeam; };
    Match.prototype.addMatchEvent = function(message){ this.matchEvents.push({event: message, time: this.time.fullTime()}); };

    Match.prototype.startFirstHalf = function(callback)
    {
        if(!this.homeTeam) { callback('No home-team defined!', false); return; }
        if(!this.awayTeam) { callback('No away-team defined!', false); return; }

        var m = this;
        this.timeInterval = setInterval(function()
        {
            if(m.time.second === 59)
            {
                m.time.minute++;
                m.time.second = 0;

                if(m.time.minute === 45) { m.endFirstHalf(); }
            }
            else { m.time.second++; }
        }, 1000);

        this.addMatchEvent('Match started!');
        callback(null, true);
    };
    Match.prototype.endFirstHalf = function()
    {
        clearInterval(this.timeInterval);
        this.passedFirstHalf = true;

        this.addMatchEvent('End of first half!!');
    };
    Match.prototype.startSecondHalf = function(callback)
    {
        if(!this.passedFirstHalf) { callback('Match not started yet!'); return; }

        var m = this;
        this.timeInterval = setInterval(function()
        {
            if(m.time.second === 59)
            {
                m.time.minute++;
                m.time.second = 0;

                if(m.time.minute === 90) {m.endSecondHalf(); }
            }
            else {m.time.second++; }
        }, 1000);

        this.addMatchEvent('Start of second half!!');
        callback(null, true);
    };
    Match.prototype.endSecondHalf = function()
    {
        clearInterval(this.timeInterval);
        this.addMatchEvent('Match ended!');
    };

    Match.prototype.checkForGoal = function()
    {
        if (this.ball.ballRight() < this.field.topLeft().x)
        {// Ball over left line
            if(this.ball.ballTop() > this.field.goalLeft.post1.y && this.ball.ballBottom() < this.field.goalLeft.post2.y)
            {// ball between posts
                this.addMatchEvent('GOAL!');
            }
        }
        else if(this.ball.ballLeft() > this.field.topRight().x)
        {// Ball over right line
            if(this.ball.ballTop() > this.field.goalRight.post1.y && this.ball.ballBottom() < this.field.goalRight.post2.y)
            {// ball between posts
                this.addMatchEvent('GOAL!');
            }
        }
    };
    // /Functions

    return {
        Match: Match
    };
})();

module.exports = MatchModule;