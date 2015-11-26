'use strict';

var React = require('react'),
    Navigation = require('../general/Navigation.jsx'),
    AdminNavigation = require('./AdminNavigation.jsx'),
    ManageGames = require('./ManageGames.jsx');

var Admin = React.createClass({
    getInitialState : function() {
        return ({
            baseUrl: 'http://localhost:3000/api/game/',
            titleLive: 'Live Games',
            titleFuture: 'Future Games',
            currentYear: new Date().getFullYear(),
            currentMonth: new Date().getMonth() + 1,
            currentDay: new Date().getDate()
        });
    },
    render: function() {
        return(
            <main>
                <Navigation />
                <section className="content-holder">
                    <AdminNavigation />
                    <ManageGames title={this.state.titleLive}
                                 url={this.state.baseUrl + this.state.currentYear + '/' + this.state.currentMonth + '/' + this.state.currentDay} />
                    <ManageGames title={this.state.titleFuture} url={this.state.baseUrl} />
                </section>
            </main>
        );
    }
});

module.exports = Admin;