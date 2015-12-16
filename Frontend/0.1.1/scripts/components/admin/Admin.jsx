'use strict';

var React = require('react'),
    Navigation = require('../general/Navigation.jsx'),
    Footer = require('../general/Footer.jsx'),
    AdminNavigation = require('./AdminNavigation.jsx'),
    ManageGames = require('./games/ManageGames.jsx'),
    NewGame = require('./games/NewGame.jsx'),
    EditGame = require('./games/EditGame.jsx'),
    gameStore = require('../../stores/gameStore.js'),
    gameActions = require('../../actions/gameActions.js'),
    ManageTeams = require('./teams/ManageTeams.jsx'),
    NewTeam = require('./teams/NewTeam.jsx'),
    teamStore = require('../../stores/teamStore.js'),
    teamActions = require('../../actions/teamActions.js'),
    ManagePlayers = require('./players/ManagePlayers.jsx'),
    NewPlayer = require('./players/NewPlayer.jsx'),
    playerStore = require('../../stores/playerStore.js'),
    playerActions = require('../../actions/playerActions.js'),
    ManageEstimoteLocations = require('./estimoteLocations/ManageEstimoteLocations.jsx'),
    NewEstimoteLocation = require('./estimoteLocations/NewEstimoteLocation.jsx'),
    estimoteLocationStore = require('../../stores/estimoteLocationStore.js'),
    estimoteLocationActions = require('../../actions/estimoteLocationActions.js');

//Variables
var titleLive = 'Live games';
var titleFuture = 'Future games';
var titleTeams = 'Teams';
var titlePlayers = 'Players';
var titleEstimoteLocations = 'Estimote Locations';

var Admin = React.createClass({
    getInitialState : function() {
        return ({
            titleGamesLive : titleLive,
            titleGamesFuture : titleFuture,
            titleTeams : titleTeams,
            titlePlayers : titlePlayers,
            titleEstimoteLocations : titleEstimoteLocations,
            todaysGames : gameStore.getTodaysGames(),
            futureGames : gameStore.getFutureGames(),
            teams : teamStore.getAllTeams(),
            players : playerStore.getAllPlayers(),
            estimoteLocations : estimoteLocationStore.getAllEstimoteLocations()
        });
    },

    componentWillMount : function() {
        gameStore.addChangeListener(this._onChange);
        teamStore.addChangeListener(this._onChange);
        playerStore.addChangeListener(this._onChange);
        estimoteLocationStore.addChangeListener(this._onChange);
    },

    componentDidMount : function() {
        gameActions.getTodayGamesRequest();
        gameActions.getFutureGamesRequest();
        teamActions.getTeamsRequest();
        playerActions.getPlayersRequest();
        estimoteLocationActions.getEstimoteLocationsRequest();
    },

    componentWillUnmount : function() {
        gameStore.removeChangeListener(this._onChange);
        teamStore.removeChangeListener(this._onChange);
        playerStore.removeChangeListener(this._onChange);
        estimoteLocationStore.removeChangeListener(this._onChange);
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
            players : playerStore.getAllPlayers(),
            estimoteLocations : estimoteLocationStore.getAllEstimoteLocations()
        });
    },

    render: function() {
        //Decide which page to show.
        switch(this.props.page) {
            case 'ManageGames':
                return(
                    <main>
                        <AdminNavigation />
                        <section className="content-holder">
                            <ManageGames title={this.state.titleGamesLive} games={this.state.todaysGames} />
                            <div className="clearfix"></div>
                            <ManageGames title={this.state.titleGamesFuture} games={this.state.futureGames}/>
                            <div className="clearfix"></div>
                        </section>
                        <Footer />
                    </main>
                );
                break;

            case 'NewGame':
                return(
                    <main>
                        <AdminNavigation />
                        <section className="content-holder">
                            <NewGame />
                        </section>
                        <Footer />
                    </main>
                );
                break;

            case 'ManageTeams':
                return(
                    <main>
                        <AdminNavigation />
                        <section className="content-holder">
                            <ManageTeams title={this.state.titleTeams} teams={this.state.teams} />
                        </section>
                        <Footer />
                    </main>
                );
                break;

            case 'NewTeam':
                return(
                    <main>
                        <AdminNavigation />
                        <section className="content-holder">
                            <NewTeam />
                        </section>
                        <Footer />
                    </main>
                );
                break;

            case 'ManagePlayers':
                return(
                    <main>
                        <AdminNavigation />
                        <section className="content-holder">
                            <ManagePlayers title={this.state.titlePlayers} players={this.state.players} />
                        </section>
                        <Footer />
                    </main>
                );
                break;

            case 'NewPlayer':
                return(
                    <main>
                        <AdminNavigation />
                        <section className="content-holder">
                            <NewPlayer />
                        </section>
                        <Footer />
                    </main>
                );
                break;

            case 'ManageEstimoteLocations':
                return(
                    <main>
                        <AdminNavigation />
                        <section className="content-holder">
                            <ManageEstimoteLocations title={this.state.titleEstimoteLocations} estimoteLocations={this.state.estimoteLocations} />
                        </section>
                    </main>
                );
                break;

            case 'NewEstimoteLocation':
                return(
                    <main>
                        <AdminNavigation />
                        <section className="content-holder">
                            <NewEstimoteLocation />
                        </section>
                    </main>
                );
                break;

            case 'EditGame':
                return(
                    <main>
                        <AdminNavigation/>
                        <section className="content-holder">
                            <EditGame />
                        </section>
                    </main>
                );
        }
    }
});

module.exports = Admin;