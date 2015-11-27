'use strict';

var React = require('react'),
    Game = require('./Game.jsx');

var ManageGames = React.createClass({
    render : function() {
        return(
            <section className="games">
                <h2>{this.props.title}</h2>
                {this.props.games.map(function(game) {
                    return (
                        <Game game={game} />
                    );
                })}
            </section>
        );
    }
});

module.exports = ManageGames;