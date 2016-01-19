'use strict';

var React = require('react'),
    EstimoteLocation = require('./EstimoteLocation.jsx'),
    Link = require('react-router').Link;

var ManageEstimoteLocations = React.createClass({
    render : function() {
        return(
            <section className="estimoteLocations">
                <h2>{this.props.title}</h2>
                {this.props.estimoteLocations.map(function(estimoteLocation) {
                    return (
                        <EstimoteLocation className="card estimoteLocation" key={estimoteLocation._id} estimoteLocation={estimoteLocation} />
                    );
                })}
                <Link className="card estimoteLocation new" to="/admin/estimoteLocations/new"></Link>
            </section>
        );
    }
});

module.exports = ManageEstimoteLocations;