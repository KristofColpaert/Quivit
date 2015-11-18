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

const Games = React.createClass({
    render: function() {
        return (
            <section className="games">
                <h2>{this.props.title}</h2>
            </section>
        );
    }
});

const Main = React.createClass({
    render: function() {
        return (
            <main>
                <Navigation />
                <section>

                    <Games title={'Live Games'} />
                    <Games title={'Finished Games'} />
                </section>
            </main>
        );
    }
});

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);