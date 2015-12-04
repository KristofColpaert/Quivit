'use strict';

var React = require('react'),
	Navigation = require('../general/Navigation.jsx');
    //socket = require('socket.io-client')('http://localhost:3000');

var LiveGame = React.createClass({
    render: function() {
        return(
            <div>
        	   <section className="live game">
            	   <h1>This is a live game.</h1>
				   <canvas id="gameCanvas" className="gameCanvas" width="1200" height="600"></canvas>
                </section>
            </div>
        );
    }
});

module.exports = LiveGame;