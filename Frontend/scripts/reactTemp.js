/**
 * Created by martijn on 16/11/15.
 */

// TODO: add real react code.

var Navigation = React.createClass({
    render: function() {
        return (
            <nav className="navigation">
                <h1>Quivit</h1>
            </nav>
        );
    }
});

ReactDOM.render(
    <Navigation />,
    document.getElementById('endPoint')
);