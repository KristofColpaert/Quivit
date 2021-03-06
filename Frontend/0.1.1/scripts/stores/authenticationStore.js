var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    EventEmitter = require('events').EventEmitter,
    objectAssign = require('object-assign'),
    authenticationConstants = require('../helpers/authenticationConstants.js');

var CHANGE_EVENT = 'change';

//Stored objects
var storedAuthenticationData = {
    token : null
}

//AuthenticationStore
var authenticationStore = objectAssign({}, EventEmitter.prototype, {
    emitChange : function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener : function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener : function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getToken : function() {
        return storedAuthenticationData.token;
    },

    isUserLoggedIn : function() {
        if(storedAuthenticationData.token === null) {
            var localStorageTokenInit = new Date(window.localStorage.getItem('tokenInit'));
            var currentDate = new Date();
            var dateDifference = currentDate.getTime() - localStorageTokenInit.getTime();

            if(dateDifference < 86400000) {
                var localStorageToken = window.localStorage.getItem('token');
                storedAuthenticationData.token = localStorageToken;
                return true;
            }

            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case authenticationConstants.LOGIN_RESPONSE:
            //Save token
            storedAuthenticationData.token = payload.action.token;
            window.localStorage.setItem('token', payload.action.token);
            window.localStorage.setItem('tokenInit', new Date());
            break;
    }

    authenticationStore.emitChange();

    return true;
});

module.exports = authenticationStore;