'use strict';

var React = require('react'),
    gameStore = require('../../stores/gameStore.js'),
    gameActions  = require('../../actions/gameActions.js'),
    playerStore = require('../../stores/playerStore.js'),
    playerActions = require('../../actions/playerActions.js'),
    teamStore = require('../../stores/teamStore.js'),
    teamActions = require('../../actions/teamActions.js'),
    socket = require('socket.io-client')('http://localhost:3000');

var LiveGame = React.createClass({

    contextTypes: {
        history: React.PropTypes.object,
        location: React.PropTypes.object
    },

    getInitialState : function() {
        return ({
            context : null,
            players : [],
            teams : null,
            game : null
        });
    },

    componentWillMount : function() {
        gameStore.addChangeListener(this._onChange);
        playerStore.addChangeListener(this._onChange);
        teamStore.addChangeListener(this._onChange);
    },

    componentDidMount : function() {
        var query = this.context.location.pathname;
        var query = query.substr(12);

        gameActions.getGameRequest(query);

        socket.on('connect', function() {
            console.log("Connection with socket");
        });

        socket.on('gameId3', function(data) {
           console.log(data);
        });
    },

    componentWillUnmount: function() {
        gameStore.removeChangeListener(this._onChange);
        playerStore.removeChangeListener(this._onChange);
        teamStore.removeChangeListener(this._onChange);
    },

    _onChange : function() {
        this.setState({
            context : null,
            players : [],
            teams : null,
            game : gameStore.getSingleGame()
        });
    },

    render: function() {
        console.log(this.state);
        return(
            <div>
        	   <section className="live game">
            	   <h1>This is a live game.</h1>
				   <canvas ref="gameCanvas" id="gameCanvas" className="gameCanvas" width="1200" height="600"></canvas>
                </section>
            </div>
        );
    }
});

module.exports = LiveGame;