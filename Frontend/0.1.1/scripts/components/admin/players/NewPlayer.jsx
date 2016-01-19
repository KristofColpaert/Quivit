'use strict';

var React = require('react'),
    History = require('react-router').History,
    playerActions = require('../../../actions/playerActions.js'),
    playerStore = require('../../../stores/playerStore.js'),
    teamActions = require('../../../actions/teamActions.js'),
    teamStore = require('../../../stores/teamStore.js');


var NewPlayer = React.createClass({
    mixins: [History],

    getInitialState : function() {
        return({
            teams: teamStore.getAllTeams(),
            fname: false,
            lname: false,
            knumber: false,
            canSubmit: false
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

    _checkTextInput: function(e) {
        if (e.target.value.length <= 0) {
            e.target.className = 'input error';
            this.state[e.target.name] = false;
        } else {
            e.target.className = '';
            this.state[e.target.name] = true;
        }

        if(e.target.id === 'kitNumber') {
            if(isNaN(e.target.value) || e.target.value.length <= 0){
                e.target.className = 'input error';
                this.state[e.target.name] = false;
            }
            else {
                e.target.className = '';
                this.state[e.target.name] = true;
            }
        }

        if (this.state.fname && this.state.lname && this.state.knumber) {
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
        // event.preventDefault();

        var newPlayer = {
            firstName : this.refs.firstName.value,
            lastName : this.refs.lastName.value,
            kitNumber : this.refs.kitNumber.value,
            teamId : this.refs.team.value
        }
        console.log(newPlayer);
        // playerActions.savePlayerRequest(newPlayer);
    },

    render : function() {
        return(
            <section className="new player">
                <h2>New Player</h2>
                <form onSubmit={this.submitHandler}>
                    <section className="col50 left">
                        <label htmlFor="firstName" required>First name</label>
                        <input
                            onBlur = { this._checkTextInput }
                            name="fname"
                            id="firstName"
                            type="text"
                            ref="firstName"
                            className="input error"/>
                        <label htmlFor="lastName">Last name</label>
                        <input
                            onBlur = { this._checkTextInput }
                            name="lname"
                            id="lastName"
                            ref="lastName"
                            type="text"
                            className="input error"/>
                    </section>
                    <section className="col50 right">
                        <label htmlFor="kitNumber">Kit number</label>
                        <input
                            onBlur = { this._checkTextInput }
                            name="knumber"
                            id="kitNumber"
                            type="text"
                            ref="kitNumber"
                            className="input error"/>

                        <label htmlFor="team">Team</label>
                        <select id="team" ref="team">
                            {this.state.teams.map(function(team) {
                                return <option value={team._id} key={team._id}>{team.name}</option>
                            })}
                        </select>
                    </section>
                    <div className="clearfix"></div>
                    <button className="btn primary" disabled={ !this.state.canSubmit } type="submit">Make</button>
                </form>
            </section>
        );
    }
});

module.exports = NewPlayer;