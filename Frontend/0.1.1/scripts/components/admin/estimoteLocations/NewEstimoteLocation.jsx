'use strict';

var React = require('react'),
    History = require('react-router').History,
    estimoteLocationActions = require('../../../actions/estimoteLocationActions.js'),
    estimoteLocationStore = require('../../../stores/estimoteLocationStore.js');

var NewEstimoteLocation = React.createClass({
    mixins : [History],

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
                <form onSubmit={this.submitHandler} className="new estimotelocation">
                    <label htmlFor="estimoteLocationId">Estimote Location ID</label>
                    <input id="estimoteLocationId" type="text" ref="estimoteLocationId" />
                    <label htmlFor="spaceWidth">Width of space in meters (eg. 7.45)</label>
                    <input id="spaceWidth" type="text" ref="spaceWidth" />
                    <label htmlFor="spaceHeight">Height of space in meters (eg. 7.23)</label>
                    <input id="spaceHeight" type="text" ref="spaceHeight" />
                    <input type="submit" value="Create Estimote" className="btn primary" />
                </form>
            </section>
        )
    }
});

module.exports = NewEstimoteLocation;