'use strict';

var React = require('react');

var Pitch = React.createClass({
    render : function() {
        return (
            <svg className="pitch" width={this.props.width} height={this.props.height}>
                <rect width={this.props.width} height={this.props.height} fill="#B7E5B6" />
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