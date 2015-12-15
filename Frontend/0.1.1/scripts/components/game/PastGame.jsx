'use strict';

var React = require('react'),
    Pitch = require('./Pitch.jsx'),
    PitchElementCircle = require('./PitchElementCircle.jsx');


var PastGame = React.createClass({

    contextTypes: {
        history: React.PropTypes.object,
        location: React.PropTypes.object
    },

    getInitialState : function() {
        return({
            game : this.props.game,
            teams: this.props.teams,
            players: this.props.players,
            estimoteLocation : this.props.estimoteLocation,
            playerPositions : {}
        });
    },

    render : function() {

    }
});

module.exports = PastGame;