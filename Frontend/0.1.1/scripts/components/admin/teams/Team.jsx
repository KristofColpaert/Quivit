'use strict';

var React = require('react');

var Team = React.createClass({
    getInitialState : function() {
        return({
            team : this.props.team,
            counter : 0
        });
    },
    render : function() {
        return(
            <div key={this.state.team._id} className="card team">
                <p className="teamName">{this.state.team.name}</p>
                <div className="teamColor" style={ { 'background': this.state.team.primaryColor } }></div>
                <div className="teamColor" style={ { 'background': this.state.team.secondaryColor } }></div>
            </div>
        );
    }
});

module.exports = Team;