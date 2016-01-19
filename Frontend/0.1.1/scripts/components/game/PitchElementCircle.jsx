'use strict';

var React = require('react');

var PitchElementCircle = React.createClass({
    render : function() {
        return (
            <g onClick={ this.props.handleClick }>
                <circle r={this.props.radius} cx={this.props.x} cy={this.props.y} strokeWidth="4" stroke={ this.props.strokeElement } fill={this.props.fillElement} />
            </g>
        );
    }
});

module.exports = PitchElementCircle;