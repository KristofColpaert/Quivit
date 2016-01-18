'use strict';

var React = require('react'),
    Link = require('react-router').Link,
    Menu = require('react-burger-menu').bubble,
    offlineHelper = require('../../helpers/offlineHelper.js');

var Navigation = React.createClass({
    _localVariables : {
        isUserOnline : true
    },

    componentWillMount : function() {
        var self = this;
        offlineHelper.isOnline(function(online) {
            self._localVariables.isUserOnline = online;
        });
    },

    getInitialState: function getInitialState() {
        return {
            currentMenu: 'bubble'
        };
    },

    render: function() {
        var isMenuOpen = function(state) {
            return state.isOpen;
        };

        if(this._localVariables.isUserOnline) {
            return (
                <header className="header">
                    <nav className="navigation">
                        <h1><Link to="/">🐤 Quivit</Link></h1>
                        <Menu right width={ 270 } >
                            <Link to="/" className="menu-item" >Home</Link>
                            <Link to="/admin" className="menu-item" >Admin</Link>
                        </Menu>
                    </nav>
                </header>
            );
        }
        
        else {
            return (
                <header className="header">
                    <nav className="navigation">
                        <h1><Link to="/">🐤 Quivit</Link></h1>
                        <Menu right width={ 270 } >
                            <Link to="/" className="menu-item" >Home</Link>
                        </Menu>
                    </nav>
                </header>
            );
        }
    }
});

module.exports = Navigation;