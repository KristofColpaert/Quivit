'use strict';

var React = require('react'),
    History = require('react-router').History,
    constants = require('../../../helpers/urlConstants.js'),
    gameActions = require('../../../actions/gameActions.js'),
    gameStore = require('../../../stores/gameStore.js'),
    teamActions = require('../../../actions/teamActions.js'),
    teamStore = require('../../../stores/teamStore.js');

var EditGame = React.createClass({
    mixins : [History],

    contextTypes: {
        history: React.PropTypes.object,
        location: React.PropTypes.object
    },

    _localVariables : {
        isSocketsInit : false,
        socket : null
    },

    getInitialState : function() {
        return({
            game : gameStore.getSingleGame(),
            teams : teamStore.getHomeAwayTeams()
        });
    },

    componentWillMount : function() {
        gameStore.addChangeListener(this._onChange);
        teamStore.addChangeListener(this._onChange);
    },

    componentDidMount : function() {
        this._localVariables.isSocketsInit = false;
        this._localVariables.socket = require('socket.io-client')(constants.socketsUrl, {forceNew : true});

        var query = this.context.location.pathname;
        query = query.substr(18);
        gameActions.getGameRequest(query);
    },

    componentWillUnmount : function() {
        gameStore.removeChangeListener(this._onChange);
        teamStore.removeChangeListener(this._onChange);

        this._localVariables.isSocketsInit = false;
        this._localVariables.socket.emit('goaway', 'disconnect');
    },

    _onChange : function() {
        this.setState({
            game : gameStore.getSingleGame(),
            teams : teamStore.getHomeAwayTeams(),
        });

        var query = this.context.location.pathname;
        query = query.substr(18);

        if(typeof this.state.game._id !== 'undefined') {
            if(query === this.state.game._id && !this._localVariables.isSocketsInit){
                this._initSockets();
            }
        }

        if((typeof this.state.teams[this.state.game._id] !== 'object') && (typeof this.state.game._id !== 'undefined')) {
            teamActions.getTeamHomeAwayByidRequest(this.state.game.teamHomeId, this.state.game.teamAwayId, this.state.game._id);
        }
    },

    _initSockets : function() {
        var gameId = this.state.game._id;
        this._localVariables.isSocketsInit = true;

        this._localVariables.socket.emit('createManage', 'live' + gameId);
    },

    _addHome : function() {
        this._localVariables.socket.emit('home', 'add');
    },

    _addAway : function() {
        this._localVariables.socket.emit('away', 'add');
    },

    render : function() {
        var homeTeam = "Home";
        var awayTeam = "Away";
        if((typeof this.state.game._id !== 'undefined' && typeof this.state.teams[this.state.game._id] === 'object')) {
            homeTeam = this.state.teams[this.state.game._id].home.name;
            awayTeam = this.state.teams[this.state.game._id].away.name;
        }
        return (
            <section>
                <h2>{homeTeam + ' - ' + awayTeam}</h2>
                <button onClick={this._addHome}>Home scored</button>
                <button onClick={this._addAway}>Away scored</button>
            </section>
        );
    }
});

module.exports = EditGame;