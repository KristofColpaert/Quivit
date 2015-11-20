/**
 * Created by martijn on 16/11/15.
 */

import React from 'react'
import { render } from 'react-dom'

// First we import some components...
import { Router,Route, Link } from 'react-router'

class Navigation extends React.Component {
    render() {
        return (
            <header className="header">(
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
}

class GamesPanel extends React.Component {
    render() {
        return (
            <section className="games">
                <h2>{this.props.title}</h2>
                {this.props.games.map(function(game) {
                    return (game);
                })}
            </section>
        );
    }
}

class Game extends React.Component {
    render() {
        return(
            <div key={this.props.teams} className="card game">
                <span className="score">{this.props.score}</span>
                <h3>{this.props.teams}</h3>
                <span className="time passed"></span>
                {/* time passed */}
            </div>
        );
    }
}

class Main extends React.Component {
    render() {
        return (
            <main>
                <Navigation />
                <section className="content-holder">
                    <GamesPanel title={'Live Games'} games={[<Game teams={'KAA Gent - RSCA'} score={'0-2'} />, <Game teams={'FC Barcelona - Man. City'} score={'1-3'} />, <Game teams={'Stoke City - KV Mechelen'} score={'1-0'} />, <Game teams={'Sevilla - Villareal'} score={'1-1'} />]}/>
                    <div className="clearfix"></div>
                    <GamesPanel title={'Finished Games'} games={[<Game teams={'België - Spanje'} score={'3-2'} />, <Game teams={'Zweden - Portugal'} score={'0-0'} />, <Game teams={'Chelsea - Swansea'} score={'0-4'} />]}/>
                    <div className="clearfix"></div>
                </section>
            </main>
        );
    }
}

render((
    <Router>
        <Route path="/" component={App}>
            <Route path="about" component={About} />
            <Route path="inbox" component={Inbox} />
        </Route>
    </Router>
), document.body);

//ReactDOM.render(
//    <Main />,
//    document.getElementById('root')
//);