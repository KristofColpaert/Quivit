'use strict';

var React = require('react'),
    Game = require('./Game.jsx'),
    Link = require('react-router').Link;

var ManageGames = React.createClass({
    render : function() {
        return(
            <section className="games">
                <h2>{this.props.title}</h2>
                {this.props.games.map(function(game) {
                    return (
                        <Link key={game._id} to={'/canvasGame/' + game._id}><Game key={game._id} game={game} /></Link>
                    );
                })}
            </section>
        );
    }
});

module.exports = ManageGames;