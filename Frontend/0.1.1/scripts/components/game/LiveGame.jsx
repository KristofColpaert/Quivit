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
    Pitch = require('./Pitch.jsx'),
    PitchElementCircle = require('./PitchElementCircle.jsx');
    
var isSocketsInit = false;

var LiveGame = React.createClass({

    _localVariables : {
        isSocketsInit : false,
        socket : null
    },

    contextTypes: {
        history: React.PropTypes.object,
        location: React.PropTypes.object
    },

    getInitialState : function() {
        return ({
            spaceWidth : 0,
            spaceHeight : 0,
            players : playerStore.getHomeAwayPlayers(),
            kitnumber: 'X',
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

        this._localVariables.socket = require('socket.io-client')(constants.socketsUrl, {forceNew : true});
        this._localVariables.isSocketsInit = false;
    },

    componentWillUnmount : function() {
        gameStore.removeChangeListener(this._onChange);
        playerStore.removeChangeListener(this._onChange);
        teamStore.removeChangeListener(this._onChange);
        estimoteLocationStore.removeChangeListener(this._onChange);

        this._localVariables.isSocketsInit = false;
        this._localVariables.socket.emit('goaway', 'disconnect');
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
        if((typeof this.state.players['home'][0] === 'undefined') && (typeof this.state.game._id !== 'undefined')) {
            playerActions.getPlayersByTeamRequest(this.state.game.teamHomeId, this.state.game.teamAwayId);
        }

        //If players set, than init sockets.
        if((typeof this.state.players['home'] !== 'undefined') && (!this._localVariables.isSocketsInit) && (typeof this.state.game._id !== 'undefined')) {
            this._localVariables.isSocketsInit = true;
            this._initSockets();
        }
    },

    _initSockets : function() {
        var self = this;

        //Player sockets.
        this.state.players['home'].forEach(function(player) {
            self._localVariables.socket.on(player._id, function(data) {
                requestAnimationFrame(() => {self._update(data)});
                //console.log(data);
            });
        });

        this.state.players['away'].forEach(function(player) {
            self._localVariables.socket.on(player._id, function(data) {
                requestAnimationFrame(() => {self._update(data)});
                //console.log(data);
            });
        });

        //Score sockets.
        var room = 'live' + this.state.game._id;
        this._localVariables.socket.emit('createManage', room);

        this._localVariables.socket.on('score', function(result) {
            var tempGame = self.state.game;
            if(result.team === 'home') {
                tempGame.scoreHome = result.score;
            }

            else if(result.team === 'away') {
                tempGame.scoreAway = result.score;
            }

            self.setState({
                spaceWidth : self.state.estimoteLocation.spaceWidth === 'undefined' ? 0 : self.state.estimoteLocation.spaceWidth,
                spaceHeight : self.state.estimoteLocation.spaceHeight === 'undefined' ? 0 : self.state.estimoteLocation.spaceHeight,
                players : playerStore.getHomeAwayPlayers(),
                teams : teamStore.getHomeAwayTeams(),
                game : tempGame,
                estimoteLocation : estimoteLocationStore.getSingleEstimoteLocation(),
                playerPositions : self.state.playerPositions
            });
        });
    },

    _playerClicked: function(e) {
        // TODO look at this
        // players[playerID];
        console.log(e);
    },

    _update : function(data) {
        var tempPlayerPositions = this.state.playerPositions;
        var playerPosition = <PitchElementCircle onClick={ this._playerClicked }
                                key={data.playerId}
                                y={(data.x * (-100)) + ((this.state.spaceWidth * 100) / 2)}
                                x={(data.y * (-100)) + ((this.state.spaceHeight * 100) / 2)}
                                radius= '15'
                                fillElement= 'rgb(170,170,170)'
                                fillText = 'white'
                                fontSize = '16' />
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

        var scoreHome = typeof this.state.game.scoreHome === 'undefined' ? 0 : this.state.game.scoreHome;
        var scoreAway = typeof this.state.game.scoreAway === 'undefined' ? 0 : this.state.game.scoreAway;

        Object.keys(this.state.playerPositions).forEach(function(key) {
            finalPlayerPositions.push(self.state.playerPositions[key]);
        });

        //Calculate time passed.
        var timePassed = 0;
        var currentDate = '' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate();
        if(this.state.game.gameDate === currentDate) {
            var gameDateYear = this.state.game.gameDate.substr(0, 4);
            var gameDateMonth = this.state.game.gameDate.substr(4, 2);
            var gameDateDay = this.state.game.gameDate.substr(6, 2);

            var gameHour = this.state.game.gameTime.substr(0, 2);
            var gameMinute = this.state.game.gameTime.substr(2, 2);

            var currentTime = new Date();
            var gameTime = new Date('' + gameDateYear + '-' + gameDateMonth + '-' + gameDateDay + 'T' + (gameHour - 1) + ':' + gameMinute + ':00');
            var difference = Math.abs(currentTime.getTime - gameTime.getTime());
            var differenceMinutes = Math.ceil(difference / (1000 * 3600));

            console.log(differenceMinutes);

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
        	    <section className="live game">
                    <section className="playerSheet">
                        <h3 className="kit number" ref="kitnumber">{ this.state.kitnumber }</h3>
                        <span className="name">Karel Verhulst</span>
                    </section>
                    <section className="gameSheet">
                        <span className="score">{scoreHome + '-' + scoreAway}</span>
                        <span className="time">{timePassed}</span>
                    </section>
                    <div className="clearfix"></div>
                    <Pitch width={spaceWidth} height={spaceHeight} pitchElements={finalPlayerPositions} />
                    <h2 className="team home">{homeTeam}</h2><h2 className="team away">{awayTeam}</h2>
                    <div className="clearfix"></div>
                </section>
        );
    }
});

module.exports = LiveGame;