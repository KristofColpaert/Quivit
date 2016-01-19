'use strict';

var React = require('react'),
    Link = require('react-router').Link;

  //  <li><Link to="/admin/games/new">New</Link></li>
  //  <li><Link to="/admin/teams/new">New</Link></li>
  //  <li><Link to="/admin/players/new">New</Link></li>



var AdminNavigation = React.createClass({
   render : function() {
       return (
        <header className="header">
          <nav className="navigation">
            <h1><Link to="/">🐤 Quivit</Link></h1>

            <ul className="menu list admin">
                <li className="menu item admin"><Link to="/admin/games">Games</Link></li>
                <li className="menu item admin"><Link to="/admin/teams">Teams</Link></li>
                <li className="menu item admin"><Link to="/admin/players">Players</Link></li>
                <li className="menu item admin"><Link to="/admin/estimotelocations">Estimote</Link></li>
            </ul>
          </nav>
        </header>
       );
   }
});

module.exports = AdminNavigation;