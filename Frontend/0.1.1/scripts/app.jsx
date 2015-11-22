'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    Main = require('./components/main/Main.jsx'),
    Admin = require('./components/admin/Admin.jsx'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    Link = require('react-router').Link;

ReactDOM.render((
    <Router>
        <Route path="/" component={Main} />
        <Route path="/admin" component={Admin} />
    </Router>
), document.getElementById('root'));