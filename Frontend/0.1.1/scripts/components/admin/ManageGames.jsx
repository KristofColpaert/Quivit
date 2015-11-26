var React = require('react'),
    Link = require('react-router').Link;

var ManageGames = React.createClass({
    getInitialState : function() {
        return {
            games : {}
        };
    },
    componentDidMount : function() {
        //Request games data.
        var request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:3000/api/game/2015/11/01', true);
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
        return(
           <h1>{this.state.games.toString()}</h1>
        );
    }
});

module.exports = ManageGames;