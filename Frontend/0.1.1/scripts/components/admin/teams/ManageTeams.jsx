'use strict';

var React = require('react'),
    Team = require('./Team.jsx'),
    Link = require('react-router').Link;

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
                <Link className="card team new" to="/admin/teams/new"></Link>
            </section>
        );
    }
});

module.exports = ManageTeams;