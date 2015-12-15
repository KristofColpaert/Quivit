'use strict';

var React = require('react'),
    gameStore = require('../../stores/gameStore.js'),
    gameActions  = require('../../actions/gameActions.js'),
    playerStore = require('../../stores/playerStore.js'),
    playerActions = require('../../actions/playerActions.js'),
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
            estimoteLocation : estimoteLocationStore.getSingleEstimoteLocation()
        });

        if((typeof this.state.estimoteLocation._id === 'undefined') && (typeof this.state.game._id !== 'undefined')){
            estimoteLocationActions.getEstimoteLocationByEstimoteLocationIdRequest(this.state.game.estimoteLocationId);
        }
    },

    _getColor : function() {

    },

    render : function() {
        var spaceWidth = typeof this.state.estimoteLocation.spaceWidth === 'undefined' ? 0 : (this.state.estimoteLocation.spaceWidth * 100);
        var spaceHeight = typeof this.state.estimoteLocation.spaceHeight === 'undefined' ? 0 : (this.state.estimoteLocation.spaceHeight * 100);
        var finalHeatMapPositions = [];

        var counter = 100;
        this.state.heatMap.forEach(function(heatMapObject) {
            var minX = (heatMapObject.minX * (-100)) + (spaceWidth / 2) - (spaceWidth / 10);
            var minY = (heatMapObject.minY * (-100)) + (spaceHeight / 2) - (spaceHeight / 10);

            var heatMapPosition = <PitchElementRect key={minX + ' ' + minY} x={minX} y={minY} width={spaceWidth / 10} height={spaceHeight / 10} fill={'hsla(' + counter + ', 85%, 70%, 1)'} />;
            finalHeatMapPositions.push(heatMapPosition);
            counter--;
        });

        var headerText = this.state.player.firstName + ' ' + this.state.player.lastName;

        console.log(this.state.player);

        return (
            <section className="live game">
                <h2>{headerText}</h2>
                <Pitch width={spaceWidth} height={spaceHeight} pitchElements={finalHeatMapPositions} />
            </section>
        );
    }
});

module.exports = HeatMap;