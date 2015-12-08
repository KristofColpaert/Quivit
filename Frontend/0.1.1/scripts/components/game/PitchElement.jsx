'use strict';

var React = require('react');

var PitchElement = React.createClass({
    render : function() {
        return <circle r={this.props.radius} cx={this.props.x} cy={this.props.y} fill={this.props.fill} />
    }
});

module.exports = PitchElement;