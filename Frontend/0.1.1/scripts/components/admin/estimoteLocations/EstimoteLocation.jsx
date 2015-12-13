'use strict';

var React = require('react');

var EstimoteLocation = React.createClass({
    getInitialState : function() {
        return({
            estimoteLocation : this.props.estimoteLocation
        });
    },

    render : function() {
        return(
            <div key={this.state.estimoteLocation._id} className="card estimoteLocation">
                <p className="estimoteLocationId">{this.state.estimoteLocation.estimoteLocationId}</p>
            </div>
        );
    }
});

module.exports = EstimoteLocation;