'use strict';

var React = require('react'),
    Player = require('./Player.jsx'),
    Link = require('react-router').Link;

var ManagePlayers = React.createClass({
   render : function() {
       return(
           <section className="players">
               <h2>{this.props.title}</h2>
               {this.props.players.map(function(player) {
                  return(
                    <Player className="card player" key={player._id} player={player} />
                  );
               })}
               <Link className="card player new" to="/admin/players/new"></Link>
           </section>
       );
   }
});

module.exports = ManagePlayers;