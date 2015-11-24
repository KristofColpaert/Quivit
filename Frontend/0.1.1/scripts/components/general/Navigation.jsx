'use strict';

var React = require('react');

var Navigation = React.createClass({
    render: function() {
        return (
            <header className="header">
                <nav className="navigation">
                    <h1>🐤 Quivit</h1>

                    <ul className="list">
                        <li className="menu item">live</li>
                        <li className="menu item">about</li>
                    </ul>
                </nav>
            </header>
        );
    }
});

module.exports = Navigation;