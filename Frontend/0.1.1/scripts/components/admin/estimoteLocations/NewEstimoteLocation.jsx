'use strict';

var React = require('react'),
    History = require('react-router').History,
    estimoteLocationActions = require('../../../actions/estimoteLocationActions.js'),
    estimoteLocationStore = require('../../../stores/estimoteLocationStore.js');

var NewEstimoteLocation = React.createClass({
    mixins : [History],

    getInitialState : function() {
        return({
            estimoteLocationId: false,
            spaceWidth: false,
            spaceHeight: false,
            canSubmit: false
        });
    },

    componentWillMount : function() {
        estimoteLocationStore.addChangeListener(this._onChange);
    },

    componentWillUnmount : function() {
        estimoteLocationStore.removeChangeListener(this._onChange);
    },

    _onChange : function() {
        if(estimoteLocationStore.isEstimoteLocationSaved()) {
            this.history.replaceState(null, '/admin/estimotelocations');
            estimoteLocationActions.falsifyIsEstimoteLocationSaved();
        }
    },

    _checkTextInput : function(e) {
        var value = e.target.value;
        if(value.length <= 0) {
            e.target.className = 'input error';
            this.state[e.target.id] = false;
        }
        else {
            e.target.className = '';
            this.state[e.target.id] = true;
        }

        if(e.target.id === 'spaceWidth' || e.target.id === 'spaceHeight') {
            if(isNaN(value) || value.length <= 0) {
                e.target.className = 'input error';
                this.state[e.target.id] = false;
            }
            else {
                e.target.className = '';
                this.state[e.target.id] = true;
            }
        }

        if (this.state.estimoteLocationId && this.state.spaceWidth && this.state.spaceHeight) {
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

        var newEstimoteLocation = {
            estimoteLocationId : this.refs.estimoteLocationId.value,
            spaceWidth : this.refs.spaceWidth.value,
            spaceHeight : this.refs.spaceHeight.value
        };

        estimoteLocationActions.saveEstimoteLocationRequest(newEstimoteLocation);
    },

    render : function() {
        return(
            <section>
                <h2>New Estimote Location</h2>
                <form onSubmit={this.submitHandler} className="new estimoteLocation">
                    <section className="col50 left">
                        <label htmlFor="estimoteLocationId">Estimote Location ID</label>
                        <input id="estimoteLocationId" type="text" ref="estimoteLocationId" className="input error" onChange={this._checkTextInput} />
                        <label htmlFor="spaceWidth">Width of space in meters (eg. 7.45)</label>
                        <input id="spaceWidth" type="text" ref="spaceWidth" className="input error" onChange={this._checkTextInput} />
                    </section>

                    <section className="col50 right">
                        <label htmlFor="spaceHeight">Height of space in meters (eg. 7.23)</label>
                        <input id="spaceHeight" type="text" ref="spaceHeight" className="input error" onChange={this._checkTextInput} />
                    </section>
                    <div className="clearfix"></div>
                    <input type="submit" value="Create Estimote" className="btn primary" disabled={!this.state.canSubmit} />
                </form>
            </section>
        )
    }
});

module.exports = NewEstimoteLocation;