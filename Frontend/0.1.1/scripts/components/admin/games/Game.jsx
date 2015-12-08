'use strict';

var React = require('react'),
    teamActions = require('../../../actions/teamActions.js'),
    teamStore = require('../../../stores/teamStore.js');

var Game = React.createClass({
    getInitialState : function() {
        return({
            game : this.props.game,
            teams : teamStore.getHomeAwayTeams()
        });
    },

    componentWillMount : function() {
        teamStore.addChangeListener(this._onChange);
    },

    componentDidMount : function() {
        teamActions.getTeamHomeAwayByidRequest(this.state.game.teamHomeId, this.state.game.teamAwayId, this.state.game._id);
    },

    componentWillUnmount : function() {
        teamStore.removeChangeListener(this._onChange);
    },

    _onChange : function() {
        this.setState({
            game : this.props.game,
            teams : teamStore.getHomeAwayTeams()
        });
    },

    render: function() {
        //Date and time.
        var teamsString = ' - ';
        var scoreString = this.state.game.scoreHome + ' - ' + this.state.game.scoreAway;

        if(!(typeof this.state.teams[this.state.game._id] === 'undefined')){
            teamsString = this.state.teams[this.state.game._id].home.name + ' - ' + this.state.teams[this.state.game._id].away.name;
        }

        //Calculate time passed.
        var timePassed = 0;
        var currentDate = '' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate();
        var currentTime = '' + new Date().getHours() + new Date().getMinutes();
        if(this.state.game.gameDate === currentDate) {
            var timePassed = currentTime - this.state.game.gameTime;
            if(this.state.game.gameTime < currentTime) {
                var timePassed = currentTime - this.state.game.gameTime;

                if(timePassed > 45 && timePassed <= 60) {
                    timePassed = 'Pause';
                }

                else if(timePassed > 60 && timePassed <= 105) {
                    timePassed = timePassed - 15;
                }

                else if(timePassed > 105) {
                    timePassed = 'Finished';
                }
            }
        }

        return(
            <div key={this.state.game._id} className="card game">
                <img src="../images/game.jpg" className="game-image"/>
                <span className="score">{scoreString}</span>
                <span className="time passed"></span>
                <h3 className="teams">{teamsString}</h3>
            </div>
        );
    }
});

module.exports = Game;