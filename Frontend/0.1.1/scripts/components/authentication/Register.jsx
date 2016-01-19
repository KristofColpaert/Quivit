var React = require('react'),
    userStore = require('../../stores/userStore.js'),
    userActions = require('../../actions/userActions.js'),
    History = require('react-router').History;

var Register = React.createClass({

    mixins : [History],

    getInitialState : function() {
        return({
            error : null
        });
    },

    componentWillMount : function() {
        userStore.addChangeListener(this._onChange);
    },

    componentWillUnmount : function() {
        userActions.falsifyIsUserError();
        userStore.removeChangeListener(this._onChange);
    },

    submitHandler : function(event) {
        event.preventDefault();

        var email = this.refs.email.value;
        var password = this.refs.password.value;

        var user = { email : email, password : password };
        userActions.falsifyIsUserError();
        userActions.saveUserRequest(user);
    },

    _onChange : function() {
        console.log('hier');
        if(userStore.isUserSaved()) {
            console.log('hier ook');
            if(!userStore.isUserError()) {
                console.log('hier ook ook');
                this.history.replaceState(null, '/login');
                userActions.falsifyIsUserSaved();
            }

            else {
                this.setState({
                    error : userStore.getUserError()
                });
            }
        }
    },

    render : function() {
        return(
            <section>
                <h2>Register</h2>
                <p className="error">{this.state.error}</p>
                <form onSubmit={this.submitHandler} className="register">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" ref="email" />

                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" ref="password" />

                    <input type="submit" value="Register" className="btn primary" />
                </form>
            </section>
        );
    }
});

module.exports = Register;