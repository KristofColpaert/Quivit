'use strict';

var React = require('react');

var GamesPanel = React.createClass({
    render: function() {
        return (
            <section className="games">
                <h2>{this.props.title}</h2>
                {this.props.games.map(function(game) {
                    return (game);
                    }
                )}
            </section>
        );
    }
});

module.exports = GamesPanel;