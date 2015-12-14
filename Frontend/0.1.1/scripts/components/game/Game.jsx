'use strict';

var React = require('react'),
    Navigation = require('../general/Navigation.jsx'),
    LiveGame = require('./LiveGame.jsx'),
    HeatMap = require('./HeatMap.jsx'),
    GameOverview = require('./GameOverview.jsx');

//Variables
var title = 'Live game';

var Game = React.createClass({
    getInitialState : function() {
        return ({
            
        });
    },

    componentWillMount : function() {

    },

    componentDidMount : function() {

    },

    componentWillUnmount : function() {

    },

    _onChange : function() {

    },

    render: function() {
        //Decide which page to show.
        switch(this.props.page) {
            case 'LiveGame':
                return(
                    <main>
                        <Navigation />
                        <section className="content-holder">
                            <LiveGame />
                        </section>
                    </main>
                );
                break;

            case 'HeatMap':
                return(
                    <main>
                        <Navigation />
                        <section className="content-holder">
                            <HeatMap />
                        </section>
                    </main>
                );
                break;

            case 'GameOverview':
                return(
                    <main>
                        <Navigation />
                        <section className="content-holder">
                            <GameOverview />
                        </section>
                    </main>
                );
                break;
        }
    }
});

module.exports = Game;