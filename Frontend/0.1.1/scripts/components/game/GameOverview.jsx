'use strict';

var React = require('react'),
    gameStore = require('../../stores/gameStore.js'),
    gameActions  = require('../../actions/gameActions.js'),
    playerStore = require('../../stores/playerStore.js'),
    playerActions = require('../../actions/playerActions.js');

var GameOverview = React.createClass({
    getInitialState : function() {
        return({
            game : gameStore.getSingleGame(),
            players : playerStore.getHomeAwayPlayers()
        });
    },

    /*
    ** Todo: alle spelers weergeven voor heat map.
    ** Todo: live game opnieuw afspelen.
     */

    render : function() {
        return(
            <p></p>
        );
    }
});

module.exports = GameOverview;