var React = require('react'),
    Link = require('react-router').Link,
    Game = require('./Game.js');

var ManageGames = React.createClass({
    getInitialState : function() {
        return {
            games : []
        };
    },
    componentDidMount : function() {
        //Request games data.
        var request = new XMLHttpRequest();
        request.open('GET', this.props.url, true);
        request.onload = function(e) {
            if(request.readyState === 4) {
                if(request.status === 200) {
                    //Set data.
                    var gamesObject = JSON.parse(request.responseText);
                    this.setState({
                       games : gamesObject
                    });
                }
                else {
                    console.error(request.statusText);
                }
            }
        }.bind(this);

        request.onerror = function(e) {
            console.error(request.statusText);
        }

        request.send(null);
    },
    render : function() {
        var games = this.state.games;
        return(
            <section className="games">
                <h2>{this.props.title}</h2>
                {games.map(function(game) {
                    console.log(game);
                    return <Game data={game} />;
                })}
            </section>
        );
    }
});

module.exports = ManageGames;