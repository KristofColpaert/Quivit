'use strict';

var React = require('react'),
    History = require('react-router').History,
    gameActions = require('../../../actions/gameActions.js'),
    gameStore = require('../../../stores/gameStore.js'),
    teamActions = require('../../../actions/teamActions.js'),
    teamStore = require('../../../stores/teamStore.js');

var NewGame = React.createClass({
    mixins: [History],

    getInitialState : function() {
        return({
           teams : teamStore.getAllTeams()
        });
    },

    componentWillMount : function() {
        teamStore.addChangeListener(this._onChange);
        gameStore.addChangeListener(this._onChange);
    },

    componentDidMount : function() {
        teamActions.getTeamsRequest();
    },

    componentWillUnmount : function() {
        teamStore.removeChangeListener(this._onChange);
        gameStore.removeChangeListener(this._onChange);
    },

    _onChange : function() {
        if(gameStore.isGameSaved()) {
            this.history.replaceState(null, '/admin/games');
            gameActions.falsifyIsGameSaved();
        }

        this.setState({
            teams: teamStore.getAllTeams()
        });
    },

    submitHandler : function(event) {
        event.preventDefault();

        var tempGameDate = new Date(this.refs.gameDate.value);
        tempGameDate = '' + tempGameDate.getFullYear() + (tempGameDate.getMonth() + 1) + tempGameDate.getDate();

        var tempGameTime = this.refs.gameTime.value;
        var tempGameTime = tempGameTime.replace(':', '');

        var newGame = {
            teamHomeId : this.refs.teamHome.value,
            teamAwayId : this.refs.teamAway.value,
            gameDate : tempGameDate,
            gameTime : tempGameTime,
            estimoteLocationId : this.refs.estimoteLocationId.value,
            isGameFinished : this.refs.isGameFinished.value
        };

        gameActions.saveGameRequest(newGame);
    },

    render : function() {
        return(
            <section>
                <h2>New Game</h2>
                <form onSubmit={this.submitHandler}>
                    <label htmlFor="teamHome">Home team</label>
                    <select id="teamHome" ref="teamHome">
                        {this.state.teams.map(function(team) {
                            return <option value={team._id} key={team._id}>{team.name}</option>
                        })}
                    </select>

                    <label htmlFor="teamAway">Away team</label>
                    <select id="teamAway" ref="teamAway">
                        {this.state.teams.map(function(team) {
                            return <option value={team._id} key={team._id}>{team.name}</option>
                        })}
                    </select>

                    <label htmlFor="gameDate">Game date</label>
                    <input id="gameDate" type="date" ref="gameDate"/>

                    <label htmlFor="gameTime">Game time</label>
                    <input id="gameTime" type="time" ref="gameTime"/>

                    <label htmlFor="estimoteLocationId">Estimote Location ID</label>
                    <input id="estimoteLocationId" type="text" ref="estimoteLocationId"/>

                    <label htmlFor="isGameFinished">Is game finished?</label>
                    <input id="isGameFinished" type="checkbox" ref="isGameFinished"/>

                    <input type="submit" value="Make" />
                </form>
            </section>
        );
    }
});

module.exports = NewGame;