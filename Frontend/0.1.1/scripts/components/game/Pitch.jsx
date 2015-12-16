'use strict';

var React = require('react');

var Pitch = React.createClass({
    render : function() {
        return (
            <svg className="pitch" width={this.props.width} height={this.props.height}>
                <rect width={this.props.width} height={this.props.height} fill="#B7E5B6" />
                <rect width="15" height={this.props.height} fill="#FFFFFF" x={(this.props.width / 2) - 7} y="0" />
                <circle cx={this.props.width / 2} cy={this.props.height / 2} r={this.props.width / 10} fill="#B7E5B6" style={{ stroke : '#FFFFFF', strokeWidth : 15}} />
                <line x1="50" x2="50" y1={this.props.height - (this.props.height / 4)} y2={this.props.height - ((this.props.height / 4) * 3)} style={{ stroke : '#FFFFFF', strokeWidth : 15}} />
                <line x1="0" x2="50" y1={this.props.height - (this.props.height / 4) - 7} y2={this.props.height - (this.props.height / 4) - 7} style={{ stroke : '#FFFFFF', strokeWidth : 15}} />
                <line x1="0" x2="50" y1={this.props.height - ((this.props.height / 4) * 3) + 7} y2={this.props.height - ((this.props.height / 4) * 3) + 7} style={{ stroke : '#FFFFFF', strokeWidth : 15}} />

                <line x1={this.props.width - 50} x2={this.props.width - 50} y1={this.props.height - (this.props.height / 4)} y2={this.props.height - ((this.props.height / 4) *3)} style={{ stroke : '#FFFFFF', strokeWidth : 15}} />
                <line x1={this.props.width - 50} x2={this.props.width} y1={this.props.height - (this.props.height / 4) - 7} y2={this.props.height - (this.props.height / 4) - 7} style={{ stroke : '#FFFFFF', strokeWidth : 15}} />
                <line x1={this.props.width - 50} x2={this.props.width} y1={this.props.height - ((this.props.height / 4) * 3) + 7} y2={this.props.height - ((this.props.height / 4) * 3) + 7} style={{ stroke : '#FFFFFF', strokeWidth : 15}} />

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