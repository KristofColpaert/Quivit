'use strict';

var React = require('react');

var Game = React.createClass({
    render: function() {
        return(
            <div key={this.props.teams} className="card game">
                <img src="./images/game.jpg" className="game-image"/>
                <span className="score">{this.props.score}</span>
                <span className="time passed">{this.props.timePassed}</span>
                <h3 className="teams">{this.props.teams}</h3>
            </div>
        );
    }
});

module.exports = Game;