'use strict';

var React = require('react'),
    Navigation = require('../general/Navigation.jsx');

var Admin = React.createClass({
    render: function() {
        return(
            <admin>
                <Navigation />
                <section className="content-holder">
                    <h1>Admin</h1>
                </section>
            </admin>
        );
    }
});

module.exports = Admin;