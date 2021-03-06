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
                        <Link className="gameHolder" key={game._id} to={'/admin/games/edit/' + game._id}><Game key={game._id} game={game} /></Link>
                    );
                })}
                <Link className="gameHolder add" to="/admin/games/new"></Link>
            </section>
        );
    }
});

module.exports = ManageGames;