'use strict';

var React = require('react'),
    constants = require('../../helpers/urlConstants.js'),
    gameStore = require('../../stores/gameStore.js'),
    gameActions  = require('../../actions/gameActions.js'),
    playerStore = require('../../stores/playerStore.js'),
    playerActions = require('../../actions/playerActions.js'),
    teamStore = require('../../stores/teamStore.js'),
    teamActions = require('../../actions/teamActions.js'),
    estimoteLocationStore = require('../../stores/estimoteLocationStore.js'),
    estimoteLocationActions = require('../../actions/estimoteLocationActions.js'),
    socket = require('socket.io-client')(constants.socketsUrl),
    Pitch = require('./Pitch.jsx'),
    PitchElementCircle = require('./PitchElementCircle.jsx');
    
var isSocketsInit = false;

var LiveGame = React.createClass({

    contextTypes: {
        history: React.PropTypes.object,
        location: React.PropTypes.object
    },

    getInitialState : function() {
        return ({
            spaceWidth : 0,
            spaceHeight : 0,
            players : playerStore.getHomeAwayPlayers(),
            teams : teamStore.getHomeAwayTeams(),
            game : gameStore.getSingleGame(),
            estimoteLocation : estimoteLocationStore.getSingleEstimoteLocation(),
            playerPositions : {}
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
        query = query.substr(12);
        gameActions.getGameRequest(query);
    },

    componentWillUnmount : function() {
        gameStore.removeChangeListener(this._onChange);
        playerStore.removeChangeListener(this._onChange);
        teamStore.removeChangeListener(this._onChange);
        estimoteLocationStore.removeChangeListener(this._onChange);
    },

    _onChange : function() {
        this.setState({
            spaceWidth : this.state.estimoteLocation.spaceWidth === 'undefined' ? 0 : this.state.estimoteLocation.spaceWidth,
            spaceHeight : this.state.estimoteLocation.spaceHeight === 'undefined' ? 0 : this.state.estimoteLocation.spaceHeight,
            players : playerStore.getHomeAwayPlayers(),
            teams : teamStore.getHomeAwayTeams(),
            game : gameStore.getSingleGame(),
            estimoteLocation : estimoteLocationStore.getSingleEstimoteLocation(),
            playerPositions : {}
        });

        if((typeof this.state.estimoteLocation._id === 'undefined') && (typeof this.state.game._id !== 'undefined')) {
            estimoteLocationActions.getEstimoteLocationByEstimoteLocationIdRequest(this.state.game.estimoteLocationId);
        }

        //If game set, than get team.
        if((typeof this.state.teams[this.state.game._id] !== 'object') && (typeof this.state.game._id !== 'undefined')) {
            teamActions.getTeamHomeAwayByidRequest(this.state.game.teamHomeId, this.state.game.teamAwayId, this.state.game._id);
        }

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
                console.log(data);
            });
        });

        this.state.players['away'].forEach(function(player) {
            socket.on('connect', function() {
                console.log('Connection with socket');
            });

            socket.on(player._id, function(data) {
                requestAnimationFrame(() => {self._update(data)});
                console.log(data);
            });
        });
    },

    _update : function(data) {
        var tempPlayerPositions = this.state.playerPositions;
        var playerPosition = <PitchElementCircle key={data.playerId} y={(data.x * (-100)) + (this.state.spaceWidth / 2)} x={(data.y * (-100)) + (this.state.spaceHeight / 2)} radius="15" fillElement="red" fillText="white" kitNumber={data.kitNumber} fontSize="16" />
        tempPlayerPositions[data.playerId] = playerPosition;

        this.setState({
            spaceWidth : this.state.estimoteLocation.spaceWidth === 'undefined' ? 0 : this.state.estimoteLocation.spaceWidth,
            spaceHeight : this.state.estimoteLocation.spaceHeight === 'undefined' ? 0 : this.state.estimoteLocation.spaceHeight,
            players : playerStore.getHomeAwayPlayers(),
            teams : teamStore.getHomeAwayTeams(),
            game : gameStore.getSingleGame(),
            estimoteLocation : estimoteLocationStore.getSingleEstimoteLocation(),
            playerPositions : tempPlayerPositions
        });
    },

    render: function() {
        var self = this;
        var homeTeam = "Home";
        var awayTeam = "Away";
        if((typeof this.state.game._id !== 'undefined' && typeof this.state.teams[this.state.game._id] === 'object')) {
            homeTeam = this.state.teams[this.state.game._id].home.name;
            awayTeam = this.state.teams[this.state.game._id].away.name;
        }

        var finalPlayerPositions = [];
        var spaceWidth = typeof this.state.estimoteLocation.spaceWidth === 'undefined' ? 0 : (this.state.estimoteLocation.spaceWidth * 100);
        var spaceHeight = typeof this.state.estimoteLocation.spaceHeight === 'undefined' ? 0 : (this.state.estimoteLocation.spaceHeight * 100);

        Object.keys(this.state.playerPositions).forEach(function(key) {
            finalPlayerPositions.push(self.state.playerPositions[key]);
        });

        return(
        	    <section className="live game">
                    <section className="playerSheet">
                        <h3 className="kit number">13</h3>
                        <span className="name">Karel Verhulst</span>
                        <span className="goal">1 goal</span>
                        <span className="distance">4,6km</span>
                    </section>
                    <section className="gameSheet">
                        <span className="score">2-1</span>
                        <span className="time">54'</span>
                    </section>
                    <Pitch width={spaceWidth} height={spaceHeight} pitchElements={finalPlayerPositions} />
                    <h2>{homeTeam} - {awayTeam}</h2>
                </section>
        );
    }
});

module.exports = LiveGame;