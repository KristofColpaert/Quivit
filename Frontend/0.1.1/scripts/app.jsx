'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    Main = require('./components/main/Main.jsx'),
    Admin = require('./components/admin/Admin.jsx'),
    Game = require('./components/game/Game.jsx'),
    NoMatch = require('./components/general/Error.jsx'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    Link = require('react-router').Link;

ReactDOM.render((
    <Router>
        <Route path="/" component={Main} />
        <Route path="/admin" component={Admin} />
        <Route path="/games" component={Main}>
            <Route path="/games/:gameId" component={Game}/>
        </Route>
        <Route path="*" component={NoMatch}/>
    </Router>
), document.getElementById('root'));