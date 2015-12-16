'use strict';

var React = require('react'),
ReactDOM = require('react-dom'),
Main = require('./components/main/Main.jsx'),
Admin = require('./components/admin/Admin.jsx'),
Game = require('./components/game/Game.jsx'),
NoMatch = require('./components/general/Error.jsx'),
Router = require('react-router').Router,
Route = require('react-router').Route,
createBrowserHistory = require('history/lib/createBrowserHistory');

//Wrappers for properties.
var AdminWrapper = function(page) {
    return React.createClass({
        render: function () {
            return (
                <Admin page={page} />
            );
        }
    });
};

var GameWrapper = function(page) {
    return React.createClass({
        render: function() {
            return (
                <Game page={page} />
            );
        }
    });
};
// history={createBrowserHistory()}
ReactDOM.render((
    <Router  >
        <Route name="/canvasGame/:gameId" path="/canvasGame/:gameId" component={GameWrapper('LiveGame')} />
        <Route name="/heatMap/:gameId/:playerId" path="/heatMap/:gameId/:playerId" component={GameWrapper('HeatMap')} />
        <Route name="/gameOverview/:gameId" path="/gameOverview/:gameId" component={GameWrapper('GameOverview')} />
        <Route name="/admin" path="/admin" component={AdminWrapper('ManageGames')} />
        <Route name="/admin/teams" path="/admin/teams" component={AdminWrapper('ManageTeams')} />
        <Route name="/admin/teams/new" path="/admin/teams/new" component={AdminWrapper('NewTeam')} />
        <Route name="/admin/games" path="/admin/games" component={AdminWrapper('ManageGames')} />
        <Route name="/admin/games/new" path="/admin/games/new" component={AdminWrapper('NewGame')} />
        <Route name="/admin/games/edit/:gameId" path="/admin/games/edit/:gameId" component={AdminWrapper('EditGame')} />
        <Route name="/admin/players" path="/admin/players" component={AdminWrapper('ManagePlayers')} />
        <Route name="/admin/players/new" path="/admin/players/new" component={AdminWrapper('NewPlayer')} />
        <Route name="/admin/estimotelocations" path="/admin/estimotelocations" component={AdminWrapper('ManageEstimoteLocations')} />
        <Route name="/admin/estimotelocations/new" path="/admin/estimotelocations/new" component={AdminWrapper('NewEstimoteLocation')} />
        <Route name="/" path="/" component={Main}/>
        <Route path="*" component={NoMatch}/>
    </Router>
), document.getElementById('root'));
