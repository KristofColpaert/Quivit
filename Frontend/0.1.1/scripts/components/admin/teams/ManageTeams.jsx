'use strict';

var React = require('react'),
    Team = require('./Team.jsx');

var ManageTeams = React.createClass({
    render : function(){
        return(
            <section className="teams">
                <h2>{this.props.title}</h2>
                {this.props.teams.map(function(team) {
                    return (
                        <Team key={team._id} team={team} />
                    );
                })}
            </section>
        );
    }
});

module.exports = ManageTeams;