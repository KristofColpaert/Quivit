var Dispatcher = require('flux').Dispatcher;

//Create dispatcher instance
var AppDispatcher = new Dispatcher();

AppDispatcher.handleViewAction = function(action) {
    var dispatchArguments = {
        source : 'VIEW_ACTION',
        action : action
    };

    if(this.isDispatching()) {
        window.setTimeout(() => {
            this.dispatch(dispatchArguments);
        });
    }

    else {
        this.dispatch(dispatchArguments);
    }
}

AppDispatcher.handleServerAction = function(action) {
    var dispatchArguments = {
        source : 'SERVER_ACTION',
        action : action
    };

    if(this.isDispatching()) {
        window.setTimeout(() => {
            this.dispatch(dispatchArguments);
        });
    }

    else {
        this.dispatch(dispatchArguments);
    }
}

module.exports = AppDispatcher;