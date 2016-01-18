var React = require('react'),
    Link = require('react-router').Link,
    authenticationStore = require('../../stores/authenticationStore.js'),
    authenticationActions = require('../../actions/authenticationActions.js'),
    History = require('react-router').History;

var Login = React.createClass({

    mixins: [History],

    componentWillMount : function() {
        authenticationStore.addChangeListener(this._onChange);
    },

    componentWillUnmount : function() {
        authenticationStore.removeChangeListener(this._onChange);
    },

    submitHandler : function(event) {
        event.preventDefault();

        var email = this.refs.email.value;
        var password = this.refs.password.value;

        var user = { email : email, password : password };
        authenticationActions.loginRequest(user);
    },

    _onChange : function() {
        if(authenticationStore.isUserLoggedIn()) {
            this.history.replaceState(null, '/admin');
        }
    },

    render : function() {
        return(
            <section>
                <h2>Login</h2>
                <form onSubmit={this.submitHandler} className="login">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" ref="email" />

                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" ref="password" />

                    <input type="submit" value="Login" className="btn primary formbtn" />
                </form>
                <Link className="registerLink" to="/register">Register</Link>
            </section>
        );
    }
});

module.exports = Login;