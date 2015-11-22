'use strict';

var React = require('react');

var Game = React.createClass({
    getStyles: function () {
        var c1 = this.props.colors[0],
            c2 = this.props.colors[1];
        return (
        {
            background: 'linear-gradient(90deg, ' + c1 + ' 10%, ' + c2 + ' 90%)'
        }
        )
    },
    render: function() {
        return(
            <div key={this.props.teams} className="card game">
                <span className="time passed">{this.props.timePassed}</span>
                <span className="score">{this.props.score}</span>
                <h3 className="teams" style={ this.getStyles() }>{this.props.teams}</h3>
            </div>
        );
    }
});

module.exports = Game;