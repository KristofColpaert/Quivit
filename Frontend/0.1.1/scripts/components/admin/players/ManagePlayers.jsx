'use strict';

var React = require('react'),
    Player = require('./Player.jsx');

var ManagePlayers = React.createClass({
   render : function() {
       return(
           <section className="players">
               <h2>{this.props.title}</h2>
               {this.props.players.map(function(player) {
                   return(
                       <Player key={player._id} player={player} />
                   );
               })}
           </section>
       );
   }
});

module.exports = ManagePlayers;