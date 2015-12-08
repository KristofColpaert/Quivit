'use strict';

var React = require('react'),
    gameStore = require('../../stores/gameStore.js'),
    gameActions  = require('../../actions/gameActions.js'),
    playerStore = require('../../stores/playerStore.js'),
    playerActions = require('../../actions/playerActions.js'),
    teamStore = require('../../stores/teamStore.js'),
    teamActions = require('../../actions/teamActions.js'),
    socket = require('socket.io-client')('http://localhost:3000');

var isOriginSet = false;
var isSocketsInit = false;

var LiveGame = React.createClass({

    contextTypes: {
        history: React.PropTypes.object,
        location: React.PropTypes.object
    },

    getInitialState : function() {
        return ({
            canvasContext : null,
            canvasWidth : null,
            canvasHeight : null,
            players : playerStore.getHomeAwayPlayers(),
            teams : teamStore.getHomeAwayTeams(),
            game : gameStore.getSingleGame()
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
        var context = this.refs.gameCanvas.getContext('2d');
        var width = this.refs.gameCanvas.width;
        var height = this.refs.gameCanvas.height;

        this.setState({
            canvasContext : context,
            canvasWidth : width,
            canvasHeight : height,
            players : playerStore.getHomeAwayPlayers(),
            teams : teamStore.getHomeAwayTeams(),
            game : gameStore.getSingleGame()
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
                console.log(data);
                requestAnimationFrame(() => {self._update(data)});
            });
        });

        this.state.players['away'].forEach(function(player) {
            socket.on('connect', function() {
                console.log('Connection with socket');
            });

            socket.on(player._id, function(data) {
                console.log(data);
                requestAnimationFrame(() => {self._update(data)});
            });
        });
    },

    _update : function(data) {
        var context = this.refs.gameCanvas.getContext('2d');
        var width = this.refs.gameCanvas.width;
        var height = this.refs.gameCanvas.height;
        var radius = 15;
        var transX = width * 0.5;
        var transY = height * 0.5;

        if(context != null) {
            if(!isOriginSet) {
                isOriginSet = true;
                context.translate(transX, transY);
            }

            context.clearRect(-(width / 2), -(height / 2), width, height);
            context.beginPath();
            context.arc((data.x * 100), (data.y * 100), radius, 0, 2 * Math.PI, false);
            context.fillStyle = '#333333';
            context.fill();
        }
    },

    render: function() {
        var homeTeam = typeof this.state.game._id === 'undefined' ? 'Home' : this.state.teams[this.state.game._id].home.name;
        var awayTeam = typeof this.state.game._id === 'undefined' ? 'Away' : this.state.teams[this.state.game._id].away.name;
        return(
            <div>
        	   <section className="live game">
            	   <h1>{homeTeam} - {awayTeam}</h1>
				   <canvas ref="gameCanvas" id="gameCanvas" className="gameCanvas" width="1200" height="600"></canvas>
               </section>
            </div>
        );
    }
});

module.exports = LiveGame;