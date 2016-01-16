'use strict';

var React = require('react'),
    History = require('react-router').History,
    teamActions = require('../../../actions/teamActions.js'),
    teamStore = require('../../../stores/teamStore.js'),
    ColorPicker = require('react-color');

var NewTeam = React.createClass({
    mixins: [History],

    getInitialState: function() {
        return({
            name: false,
            canSubmit: false
        });
    },
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

    _checkTextInput: function(e) {
    if (e.target.value.length <= 0) {
        e.target.className = 'input error';
        this.state[e.target.name] = false;
        console.log(e.target.name + ' is ' + this.state[e.target.name]);
    } else {
        e.target.className = '';
        this.state[e.target.name] = true;
        console.log(e.target.name + ' is ' + this.state[e.target.name]);
    }
    if (this.state.name) {
        this.setState({
            canSubmit: true
        });
    } else {
        this.setState({
            canSubmit: false
        });
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

    render : function() {
        return(
            <section>
                <h2>New Team</h2>
                <form onSubmit={this.submitHandler} className="new team">
                    <label htmlFor="name">Team name</label>
                    <input onBlur={ this._checkTextInput } name="name" id="name" type="text" ref="name" />

                    <div className="col50 left">
                        <label htmlFor="primaryColor">Primary color</label>
                        <ColorPicker id="secondaryColor" type="chrome" ref="primaryColor" />
                    </div>
                    <div className="col50 right">
                        <label htmlFor="secondaryColor">Secondary color</label>
                        <ColorPicker id="primaryColor" type="chrome" ref="secondaryColor" />
                    </div>
                    <div className="clearfix"></div>
                    <button type="submit" disabled={ !this.state.canSubmit } className="btn primary">Create Team</button>
                </form>
            </section>
        );
    }
});

module.exports = NewTeam;