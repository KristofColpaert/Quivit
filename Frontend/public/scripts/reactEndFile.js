/**
 * Created by martijn on 16/11/15.
 */

var React = require('react');
var ReactDOM = require('react-dom');

// TODO: add real react code
var Navigation = React.createClass({
    render: function() {
        return (
            React.createElement('nav', {className: "nav"},
                "Hello, world!"
            )
        );
    }
});
ReactDOM.render(
    React.createElement(CommentBox, null),
    document.getElementById('endPoint')
);