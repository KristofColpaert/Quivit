'use strict';

var React = require('react'),
    teamActions = require('../../actions/teamActions.js'),
    teamStore = require('../../stores/teamStore.js');

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
        teamActions.getTeamHomeAwayByidRequest(this.state.game.teamHomeId, this.state.game.teamAwayId);
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
        var teamsString = ' - ';
        if(this.state.teams.length > 0){
            console.log(this.state.teams[0]);
            teamsString = this.state.teams[0].name + ' - ' + this.state.teams[1].name;
        }
        return(
            <div key={this.props.teams} className="card game">
                <img src="./images/game.jpg" className="game-image"/>
                <span className="score">{this.props.score}</span>
                <span className="time passed">{this.props.timePassed}</span>
                <h3 className="teams">{teamsString}</h3>
            </div>
        );
    }
});

module.exports = Game;