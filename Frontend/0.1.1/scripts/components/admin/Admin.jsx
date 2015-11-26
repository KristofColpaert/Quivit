'use strict';

var React = require('react'),
    Navigation = require('../general/Navigation.jsx'),
    AdminNavigation = require('./AdminNavigation.jsx'),
    ManageGames = require('./ManageGames.jsx');

var Admin = React.createClass({
    render: function() {
        return(
            <section>
                <Navigation />
                <section className="content-holder">
                    <AdminNavigation />
                    <ManageGames />
                </section>
            </section>
        );
    }
});

module.exports = Admin;