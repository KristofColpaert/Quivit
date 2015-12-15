'use strict';

var React = require('react'),
    History = require('react-router').History,
    playerActions = require('../../../actions/playerActions.js'),
    playerStore = require('../../../stores/playerStore.js'),
    teamActions = require('../../../actions/teamActions.js'),
    teamStore = require('../../../stores/teamStore.js');

var NewPlayer = React.createClass({
    mixins : [History],

    getInitialState : function() {
        return({
            teams : teamStore.getAllTeams()
        });
    },

    componentWillMount : function() {
        teamStore.addChangeListener(this._onChange);
        playerStore.addChangeListener(this._onChange);
    },

    componentDidMount : function() {
        teamActions.getTeamsRequest();
    },

    componentWillUnmount : function() {
        teamStore.removeChangeListener(this._onChange);
        playerStore.removeChangeListener(this._onChange);
    },

    _onChange : function() {
        if(playerStore.isPlayerSaved()) {
            this.history.replaceState(null, 'admin/players');
            playerActions.falsifyIsPlayerSaved();
        }

        this.setState({
            teams : teamStore.getAllTeams()
        })
    },

    submitHandler : function(event) {
        event.preventDefault();

        var newPlayer = {
            firstName : this.refs.firstName.value,
            lastName : this.refs.lastName.value,
            kitNumber : this.refs.kitNumber.value,
            teamId : this.refs.team.value
        }

        playerActions.savePlayerRequest(newPlayer);
    },

    render : function() {
        return(
            <section className="new player">
                <h2>New Player</h2>
                <form onSubmit={this.submitHandler}>
                    <section className="col50 left">
                        <label htmlFor="firstName">First name</label>
                        <input id="firstName" type="text" ref="firstName" />

                        <label htmlFor="lastName">Last name</label>
                        <input id="lastName" type="text" ref="lastName" />
                    </section>
                    <section className="col50 right">
                        <label htmlFor="kitNumber">Kit number</label>
                        <input id="kitNumber" type="text" ref="kitNumber" />

                        <label htmlFor="team">Team</label>
                        <select id="team" ref="team">
                            {this.state.teams.map(function(team) {
                                return <option value={team._id} key={team._id}>{team.name}</option>
                            })}
                        </select>
                    </section>
                    <input className="btn primary" type="submit" value="Make" />
                </form>
            </section>
        );
    }
});

module.exports = NewPlayer;