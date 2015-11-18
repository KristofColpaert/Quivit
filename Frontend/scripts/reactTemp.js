/**
 * Created by martijn on 16/11/15.
 */

const Navigation = React.createClass({
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

const GamesPanel = React.createClass({
    getInitialState: function() {
        return null;
    },
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

const Game = React.createClass({
    render: function() {
        return(
            <div key={this.props.teams} className="card game">
                <span className="score">{this.props.score}</span>
                <h3>{this.props.teams}</h3>
                <span className="time passed" data-timepassed={this.props.timePassed}></span>
                {/* time passed */}
            </div>
        );
    }
});

const Main = React.createClass({
    render: function() {
        return (
            <main>
                <Navigation />
                <section className="content-holder">
                    <GamesPanel title={'Live Games'} games={[<Game teams={'KAA Gent - RSCA'} score={'0-2'} timePassed={'67'}/>, <Game teams={'FC Barcelona - Man. City'} score={'1-3'} />, <Game teams={'Stoke City - KV Mechelen'} score={'1-0'} />, <Game teams={'Sevilla - Villareal'} score={'1-1'} />]}/>
                    <div className="clearfix"></div>
                    <GamesPanel title={'Finished Games'} games={[<Game teams={'België - Spanje'} score={'3-2'} />, <Game teams={'Zweden - Portugal'} score={'0-0'} />, <Game teams={'Chelsea - Swansea'} score={'0-4'} />]}/>
                    <div className="clearfix"></div>
                </section>
            </main>
        );
    }
});

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);