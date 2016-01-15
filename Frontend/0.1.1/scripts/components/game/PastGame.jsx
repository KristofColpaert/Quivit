'use strict';

var React = require('react'),
    Pitch = require('./Pitch.jsx'),
    PitchElementCircle = require('./PitchElementCircle.jsx'),
    playerStore = require('../../stores/playerStore.js'),
    constants = require('../../helpers/urlConstants.js');

var PastGame = React.createClass({

    _localVariables: {
        isSocketsInit: false,
        pageCount: 0,
        socket: null,
        playerPositions: {},
        interval: null,
        isInterval: false,
    },

    contextTypes: {
        history: React.PropTypes.object,
        location: React.PropTypes.object
    },

    getInitialState : function() {
        return({
            players: playerStore.getHomeAwayPlayers(),
            kitNumber: 'X',
            playerName: 'player',
            currentPlayer: null,
            finalPlayerPositions: [],
            playStop: 'Play',
            intervalFreq: 2,
            fastForwardClass: 'primary',
            slowForwardClass: 'primary disabled'
        });
    },

    componentDidMount : function() {
        this._localVariables.playerPositions = {};
        this._localVariables.isSocketsInit = false;
        this._localVariables.socket = require('socket.io-client')(constants.socketsUrl, {forceNew : true});
    },

    componentWillUnmount : function() {
        this._localVariables.playerPositions = {};
        if(this._localVariables.interval !== null) {
            clearInterval(this._localVariables.interval);
        }
        this._localVariables.isSocketsInit = false;
        this._localVariables.socket.emit('goaway', 'disconnect');
    },

    _initWatching : function() {
        if(!this._localVariables.isSocketsInit &&
            (typeof this.props.game._id !== 'undefined') &&
            this.props.players.home.length > 0 &&
            this.props.players.away.length > 0 &&
            (typeof this.props.teams[this.props.game._id] !== 'undefined') &&
            (typeof this.props.estimoteLocation._id !== 'undefined')){
            //Init sockets.
            this.setState({
                playStop : 'Stop'
            })
            this._localVariables.isSocketsInit = true;
            this._initSockets();
        }

        else if(this._localVariables.isInterval) {
            this.setState({
                playStop : 'Play'
            });
            this._stopShow();
        }

        else if(!this._localVariables.isInterval) {
            this.setState({
                playStop : 'Stop'
            });
            this._startShow();
        }
    },

    _getPlayer: function(playerId) {
        for (var i = this.state.players.home.length - 1; i >= 0; i--) {
            if (this.state.players.home[i]._id === playerId) {
                return this.state.players.home[i];
            };
        };
        for (var i = this.state.players.away.length - 1; i >= 0; i--) {
            if (this.state.players.away[i]._id === playerId) {
                return this.state.players.away[i];
            };
        };
    },

    _playerClicked: function(p) {
        this.state.kitNumber = p.kitNumber;
        this.state.playerName = p.firstName + ' ' + p.lastName;
    },

    _initSockets : function() {
        var self = this;
        var gameId = this.props.game._id;
        var query = this.context.location.pathname;
        query = query.substr(14);

        if(query === gameId) {
            this.props.players['home'].forEach(function(player) {
                //Ask server to get room.
                self._localVariables.socket.emit('createPast', 'past' + gameId + player._id);
            });

            this.props.players['away'].forEach(function(player) {
                //Ask server to get room.
                self._localVariables.socket.emit('createPast', 'past' + gameId + player._id);
            });

            //Get data.
            this._localVariables.socket.on('data', function(data) {
                var tempPlayerPositions = self._localVariables.playerPositions;

                if(typeof tempPlayerPositions[data.playerId] === 'undefined'){
                    tempPlayerPositions[data.playerId] = [];
                }

                var player = self._getPlayer( data.playerId ),
                playerPosition = <PitchElementCircle
                                        key = {data.playerId}
                                        handleClick = { self._playerClicked.bind( null, player ) }
                                        y = {(data.x * (-100)) + ((self.props.estimoteLocation.spaceWidth * 100) / 2)}
                                        x = {(data.y * (-100)) + ((self.props.estimoteLocation.spaceHeight * 100) / 2)}
                                        radius = '15'
                                        fillElement = 'rgb(170,170,170)'
                                        fillText = 'white'
                                        fontSize = '16' />
                tempPlayerPositions[data.playerId].push(playerPosition);

                self._localVariables.playerPositions = tempPlayerPositions;
            });

            //Ask data for the first time.
            this._localVariables.socket.emit('more', self._localVariables.pageCount);

            //Enable showing players.
            this._startShow();
        }
    },

    _startShow : function(interval) {
        console.log(interval);
        var self = this;

        if(!interval) {
            this.setState({
                intervalFreq : 2,
                fastForwardClass: 'primary',
                slowForwardClass: 'primary disabled'
            });
        }

        interval = interval ? interval : 200;

        this._localVariables.isInterval = true
        this._localVariables.interval = setInterval(function() {
            //Make playerpositions
            var finalPlayerPositions = [];
            Object.keys(self._localVariables.playerPositions).forEach(function(key) {
                finalPlayerPositions.push(self._localVariables.playerPositions[key][0]);
                self._localVariables.playerPositions[key].shift();
            });

            self.setState({
                finalPlayerPositions : finalPlayerPositions
            });

            //If less than 250 positions ==> ask new positions.
            var key = Object.keys(self._localVariables.playerPositions)[0];
            if(typeof self._localVariables.playerPositions[key] !== 'undefined'){
                if(self._localVariables.playerPositions[key].length === 200) {
                    self._askMore();
                }
            }
        }, interval);
    },

    _stopShow : function() {
        this._localVariables.isInterval = false;
        clearInterval(this._localVariables.interval);
    },

    _askMore : function() {
        this._localVariables.pageCount++;
        this._localVariables.socket.emit('more', this._localVariables.pageCount);
    },

    _fastForward : function() {
        if(this.state.intervalFreq < 16) {
            this._stopShow();
            this._startShow(200 / this.state.intervalFreq);
            this.setState({
                intervalFreq : this.state.intervalFreq * 2,
            });
        }

        if(this.state.intervalFreq >= 16) {
            this.setState({
               fastForwardClass: 'primary disabled'
            });
        }
    },

    _slowForward : function() {
        if(this.state.intervalFreq > 2) {
            this._stopShow();
            console.log('Freq:' + this.state.intervalFreq);
            this._startShow(200 / (this.state.intervalFreq / 4));
            this.setState({
                intervalFreq : this.state.intervalFreq / 2
            });
        }

        if(this.state.intervalFreq <= 2) {
            this.setState({
                slowForwardClass: 'primary disbled'
            });
        }
    },

    render : function() {
        var spaceWidth = typeof this.props.estimoteLocation.spaceWidth === 'undefined' ? 0 : this.props.estimoteLocation.spaceWidth * 100;
        var spaceHeight = typeof this.props.estimoteLocation.spaceHeight === 'undefined' ? 0 : this.props.estimoteLocation.spaceHeight * 100;
        var finalPlayerPositions = this.state.finalPlayerPositions;

        if(finalPlayerPositions.length > 0 && typeof finalPlayerPositions[0] === 'undefined') {
            clearInterval(this._localVariables.interval);
        }

        var gameDate = this.props.game.gameDate ? this.props.game.gameDate : 'gameDate';
        gameDate = [gameDate.slice(0, 4), '/' , gameDate.slice(4, 6), '/', gameDate.slice(6)].join('');
        gameDate += ' - finished';

        return (
            <section className="live game">
                <section className="playerSheet">
                    <h3 className="kit number" ref="kitnumber">{ this.state.kitNumber }</h3>
                    <span className="name" ref="player">{ this.state.playerName }</span>
                    <span className="date">{gameDate}</span>
                </section>
                <div className="clearfix"></div>
                <Pitch width={spaceWidth} height={spaceHeight} pitchElements={finalPlayerPositions} />
                <button onClick={this._slowForward} className={'btn ' + this.state.slowForwardClass} value="fastForward">Fast forward * {this.state.intervalFreq / 2}</button>
                <button onClick={this._initWatching} className="btn primary" value={this.state.playStop}>{this.state.playStop}</button>
                <button onClick={this._fastForward} className={'btn ' + this.state.fastForwardClass} value="fastForward">Fast forward * {this.state.intervalFreq}</button>
                <div className="clearfix"></div>
            </section>
        );
    }
});

module.exports = PastGame;