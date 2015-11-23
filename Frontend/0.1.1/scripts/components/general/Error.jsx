'use strict';

var React = require('react'),
    Navigation = require('./../general/Navigation.jsx');

var NoMatch = React.createClass({
    render: function() {
        return(
            <main>
                <Navigation />
                <section className="content-holder">
                    <h1>Error 404.</h1>
                </section>
            </main>
        );
    }
});

module.exports = NoMatch;