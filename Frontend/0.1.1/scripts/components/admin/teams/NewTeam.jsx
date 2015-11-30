'use strict';

var React = require('react'),
    History = require('react-router').History,
    teamActions = require('../../../actions/teamActions.js'),
    teamStore = require('../../../stores/teamStore.js');

var NewTeam = React.createClass({
    mixins: [History],

    componentWillMount : function() {
        teamStore.addChangeListener(this._onChange);
    },

    componentWillUnmount : function() {
        teamStore.removeChangeListener(this._onChange);
    },

    _onChange : function() {
        if(teamStore.isTeamSaved()) {
            this.history.replaceState(null, '/admin/teams');
        }
    },

    submitHandler : function(event) {
        event.preventDefault();

        var newTeam = {
            name : this.refs.name.value,
            primaryColor : this.refs.primaryColor.value,
            secondaryColor : this.refs.secondaryColor.value
        };

        teamActions.saveTeamRequest(newTeam);
    },

    render : function() {
        return(
            <section>
                <h2>New Team</h2>
                <form onSubmit={this.submitHandler}>
                    <label htmlFor="name">Team name</label>
                    <input id="name" type="text" ref="name" />

                    <label htmlFor="primaryColor">Primary color (ex. #FFFFFF)</label>
                    <input id="primaryColor" type="text" ref="primaryColor" />

                    <label htmlFor="secondaryColor">Secondary color (ex. #FFFFFF)</label>
                    <input id="secondaryColor" type="text" ref="secondaryColor" />

                    <input type="submit" value="Make" />
                </form>
            </section>
        );
    }
});

module.exports = NewTeam;