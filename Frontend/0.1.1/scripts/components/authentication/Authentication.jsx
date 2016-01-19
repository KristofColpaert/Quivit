var React = require('react'),
    Login = require('./Login.jsx'),
    Register = require('./Register.jsx'),
    Navigation = require('../general/Navigation.jsx'),
    Footer = require('../general/Footer.jsx');

var Authentication = React.createClass({
    render : function() {
        switch(this.props.page) {
            case 'Login':
                return(
                    <main>
                        <Navigation />
                        <section className="content-holder">
                            <Login />
                        </section>
                        <Footer />
                    </main>
                );
                break;

            case 'Register':
                return(
                    <main>
                        <Navigation />
                        <section className="content-holder">
                            <Register />
                        </section>
                        <Footer />
                    </main>
                );
                break;
        }
    }
});

module.exports = Authentication;