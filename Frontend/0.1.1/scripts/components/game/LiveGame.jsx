'use strict';

var React = require('react'),
    gameStore = require('../../stores/gameStore.js'),
    gameActions  = require('../../actions/gameActions.js'),
    playerStore = require('../../stores/playerStore.js'),
    playerActions = require('../../actions/playerActions.js'),
    teamStore = require('../../stores/teamStore.js'),
    teamActions = require('../../actions/teamActions.js'),
    socket = require('socket.io-client')('http://localhost:3000'),
    Pitch = require('./Pitch.jsx'),
    PitchElement = require('./PitchElement.jsx');

var isSocketsInit = false;

var LiveGame = React.createClass({

    contextTypes: {
        history: React.PropTypes.object,
        location: React.PropTypes.object
    },

    getInitialState : function() {
        return ({
            players : playerStore.getHomeAwayPlayers(),
            teams : teamStore.getHomeAwayTeams(),
            game : gameStore.getSingleGame(),
            playerPositions : []
        });
    },

    componentWillMount : function() {
        gameStore.addChangeListener(this._onChange);
        playerStore.addChangeListener(this._onChange);
        teamStore.addChangeListener(this._onChange);
    },

    componentDidMount : function() {
        //Query game
        var query = this.context.location.pathname;
        var query = query.substr(12);
        gameActions.getGameRequest(query);
    },

    componentWillUnmount: function() {
        gameStore.removeChangeListener(this._onChange);
        playerStore.removeChangeListener(this._onChange);
        teamStore.removeChangeListener(this._onChange);
    },

    _onChange : function() {
        this.setState({
            players : playerStore.getHomeAwayPlayers(),
            teams : teamStore.getHomeAwayTeams(),
            game : gameStore.getSingleGame(),
            playerPositions : []
        });

        //If game set, than get players.
        if((typeof this.state.players['home'] === 'undefined') && (typeof this.state.game._id !== 'undefined')) {
            playerActions.getPlayersByTeamRequest(this.state.game.teamHomeId, this.state.game.teamAwayId);
        }

        //If players set, than init sockets.
        if((typeof this.state.players['home'] !== 'undefined') && (!isSocketsInit)) {
            isSocketsInit = true;
            this._initSockets();
        }
    },

    _initSockets : function() {
        var self = this;
        this.state.players['home'].forEach(function(player) {
            socket.on('connect', function() {
                console.log('Connection with socket');
            });

            socket.on(player._id, function(data) {
                requestAnimationFrame(() => {self._update(data)});
            });
        });

        this.state.players['away'].forEach(function(player) {
            socket.on('connect', function() {
                console.log('Connection with socket');
            });

            socket.on(player._id, function(data) {
                requestAnimationFrame(() => {self._update(data)});
            });
        });
    },

    _update : function(data) {
        var tempPlayerPositions = [];
        var playerPosition = <PitchElement x={data.x} y={data.y} radius="15" fill="red"/>
        tempPlayerPositions.push(playerPosition);

        this.setState({
            players : playerStore.getHomeAwayPlayers(),
            teams : teamStore.getHomeAwayTeams(),
            game : gameStore.getSingleGame(),
            playerPositions : tempPlayerPositions
        });
    },

    render: function() {
        var homeTeam = typeof this.state.game._id === 'undefined' ? 'Home' : this.state.teams[this.state.game._id].home.name;
        var awayTeam = typeof this.state.game._id === 'undefined' ? 'Away' : this.state.teams[this.state.game._id].away.name;
        return(
            <div>
        	   <section className="live game">
            	   <h1>{homeTeam} - {awayTeam}</h1>
				   <Pitch width="1200" height="600" pitchElements={this.state.playerPositions} />
               </section>
            </div>
        );
    }
});

module.exports = LiveGame;