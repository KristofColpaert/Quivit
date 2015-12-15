'use strict';

var React = require('react'),
    Link = require('react-router').Link,
    Menu = require('react-burger-menu').bubble;

var Navigation = React.createClass({
    getInitialState: function getInitialState() {
        return {
            currentMenu: 'bubble'
        };
    },
    render: function() {
        var isMenuOpen = function(state) {
            console.log(state.isOpen);
            return state.isOpen;
        };
        // <div className="list" onClick={ this.toggleMenu }></div>
        // <div id="outer-container">
        //  id="page-wrap" 

        return (
            <header className="header">
                <nav className="navigation">
                    <h1><Link to="/">🐤 Quivit</Link></h1>
                    <Menu right width={ 270 } >
                        <Link to="/" className="menu-item" >Home</Link>
                        <Link to="about" className="menu-item" >About</Link>
                        <Link to="contact" className="menu-item" >Contact</Link>
                        <Link to="/admin" className="menu-item">Admin</Link>
                    </Menu>
                </nav>
            </header>
        );
    }

});

module.exports = Navigation;