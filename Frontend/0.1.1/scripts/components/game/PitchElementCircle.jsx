'use strict';

var React = require('react');

var PitchElementCircle = React.createClass({
    render : function() {
        return (
            <g>
                <circle r={this.props.radius} cx={this.props.x} cy={this.props.y} fill={this.props.fillElement} />
                <text x={this.props.x} y={this.props.y + (this.props.fontSize / 3)} fontSize={this.props.fontSize} textAnchor="middle" fill={this.props.fillText} >{this.props.kitNumber}</text>
            </g>
        );
    }
});

module.exports = PitchElementCircle;