'use strict';

var React = require('react'),
    Pitch = require('./Pitch.jsx'),
    PitchElementCircle = require('./PitchElementCircle.jsx'),
    playerStore = require('../../stores/playerStore.js'),
    constants = require('../../helpers/urlConstants.js'),
    offlineActions = require('../../actions/offlineActions.js'),
    offlineHelper = require('../../helpers/offlineHelper.js'),
    offlineStore = require('../../stores/offlineStore.js'),
    FontAwesome = require('react-fontawesome');

var PastGame = React.createClass({

    _localVariables: {
        isSocketsInit: false,
        pageCount: 0,
        socket: null,
        playerPositions: {},
        interval: null,
        isInterval: false,
        isUserOnline : true,
        arrivedOnPage : true
    },

    contextTypes: {
        history: React.PropTypes.object,
        location: React.PropTypes.object
    },

    getInitialState : function() {
        this._localVariables.arrivedOnPage = true;
        return({
            players: playerStore.getHomeAwayPlayers(),
            kitNumber: 'X',
            playerName: 'player',
            currentPlayer: null,
            finalPlayerPositions: [],
            playStop: 'Play',
            intervalFreq: 2,
            fastForwardClass: 'primary',
            slowForwardClass: 'primary disabled',
            sync : 'none'
        });
    },

    componentWillMount : function() {
        offlineStore.addChangeListener(this._onChange);
    },

    componentDidMount : function() {
        var self = this;
        offlineHelper.isOnline(function(online) {
            self._localVariables.isUserOnline = online;

            if(self._localVariables.isUserOnline) {
                self._localVariables.playerPositions = {};
                self._localVariables.isSocketsInit = false;
                self._localVariables.socket = require('socket.io-client')(constants.socketsUrl, {forceNew : true});
            }

            else {
                self._localVariables.playerPositions = {};
                self._localVariables.isSocketsInit = false;
            }
        });
    },

    componentWillUnmount : function() {
        offlineStore.removeChangeListener(this._onChange);
        this._localVariables.playerPositions = {};
        if(this._localVariables.interval !== null) {
            clearInterval(this._localVariables.interval);
            this._localVariables.arrivedOnPage = false;
        }

        this._localVariables.isSocketsInit = false;

        if(this._localVariables.isUserOnline){
            this._localVariables.socket.emit('goaway', 'disconnect');
        }

        this.setState({
            sync : 'none'
        });
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
            });

            if(this._localVariables.isUserOnline) {
                this._localVariables.isSocketsInit = true;
                this._initSockets();
            }

            else {
                this._localVariables.isSocketsInit = true;
                this._initLocal();
            }
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

    _initLocal : function() {
        var self = this;
        var gameId = this.props.game._id;
        var query = this.context.location.pathname;
        query = query.substr(14);

        if(query === gameId) {
            this.props.players['home'].forEach(function(player) {
                offlineActions.offlineGetPlayerPositionsRequest(self.props.game._id, player._id);
            });

            this.props.players['away'].forEach(function(player) {
                offlineActions.offlineGetPlayerPositionsRequest(self.props.game._id, player._id);
            });
        }
    },

    _onChange : function() {
        var self = this;
        var tempPlayerPositions = offlineStore.getPlayerPositions();
        var tempFinalPlayerPositions = {};
        var homeCount = this.props.players['home'].length;
        var awayCount = this.props.players['away'].length;

        if(this.state.playStop === 'Stop') {
            if(this._localVariables.arrivedOnPage) {
                if(Object.keys(tempPlayerPositions).length === homeCount + awayCount &&
                    Object.keys(tempPlayerPositions).length > 0) {
                    this._localVariables.arrivedOnPage = false;
                    Object.keys(tempPlayerPositions).forEach(function(tempPlayerPosition) {
                        tempPlayerPositions[tempPlayerPosition].forEach(function(tempPos) {
                            if(typeof tempFinalPlayerPositions[tempPos.playerId] === 'undefined'){
                                tempFinalPlayerPositions[tempPos.playerId] = [];
                            }

                            var player = self._getPlayer( tempPos.playerId ),
                                playerPosition = <PitchElementCircle
                                    key = {tempPos.playerId}
                                    handleClick = { self._playerClicked.bind( null, player ) }
                                    y = {(tempPos.x * (-100)) + ((self.props.estimoteLocation.spaceWidth * 100) / 2)}
                                    x = {(tempPos.y * (-100)) + ((self.props.estimoteLocation.spaceHeight * 100) / 2)}
                                    radius = '15'
                                    fillElement = 'rgb(170,170,170)'
                                    fillText = 'white'
                                    fontSize = '16' />
                            tempFinalPlayerPositions[tempPos.playerId].push(playerPosition);
                        });
                    });
                    self._localVariables.playerPositions = tempFinalPlayerPositions;

                    //Enable showing players
                    this._startShow();
                }
            }
        }

        if(offlineStore.getIsGameSaved() &&
            offlineStore.getIsEstimoteLocationSaved() &&
            offlineStore.getTeamsSavedCount() === 2 &&
            offlineStore.getPlayersSavedCount() === (homeCount + awayCount) &&
            offlineStore.getPlayerPositionsSavedCount() === (homeCount + awayCount)){
            this.setState({
                sync : 'done'
            });
        }
    },

    _startShow : function(interval) {
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
        if(this.state.playStop === 'Stop'){
            if(this.state.intervalFreq < 16) {
                this._stopShow();
                this._startShow(200 / this.state.intervalFreq);
                this.setState({
                    intervalFreq : this.state.intervalFreq * 2,
                    slowForwardClass : 'primary',
                });
            }

            if(this.state.intervalFreq >= 16) {
                this.setState({
                    fastForwardClass: 'primary disabled',
                });
            }
        }
    },

    _slowForward : function() {
        if(this.state.playStop === 'Stop') {
            if(this.state.intervalFreq > 2) {
                this._stopShow();
                this._startShow(200 / (this.state.intervalFreq / 4));
                this.setState({
                    intervalFreq : this.state.intervalFreq / 2,
                    fastForwardClass : 'primary',
                });
            }

            if(this.state.intervalFreq <= 2) {
                console.log('hier');
                this.setState({
                    slowForwardClass: 'primary disabled',
                });
            }
        }
    },

    _saveOffline : function() {
        if(this.state.sync === 'none') {
            this.setState({
                sync : 'syncing'
            });

            //Make game offline available
            offlineActions.offlineSaveGameRequest(this.props.game._id);

            //Make teams offline available
            var tempTeams = this.props.teams[this.props.game._id];
            offlineActions.offlineSaveTeamRequest(tempTeams.home._id);
            offlineActions.offlineSaveTeamRequest(tempTeams.away._id);

            //Make player positions offline available
            for (var i = this.state.players.home.length - 1; i >= 0; i--) {
                offlineActions.offlineSavePlayerPositionsRequest(this.props.game._id, this.state.players.home[i]._id);
                offlineActions.offlineSavePlayerRequest(this.state.players.home[i]._id);
            }

            for (var i = this.state.players.away.length - 1; i >= 0; i--) {
                offlineActions.offlineSavePlayerPositionsRequest(this.props.game._id, this.state.players.away[i]._id);
                offlineActions.offlineSavePlayerRequest(this.state.players.away[i]._id);
            }

            //Make estimote locations offline available
            offlineActions.offlineSaveEstimoteLocationRequest(this.props.estimoteLocation._id);
        }
    },

    render : function() {
        var spaceWidth = typeof this.props.estimoteLocation.spaceWidth === 'undefined' ? 0 : this.props.estimoteLocation.spaceWidth * 100;
        var spaceHeight = typeof this.props.estimoteLocation.spaceHeight === 'undefined' ? 0 : this.props.estimoteLocation.spaceHeight * 100;
        var finalPlayerPositions = this.state.finalPlayerPositions;

        var finished = null;
        if(finalPlayerPositions.length > 0 && typeof finalPlayerPositions[0] === 'undefined') {
            clearInterval(this._localVariables.interval);
            this._localVariables.isSocketsInit = false;
            finished = 'Finished';
        }
        var playText = finished ? finished : this.state.playStop;

        var gameDate = this.props.game.gameDate ? this.props.game.gameDate : 'gameDate';
        gameDate = [gameDate.slice(0, 4), '/' , gameDate.slice(4, 6), '/', gameDate.slice(6)].join('');
        gameDate += ' - finished';

        var makeOfflineHidden = '';
        if(!this._localVariables.isUserOnline) {
            makeOfflineHidden = 'hidden';
        }

        //Syncing
        var buttons = [
            <button key="slowForward" onClick={this._slowForward} className={'btn ' + this.state.slowForwardClass} value="slowForward">Slow forward * {this.state.intervalFreq / 2}</button>,
            <button key="play" onClick={this._initWatching} className="btn primary" value={this.state.playStop}>{playText}</button>,
            <button key="fastForward" onClick={this._fastForward} className={'btn ' + this.state.fastForwardClass} value="fastForward">Fast forward * {this.state.intervalFreq}</button>,
        ];

        if(this.state.sync === 'none') {
            buttons.push(<button key="sync" onClick={this._saveOffline} className={'btn primary ' + makeOfflineHidden} value="makeOffline">Make offline</button>);
        }

        else if(this.state.sync === 'syncing') {
            buttons.push(<button key="sync" onClick={this._saveOffline} className={'btn primary ' + makeOfflineHidden} value="makeOffline"><FontAwesome name="cog" spin /> Syncing</button>);
        }

        else if(this.state.sync === 'done') {
            buttons.push(<button key="sync" onClick={this._saveOffline} className={'btn primary disabled ' + makeOfflineHidden} value="makeOffline"><FontAwesome name="check" /> Done</button>);
        }

        //Team names
        var homeTeam = "Home";
        var awayTeam = "Away";
        if((typeof this.props.game._id !== 'undefined' && typeof this.props.teams[this.props.game._id] === 'object')) {
            homeTeam = this.props.teams[this.props.game._id].home.name + ' (' + this.props.game.scoreHome + ')';
            awayTeam = this.props.teams[this.props.game._id].away.name + ' (' + this.props.game.scoreAway + ')';
        }

        return (
            <section className="live game">
                <section className="playerSheet">
                    <h3 className="kit number" ref="kitnumber">{ this.state.kitNumber }</h3>
                    <span className="name" ref="player">{ this.state.playerName }</span>
                    <span className="date">{gameDate}</span>
                </section>
                <div className="clearfix"></div>
                <Pitch width={spaceWidth} height={spaceHeight} pitchElements={finalPlayerPositions} />
                <h2 className="team home">{homeTeam}</h2><h2 className="team away">{awayTeam}</h2>
                {buttons.map(function(button) {
                    return button;
                })}
                <div className="clearfix"></div>
            </section>
        );
    }
});

module.exports = PastGame;