'use strict';

var React = require('react');

var Game = React.createClass({
    render: function() {
        return(
            <div key={this.props.teams} className="card game">
                <span className="time passed">{this.props.timePassed}</span>
                <span className="score">{this.props.score}</span>
                <h3 className="teams">{this.props.teams}</h3>
            </div>
        );
    }
});

module.exports = Game;