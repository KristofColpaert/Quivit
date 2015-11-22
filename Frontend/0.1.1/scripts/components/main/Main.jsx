'use strict';

var React = require('react'),
    Navigation = require('./../general/Navigation.jsx'),
    Game = require('./Game.jsx'),
    GamesPanel = require('./GamesPanel.jsx');

var Main = React.createClass({
    render: function() {
        return (
            <main>
                <Navigation />
                <section className="content-holder">
                    <GamesPanel title={'Live Games'} games={[
                        <Game key="1" teams={'KAA Gent - RSCA'} score={'0-2'} timePassed="43'" colors={["#09509E", "#523091"]} />,
                        <Game key="2" teams={'FC Barcelona - Man. City'} score={'1-3'} timePassed="60'" colors={["#940F08", "#5CBFEB"]} />,
                        <Game key="3" teams={'Stoke City - KV Mechelen'} score={'1-0'} timePassed="23'" colors={["#09509E", "#523091"]} />,
                        <Game key="4" teams={'Sevilla - Villareal'} score={'1-1'} colors={["#09509E", "#523091"]} />
                    ]}/>
                    <div className="clearfix"></div>
                    <GamesPanel title={'Finished Games'} games={[
                        <Game key="5" teams={'België - Spanje'} colors={["#09509E", "#523091"]} score={'3-2'} />,
                        <Game key="6" teams={'Zweden - Portugal'} score={'0-0'} colors={["#FFD90D", "#FF1600"]} />,
                        <Game key="7" teams={'Chelsea - Swansea'} score={'0-4'} colors={["#09509E", "#523091"]} />
                    ]}/>
                    <div className="clearfix"></div>
                </section>
            </main>
        );
    }
});

module.exports = Main;