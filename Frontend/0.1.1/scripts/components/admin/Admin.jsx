'use strict';

var React = require('react'),
    Navigation = require('../general/Navigation.jsx'),
    AdminNavigation = require('./AdminNavigation.jsx'),
    ManageGames = require('./games/ManageGames.jsx'),
    NewGame = require('./games/NewGame.jsx'),
    gameStore = require('../../stores/gameStore.js'),
    gameActions = require('../../actions/gameActions.js'),
    ManageTeams = require('./teams/ManageTeams.jsx'),
    NewTeam = require('./teams/NewTeam.jsx'),
    teamStore = require('../../stores/teamStore.js'),
    teamActions = require('../../actions/teamActions.js'),
    ManagePlayers = require('./players/ManagePlayers.jsx'),
    NewPlayer = require('./players/NewPlayer.jsx'),
    playerStore = require('../../stores/playerStore.js'),
    playerActions = require('../../actions/playerActions.js');

//Variables
var titleLive = 'Live games';
var titleFuture = 'Future games';
var titleTeams = 'Teams';
var titlePlayers = 'Players';

var Admin = React.createClass({
    getInitialState : function() {
        return ({
            titleGamesLive : titleLive,
            titleGamesFuture : titleFuture,
            titleTeams : titleTeams,
            titlePlayers : titlePlayers,
            todaysGames : gameStore.getTodaysGames(),
            futureGames : gameStore.getFutureGames(),
            teams : teamStore.getAllTeams(),
            players : playerStore.getAllPlayers()
        });
    },

    componentWillMount : function() {
        gameStore.addChangeListener(this._onChange);
        teamStore.addChangeListener(this._onChange);
        playerStore.addChangeListener(this._onChange);
    },

    componentDidMount : function() {
        gameActions.getTodayGamesRequest();
        gameActions.getFutureGamesRequest();
        teamActions.getTeamsRequest();
        playerActions.getPlayersRequest();
    },

    componentWillUnmount : function() {
        gameStore.removeChangeListener(this._onChange);
        teamStore.removeChangeListener(this._onChange);
        playerStore.removeChangeListener(this._onChange);
    },

    _onChange : function() {
        this.setState({
            titleGamesLive : titleLive,
            titleGamesFuture : titleFuture,
            titleTeams : titleTeams,
            titlePlayers : titlePlayers,
            todaysGames : gameStore.getTodaysGames(),
            futureGames : gameStore.getFutureGames(),
            teams : teamStore.getAllTeams(),
            players : playerStore.getAllPlayers()
        });
    },

    render: function() {
        //Decide which page to show.
        switch(this.props.page) {
            case 'ManageGames':
                return(
                    <main>
                        <Navigation />
                        <section className="content-holder">
                            <AdminNavigation />
                            <ManageGames title={this.state.titleGamesLive} games={this.state.todaysGames} />
                            <div className="clearfix"></div>
                            <ManageGames title={this.state.titleGamesFuture} games={this.state.futureGames}/>
                            <div className="clearfix"></div>
                        </section>
                    </main>
                );
                break;

            case 'NewGame':
                return(
                    <main>
                        <Navigation />
                        <section className="content-holder">
                            <AdminNavigation />
                            <NewGame />
                        </section>
                    </main>
                );
                break;

            case 'ManageTeams':
                return(
                    <main>
                        <Navigation />
                        <section className="content-holder">
                            <AdminNavigation />
                            <ManageTeams title={this.state.titleTeams} teams={this.state.teams} />
                        </section>
                    </main>
                );
                break;

            case 'NewTeam':
                return(
                    <main>
                        <Navigation />
                        <section className="content-holder">
                            <AdminNavigation />
                            <NewTeam />
                        </section>
                    </main>
                );
                break;

            case 'ManagePlayers':
                return(
                    <main>
                        <Navigation />
                        <section className="content-holder">
                            <AdminNavigation />
                            <ManagePlayers title={this.state.titlePlayers} players={this.state.players} />
                        </section>
                    </main>
                );
                break;

            case 'NewPlayer':
                return(
                    <main>
                        <Navigation />
                        <section className="content-holder">
                            <AdminNavigation />
                            <NewPlayer />
                        </section>
                    </main>
                );
                break;
        }
    }
});

module.exports = Admin;