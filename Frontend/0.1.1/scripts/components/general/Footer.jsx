'use strict';

var React = require('react'),
    Link = require('react-router').Link;

var Footer = React.createClass({
    render: function() {
        return (
            <footer className="footer">
                <p className="bottomLine">Made with 💻 by <a href="http://www.nmct.be">NMCT</a> students.</p>
            </footer>
        );
    }
});

module.exports = Footer;