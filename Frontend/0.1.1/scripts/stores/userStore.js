var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    EventEmitter = require('events').EventEmitter,
    objectAssign = require('object-assign'),
    userConstants = require('../helpers/userConstants.js');

var CHANGE_EVENT = 'change';

//Stored objects
var storedUsers = {
    isUserSaved : false,
    userError : null,
    singleUser : {}
};

//UserStore
var userStore = objectAssign({}, EventEmitter.prototype, {
    emitChange : function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener : function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener : function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getUserError : function() {
        return storedUsers.userError;
    },

    isUserError : function() {
        if(storedUsers.userError === null) {
            return false;
        }
        else {
            return true;
        }
    },

    getSingleUser : function() {
        return storedUsers.singleUser;
    },

    isUserSaved : function() {
        return storedUsers.isUserSaved;
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case userConstants.SAVE_USER_RESPONSE:
            var user = payload.action.user;

            if(typeof user.error === 'undefined') {
                storedUsers.singleUser = user;
                storedUsers.isUserSaved = true;
            }
            else {
                storedUsers.userError = user.error;
                storedUsers.isUserSaved = true;
            }
            break;

        case userConstants.FALSIFY_IS_USER_SAVED:
            storedUsers.isUserSaved = false;
            break;

        case userConstants.FALSIFY_IS_USER_ERROR:
            storedUsers.userError = null;
    }

    userStore.emitChange();

    return true;
});

module.exports = userStore;