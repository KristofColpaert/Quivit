'use strict';

var React = require('react'),
    Link = require('react-router').Link,
    gameStore = require('../../stores/gameStore.js'),
    gameActions  = require('../../actions/gameActions.js'),
    playerStore = require('../../stores/playerStore.js'),
    playerActions = require('../../actions/playerActions.js'),
    teamStore = require('../../stores/teamStore.js'),
    teamActions = require('../../actions/teamActions.js'),
    estimoteLocationStore = require('../../stores/estimoteLocationStore.js'),
    estimoteLocationActions = require('../../actions/estimoteLocationActions.js');

var GameOverview = React.createClass({

    _localVariables : {
        isPlayersSet : false,
        isTeamsSet : false,
        isEstimoteLocationSet : false
    },

    contextTypes: {
        history: React.PropTypes.object,
        location: React.PropTypes.object
    },

    getInitialState : function() {
        return({
            game : gameStore.getSingleGame(),
            players : playerStore.getHomeAwayPlayers(),
            teams: teamStore.getHomeAwayTeams(),
            estimoteLocation : estimoteLocationStore.getSingleEstimoteLocation()
        });
    },

    componentWillMount : function() {
        gameStore.addChangeListener(this._onChange);
        playerStore.addChangeListener(this._onChange);
        teamStore.addChangeListener(this._onChange);
        estimoteLocationStore.addChangeListener(this._onChange);
    },

    componentDidMount : function() {
        //Query game
        var query = this.context.location.pathname;
        query = query.substr(14);
        gameActions.getGameRequest(query);
    },

    componentWillUnmount : function() {
        gameStore.removeChangeListener(this._onChange);
        playerStore.removeChangeListener(this._onChange);
        teamStore.removeChangeListener(this._onChange);
        estimoteLocationStore.removeChangeListener(this._onChange);

        this._localVariables.isEstimoteLocationSet = false;
        this._localVariables.isPlayersSet = false;
        this._localVariables.isTeamsSet = false;
    },

    _onChange : function() {
        this.setState({
            game: gameStore.getSingleGame(),
            players : playerStore.getHomeAwayPlayers(),
            teams : teamStore.getHomeAwayTeams()
        });

        if(typeof this.state.game._id !== 'undefined') {
            var query = this.context.location.pathname;
            query = query.substr(14);

            if((!this._localVariables.isPlayersSet) && (this.state.game._id === query)){
                this._localVariables.isPlayersSet = true;
                playerActions.getPlayersByTeamRequest(this.state.game.teamHomeId, this.state.game.teamAwayId);
            }

            if((!this._localVariables.isTeamsSet) && (this.state.game._id === query)){
                this._localVariables.isTeamsSet = true;
                teamActions.getTeamHomeAwayByidRequest(this.state.game.teamHomeId, this.state.game.teamAwayId, this.state.game._id);
            }

            if((!this._localVariables.isEstimoteLocationSet) && (this.state.game._id === query)){
                this._localVariables.isEstimoteLocationSet = true;
                estimoteLocationActions.getEstimoteLocationByEstimoteLocationIdRequest(this.state.game.estimoteLocationId);
            }
        }
    },

    render : function() {
        var gameId = this.state.game._id;
        var homeTeam = "Home";
        var awayTeam = "Away";
        if((typeof this.state.game._id !== 'undefined' && typeof this.state.teams[this.state.game._id] === 'object')) {
            homeTeam = this.state.teams[this.state.game._id].home.name;
            awayTeam = this.state.teams[this.state.game._id].away.name;
        }

        return(
            <section className="overview game">
                <section className="reviewGame">
                    <h2>View game again</h2>

                </section>
                <section className="playersSection">
                    <h2>Players {homeTeam}</h2>
                    {this.state.players['home'].map(function(player) {
                        return (
                            <Link className="playerHolder" key={player._id} to={'/heatMap/' + gameId + '/' + player._id}><p>{player.firstName + ' ' + player.lastName}</p></Link>
                        );
                    })}

                    <h2>Players {awayTeam}</h2>
                    {this.state.players['away'].map(function(player) {
                        return (
                            <Link className="playerHolder" key={player._id} to={'/heatMap/' + gameId + '/' + player._id}><p>{player.firstName + ' ' + player.lastName}</p></Link>
                        );
                    })}
                </section>
            </section>
        );
    }
});

module.exports = GameOverview;