var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    userConstants = require('../helpers/userConstants.js'),
    constants = require('../helpers/urlConstants.js'),
    ajax = require('../helpers/ajax.js');

var userActions = {

    //Save user
    saveUserResponse : function(user) {
        AppDispatcher.handleServerAction({
            actionType : userConstants.SAVE_USER_RESPONSE,
            user : user
        });
    },

    saveUserRequest : function(user) {
        user = JSON.stringify(user);
        ajax.saveData(constants.baseApiUserUrl, user, function(error, data) {
            if(!error) {
                userActions.saveUserResponse(data);
            }
        });
    },

    //Set saved to false
    falsifyIsUserSaved : function() {
        AppDispatcher.handleServerAction({
            actionType : userConstants.FALSIFY_IS_USER_SAVED
        });
    },

    //Set user error to false
    falsifyIsUserError : function() {
        AppDispatcher.handleServerAction({
            actionType : userConstants.FALSIFY_IS_USER_ERROR
        });
    }
};

module.exports = userActions;