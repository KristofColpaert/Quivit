'use strict';

var React = require('react');

var Pitch = React.createClass({
    render : function() {
        return (
            <svg width={this.props.width} height={this.props.height}>
                {this.props.pitchElements.map(function(pitchElement) {
                    return(
                        pitchElement
                    );
                })}
            </svg>
        );
    }
});

module.exports = Pitch;