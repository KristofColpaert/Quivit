'use strict';

var React = require('react'),
    Navigation = require('./../general/Navigation.jsx'),
    Game = require('./Game.jsx'),
    GamesPanel = require('./GamesPanel.jsx'),
    Link = require('react-router').Link,
    gameStore = require('../../stores/gameStore.js'),
    gameActions = require('../../actions/gameActions.js');

//Variables
var titleLive = 'Live games';
var titleFuture = 'Future games';

var Main = React.createClass({
    getInitialState : function() {
        return ({
            titleGamesLive : titleLive,
            titleGamesFuture : titleFuture,
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
            todaysGames : gameStore.getTodaysGames(),
            futureGames : gameStore.getFutureGames()
        });
    },

    render: function() {
        return (
            <main>
                <Navigation />
                <section className="content-holder">
                    <GamesPanel title={this.state.titleGamesLive} games={this.state.todaysGames} />
                    <div className="clearfix"></div>
                    <GamesPanel title={this.state.titleGamesFuture} games={this.state.futureGames} />
                    <div className="clearfix"></div>
                    <Link to="/admin">Admin</Link>
                </section>
            </main>
        );
    }
});

module.exports = Main;