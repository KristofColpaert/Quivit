'use strict';

var React = require('react'),
    Pitch = require('./Pitch.jsx'),
    PitchElementCircle = require('./PitchElementCircle.jsx'),
    constants = require('../../helpers/urlConstants.js');

var PastGame = React.createClass({

    _localVariables : {
        isSocketsInit : false,
        pageCount : 0,
        socket : null,
        playerPositions : {},
        interval : null
    },

    contextTypes: {
        history: React.PropTypes.object,
        location: React.PropTypes.object
    },

    getInitialState : function() {
        return({
            spaceWidth : this.props.estimoteLocation.spaceWidth === 'undefined' ? 0 : this.props.estimoteLocation.spaceWidth,
            spaceHeight : this.props.estimoteLocation.spaceHeight === 'undefined' ? 0 : this.props.estimoteLocation.spaceHeight,
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
            this._localVariables.isSocketsInit = true;
            this._initSockets();
        }
    },

    _initSockets : function() {
        var self = this;
        var gameId = this.props.game._id;
        var query = this.context.location.pathname;
        query = query.substr(14);

        if(query === gameId) {
            this.props.players['home'].forEach(function(player) {
                //Ask server to get room.
                self._localVariables.socket.emit('create', 'past' + gameId + player._id);
            });

            this.props.players['away'].forEach(function(player) {
                //Ask server to get room.
                self._localVariables.socket.emit('create', 'past' + gameId + player._id);
            });

            //Get data.
            this._localVariables.socket.on('data', function(data) {
                var tempPlayerPositions = self._localVariables.playerPositions;

                if(typeof tempPlayerPositions[data.playerId] === 'undefined'){
                    tempPlayerPositions[data.playerId] = [];
                }

                var playerPosition = <PitchElementCircle key={data.playerId} y={(data.x * (-100)) + (self.props.estimoteLocation.spaceWidth / 2)} x={(data.y * (-100)) + (self.props.estimoteLocation.spaceHeight / 2)} radius="15" fillElement="red" fillText="white" kitNumber={data.kitNumber} fontSize="16" />
                tempPlayerPositions[data.playerId].push(playerPosition);

                self._localVariables.playerPositions = tempPlayerPositions;
            });

            //Ask data for the first time.
            this._localVariables.socket.emit('more', self._localVariables.pageCount);

            //Init width and height.
            self.setState({
                spaceWidth : self.props.estimoteLocation.spaceWidth === 'undefined' ? 0 : self.props.estimoteLocation.spaceWidth,
                spaceHeight : self.props.estimoteLocation.spaceHeight === 'undefined' ? 0 : self.props.estimoteLocation.spaceHeight,
            });

            //Enable showing players.
            this._startShow();
        }
    },

    _startShow : function() {
        var self = this;

        this._localVariables.interval = setInterval(function() {
            console.log(self._localVariables.playerPositions);
        }, 20);
    },

    render : function() {
        return (
            <button onClick={this._initWatching} value="start" />
        );
    }
});

module.exports = PastGame;