'use strict';

var React = require('react'),
    teamActions = require('../../../actions/teamActions.js'),
    teamStore = require('../../../stores/teamStore.js');

var Player = React.createClass({
    getInitialState : function() {
        return({
            player : this.props.player,
            team : teamStore.getSingleTeam(this.props.player._id)
        });
    },

    componentWillMount : function() {
        teamStore.addChangeListener(this._onChange);
    },

    componentDidMount : function() {
        teamActions.getTeamOfPlayerByIdRequest(this.state.player.teamId, this.state.player._id);
    },

    componentWillUnmount : function() {
        teamStore.removeChangeListener(this._onChange);
    },

    _onChange : function() {
        this.setState({
            player : this.props.player,
            team : teamStore.getSingleTeam(this.props.player._id)
        });
    },

    render : function() {
        var teamName = '';
        if(this.state.team) {
            teamName = this.state.team.name;
        }

        return(
            <div key={this.state.player._id} className="card player">
                <p>{this.state.player.firstName + ' ' + this.state.player.lastName}</p>
                <p>{teamName}</p>
            </div>
        );
    }
});

module.exports = Player;