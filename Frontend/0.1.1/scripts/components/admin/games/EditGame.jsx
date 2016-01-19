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
        this._localVariables.socket.on('data', function(data) {console.log(data)});
    },

    _addHome : function() {
        this._localVariables.socket.emit('home', 'add');

        var tempGame = gameStore.getSingleGame();
        tempGame.scoreHome = tempGame.scoreHome + 1;
        var tempTeams = teamStore.getHomeAwayTeams();
        this.setState({
            game : tempGame,
            teams : tempTeams
        });
    },

    _addAway : function() {
        this._localVariables.socket.emit('away', 'add');

        var tempGame = gameStore.getSingleGame();
        tempGame.scoreAway = tempGame.scoreAway + 1;
        var tempTeams = teamStore.getHomeAwayTeams();
        this.setState({
            game : tempGame,
            teams : tempTeams
        });
    },

    render : function() {
        var homeTeam = "Home";
        var awayTeam = "Away";
        var homeScore = typeof this.state.game.scoreHome === 'undefined' ? 0 : this.state.game.scoreHome;
        var awayScore = typeof this.state.game.scoreAway === 'undefined' ? 0 : this.state.game.scoreAway;

        if((typeof this.state.game._id !== 'undefined' && typeof this.state.teams[this.state.game._id] === 'object')) {
            homeTeam = this.state.teams[this.state.game._id].home.name;
            awayTeam = this.state.teams[this.state.game._id].away.name;
        }

        return (
            <section>
                <h2>{homeTeam + ' (' + homeScore + ') - (' + awayScore + ') ' + awayTeam}</h2>
                <button className="btn primary" onClick={this._addHome}>{homeTeam} scored</button>
                <button className="btn primary" onClick={this._addAway}>{awayTeam} scored</button>
            </section>
        );
    }
});

module.exports = EditGame;