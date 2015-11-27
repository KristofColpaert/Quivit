'use strict';

var React = require('react'),
    Navigation = require('../general/Navigation.jsx'),
    AdminNavigation = require('./AdminNavigation.jsx'),
    ManageGames = require('./ManageGames.jsx'),
    gameStore = require('../../stores/gameStore.js'),
    gameActions = require('../../actions/gameActions.js');

//Variables
var titleLive = 'Live Games';
var titleFuture = 'Future Games';

var Admin = React.createClass({
    getInitialState : function() {
        return ({
            titleLive : titleLive,
            titleFuture : titleFuture,
            todaysGames : gameStore.getTodaysGames(),
            futureGames : gameStore.getFutureGames()
        });
    },

    componentWillMount : function() {
        gameStore.addChangeListener(this._onChange);
    },

    componentDidMount : function() {
        gameActions.getTodayGamesRequest();
        gameActions.getFutureGamesRequest();
    },

    componentWillUnmount : function() {
        gameStore.removeChangeListener(this._onChange);
    },

    _onChange : function() {
        this.setState({
            titleLive : titleLive,
            titleFuture : titleFuture,
            todaysGames : gameStore.getTodaysGames(),
            futureGames : gameStore.getFutureGames()
        });
    },

    render: function() {
        return(
            <main>
                <Navigation />
                <section className="content-holder">
                    <AdminNavigation />
                    <ManageGames title={this.state.titleLive} games={this.state.todaysGames} />
                    <div className="clearfix"></div>
                    <ManageGames title={this.state.titleFuture} games={this.state.futureGames}/>
                    <div className="clearfix"></div>
                </section>
            </main>
        );
    }
});

module.exports = Admin;