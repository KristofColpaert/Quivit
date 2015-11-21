'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    Main = require('./components/Main.jsx'),
    Navigation = require('./components/Navigation.jsx'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    Link = require('react-router').Link;

ReactDOM.render((
    <Router>
        <Route path="/" component={Main}/>
    </Router>
), document.getElementById('root'));
