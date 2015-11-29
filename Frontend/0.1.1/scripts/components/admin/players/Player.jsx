'use strict';

var React = require('react'),
    teamActions = require('../../../actions/teamActions.js'),
    teamStore = require('../../../stores/teamStore.js');

var Player = React.createClass({
    getInitialState : function() {
        return({
            player : this.props.player,
            team : teamStore.getSingleTeam()
        });
    },

    componentWillMount : function() {
        teamStore.addChangeListener(this._onChange);
    },

    componentDidMount : function() {
        teamActions.getTeamByIdRequest(this.state.player.teamId);
    },

    componentWillUnmount : function() {
        teamStore.removeChangeListener(this._onChange);
    },

    _onChange : function() {
        this.setState({
            player : this.props.player,
            team : teamStore.getSingleTeam()
        });
    },

    render : function() {
        return(
            <div key={this.state.player._id} className="card player">
                <p>{this.state.player.firstName + ' ' + this.state.player.lastName}</p>
                <p>{this.state.team.name}</p>
            </div>
        );
    }
});

module.exports = Player;