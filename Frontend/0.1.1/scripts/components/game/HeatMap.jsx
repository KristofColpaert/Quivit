'use strict';

var React = require('react'),
    gameStore = require('../../stores/gameStore.js'),
    gameActions  = require('../../actions/gameActions.js'),
    playerStore = require('../../stores/playerStore.js'),
    playerActions = require('../../actions/playerActions.js'),
    teamStore = require('../../stores/teamStore.js'),
    teamActions = require('../../actions/teamActions.js'),
    estimoteLocationStore = require('../../stores/estimoteLocationStore.js'),
    estimoteLocationActions = require('../../actions/estimoteLocationActions.js'),
    Pitch = require('./Pitch.jsx'),
    PitchElementRect = require('./PitchElementRect.jsx');

var HeatMap = React.createClass({

    contextTypes: {
        history: React.PropTypes.object,
        location: React.PropTypes.object
    },

    getInitialState : function() {
        return ({
            player : playerStore.getSinglePlayer(),
            game : gameStore.getSingleGame(),
            heatMap : gameStore.getPlayerGameHeatMap(),
            estimoteLocation : estimoteLocationStore.getSingleEstimoteLocation()
        });
    },

    componentWillMount : function() {
        gameStore.addChangeListener(this._onChange);
        playerStore.addChangeListener(this._onChange);
        estimoteLocationStore.addChangeListener(this._onChange);
    },

    componentDidMount : function() {
        //Query game and player
        var query = this.context.location.pathname;
        query = query.substr(9);
        var queryParts = query.split('/');
        var gameId = queryParts[0];
        var playerId = queryParts[1];

        gameActions.getGameRequest(gameId);
        playerActions.getPlayerByIdRequest(playerId);
        gameActions.getPlayerGameHeatMapRequest(gameId, playerId);
    },

    componentWillUnmount : function() {
        gameStore.removeChangeListener(this._onChange);
        playerStore.removeChangeListener(this._onChange);
        estimoteLocationStore.removeChangeListener(this._onChange);
    },

    _onChange : function() {
        this.setState({
            player : playerStore.getSinglePlayer(),
            game : gameStore.getSingleGame(),
            heatMap : gameStore.getPlayerGameHeatMap(),
            estimoteLocation : estimoteLocationStore.getSingleEstimoteLocation(),
            teams : teamStore.getHomeAwayTeams()
        });

        if((typeof this.state.estimoteLocation._id === 'undefined') && (typeof this.state.game._id !== 'undefined')){
            teamActions.getTeamHomeAwayByidRequest(this.state.game.teamHomeId, this.state.game.teamAwayId, this.state.game._id);
            estimoteLocationActions.getEstimoteLocationByEstimoteLocationIdRequest(this.state.game.estimoteLocationId);
        }
    },

    render : function() {
        var spaceWidth = typeof this.state.estimoteLocation.spaceWidth === 'undefined' ? 0 : (this.state.estimoteLocation.spaceWidth * 100);
        var spaceHeight = typeof this.state.estimoteLocation.spaceHeight === 'undefined' ? 0 : (this.state.estimoteLocation.spaceHeight * 100);
        var finalHeatMapPositions = [];

        var counter = 100;
        this.state.heatMap.forEach(function(heatMapObject) {
            var minX = (heatMapObject.minX * (-100)) + (spaceWidth / 2) - (spaceWidth / 10);
            var minY = (heatMapObject.minY * (-100)) + (spaceHeight / 2) - (spaceHeight / 10);

            var heatMapPosition = <PitchElementRect key={minX + ' ' + minY} x={minX} y={minY} width={spaceWidth / 10} height={spaceHeight / 10} fill={'hsla(' + counter + ', 85%, 70%, 0.65)'} />;
            finalHeatMapPositions.push(heatMapPosition);
            counter--;
        });

        var headerText = this.state.player.firstName + ' ' + this.state.player.lastName;
        var gameDateText = '';
        if(this.state.game.gameDate) {
            var gameDateYear = this.state.game.gameDate.substr(0, 4);
            var gameDateMonth = this.state.game.gameDate.substr(4, 2);
            var gameDateDay = this.state.game.gameDate.substr(6, 2);
            gameDateText = gameDateYear + '/' + gameDateMonth + '/' + gameDateDay;
        }

        var homeTeam = "Home";
        var awayTeam = "Away";
        if(this.state.teams) {
            if((typeof this.state.game._id !== 'undefined' && typeof this.state.teams[this.state.game._id] === 'object')) {
                homeTeam = this.state.teams[this.state.game._id].home.name;
                awayTeam = this.state.teams[this.state.game._id].away.name;
            }
        }

        return (
            <section className="live game">
                <h2>Heat map {headerText} - {homeTeam + ' (' + this.state.game.scoreHome + ')'} vs {awayTeam + ' (' + this.state.game.scoreAway + ')'}</h2>
                <h3>{gameDateText} - finished</h3>
                <Pitch width={spaceWidth} height={spaceHeight} pitchElements={finalHeatMapPositions} />
            </section>
        );
    }
});

module.exports = HeatMap;