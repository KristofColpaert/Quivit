/**
 * Created by martijn on 16/11/15.
 */

// import React from 'react'
// import { render } from 'react-dom'

// First we import some components...
// import { Router,Route, Link } from 'react-router'


var Navigation = React.createClass({
    render: function() {
        return (
            <header className="header">
                <nav className="navigation">
                    <h1>Quivit</h1>

                    <ul className="list">
                        <li className="menu item">live</li>
                        <li className="menu item">about</li>
                    </ul>
                </nav>
            </header>
        );
    }
});

var GamesPanel = React.createClass({
    render: function() {
        return (
            <section className="games">
                <h2>{this.props.title}</h2>
                {this.props.games.map(function(game) {
                    return (game);
                })}
            </section>
        );
    }
});

var currentTeams = {

};

var Game = React.createClass({
    getStyles: function () {
        var c1 = this.props.colors[0],
            c2 = this.props.colors[1];
        return (
            {
                background: 'linear-gradient(90deg, ' + c1 + ' 10%, ' + c2 + ' 90%)'
            }
        )
    },
    render: function() {
        return(
            <div key={this.props.teams} className="card game">
                <span className="time passed">{this.props.timePassed}</span>
                <span className="score">{this.props.score}</span>
                <h3 className="teams" style={ this.getStyles() }>{this.props.teams}</h3>
            </div>
        );
    }
});

var Main = React.createClass({
    render: function() {
        return (
            <main>
                <Navigation />
                <section className="content-holder">
                    <GamesPanel title={'Live Games'} games={[
                        <Game teams={'KAA Gent - RSCA'} score={'0-2'} timePassed="43'" colors={["#09509E", "#523091"]} />,
                        <Game teams={'FC Barcelona - Man. City'} score={'1-3'} timePassed="60'" colors={["#940F08", "#5CBFEB"]} />,
                        <Game teams={'Stoke City - KV Mechelen'} score={'1-0'} timePassed="23'" colors={["#09509E", "#523091"]} />,
                        <Game teams={'Sevilla - Villareal'} score={'1-1'} colors={["#09509E", "#523091"]} />
                    ]}/>
                    <div className="clearfix"></div>
                    <GamesPanel title={'Finished Games'} games={[
                        <Game teams={'België - Spanje'} colors={["#09509E", "#523091"]} score={'3-2'} />,
                        <Game teams={'Zweden - Portugal'} score={'0-0'} colors={["#FFD90D", "#FF1600"]} />,
                        <Game teams={'Chelsea - Swansea'} score={'0-4'} colors={["#09509E", "#523091"]} />
                    ]}/>
                    <div className="clearfix"></div>
                </section>
            </main>
        );
    }
});

//render((
//    <Router>
//        <Route path="/" component={App}>
//            <Route path="about" component={About} />
//            <Route path="inbox" component={Inbox} />
//        </Route>
//    </Router>
//), document.body);

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);