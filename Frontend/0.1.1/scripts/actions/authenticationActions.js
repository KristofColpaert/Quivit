var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    authenticationConstants = require('../helpers/authenticationConstants.js'),
    constants = require('../helpers/urlConstants.js'),
    ajax = require('../helpers/ajax.js');

var authenticationActions = {

    //Login
    loginResponse : function(token) {
        AppDispatcher.handleServerAction({
            actionType : authenticationConstants.LOGIN_RESPONSE,
            token : token.token
        });
    },

    loginRequest : function(user) {
        user = JSON.stringify(user);
        ajax.saveData(constants.authenticationUrl, user, function(error, data) {
            if(!error) {
                authenticationActions.loginResponse(data);
            }
        });
    }
};

module.exports = authenticationActions;