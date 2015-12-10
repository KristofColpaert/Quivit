'use strict';

var React = require('react'),
    History = require('react-router').History,
    teamActions = require('../../../actions/teamActions.js'),
    teamStore = require('../../../stores/teamStore.js'),
    ColorPicker = require('react-color');

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
            teamActions.falsifyIsTeamSaved();
        }
    },

    submitHandler : function(event) {
        event.preventDefault();

        var newTeam = {
            name : this.refs.name.value,
            primaryColor: '#' + this.refs.primaryColor.state.hex,
            secondaryColor: '#' + this.refs.secondaryColor.state.hex
        };

        teamActions.saveTeamRequest(newTeam);
    },

    // <input id="secondaryColor" type="text" ref="secondaryColor" />
    render : function() {
        return(
            <section>
                <h2>New Team</h2>
                <form onSubmit={this.submitHandler} className="new team">
                    <label htmlFor="name">Team name</label>
                    <input id="name" type="text" ref="name" />

                    <div className="col50 left">
                        <label htmlFor="primaryColor">Primary color</label>
                        <ColorPicker id="secondaryColor" type="chrome" ref="primaryColor" />
                    </div>
                    <div className="col50 right">
                        <label htmlFor="secondaryColor">Secondary color</label>
                        <ColorPicker id="primaryColor" type="chrome" ref="secondaryColor" />
                    </div>
                    <div className="clearfix"></div>
                    <input type="submit" value="Create Team" className="btn primary" />
                </form>
            </section>
        );
    }
});

module.exports = NewTeam;