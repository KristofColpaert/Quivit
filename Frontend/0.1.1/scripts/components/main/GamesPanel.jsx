'use strict';

var React = require('react'),
    Link = require('react-router').Link,
    Game = require('./Game.jsx');

var GamesPanel = React.createClass({
    render : function() {
        if(this.props.mode === 'normal') {
            return (
                <section className="games">
                    <h2>{this.props.title}</h2>
                    {this.props.games.map(function(game) {
                        return (
                        <Link className="gameHolder" key={game._id} to={'/canvasGame/' + game._id}><Game key={game._id} game={game} /></Link>
                            );
                        })}
                </section>
            );
        }

        else if(this.props.mode === 'past') {
            return (
                <section className="games">
                    <h2>{this.props.title}</h2>
                    {this.props.games.map(function(game) {
                        return (
                        <Link className="gameHolder" key={game._id} to={'/gameOverview/' + game._id}><Game key={game._id} game={game} /></Link>
                            );
                        })}
                </section>
            );
        }
    }
});

module.exports = GamesPanel;