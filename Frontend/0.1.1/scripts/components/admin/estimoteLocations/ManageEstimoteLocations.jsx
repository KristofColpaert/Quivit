'use strict';

var React = require('react'),
    EstimoteLocation = require('./EstimoteLocation.jsx');

var ManageEstimoteLocations = React.createClass({
    render : function() {
        return(
            <section className="estimoteLocations">
                <h2>{this.props.title}</h2>
                {this.props.estimoteLocations.map(function(estimoteLocation) {
                    return (
                        <EstimoteLocation key={estimoteLocation._id} estimoteLocation={estimoteLocation} />
                    );
                })}
            </section>
        )
    }
});

module.exports = ManageEstimoteLocations;