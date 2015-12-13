var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    EventEmitter = require('events').EventEmitter,
    objectAssign = require('object-assign'),
    estimoteLocationConstants = require('../helpers/estimoteLocationConstants.js');

var CHANGE_EVENT = 'change';

//Stored objects
var storedEstimoteLocations = {
    isEstimoteLocationSaved : false,
    allEstimoteLocations : [],
    singleEstimoteLocation : {}
};

//EstimoteLocationStore
var estimoteLocationStore = objectAssign({}, EventEmitter.prototype, {
    emitChange : function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener : function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener : function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getAllEstimoteLocations : function() {
        return storedEstimoteLocations.allEstimoteLocations;
    },

    getSingleEstimoteLocation : function() {
        return storedEstimoteLocations.singleEstimoteLocation;
    },

    isEstimoteLocationSaved : function() {
        return storedEstimoteLocations.isEstimoteLocationSaved;
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case estimoteLocationConstants.GET_ESTIMOTE_LOCATION_RESPONSE:
            storedEstimoteLocations.singleEstimoteLocation = payload.action.estimoteLocation;
            break;

        case estimoteLocationConstants.GET_ESTIMOTE_LOCATIONS_RESPONSE:
            storedEstimoteLocations.allEstimoteLocations = payload.action.estimoteLocations;
            break;

        case estimoteLocationConstants.GET_ESTIMOTE_LOCATION_BY_ESTIMOTE_LOCATION_ID_RESPONSE:
            storedEstimoteLocations.singleEstimoteLocation = payload.action.estimoteLocation;
            break;

        case estimoteLocationConstants.SAVE_ESTIMOTE_LOCATION_RESPONSE:
            var newEstimoteLocation = payload.action.estimoteLocation;
            storedEstimoteLocations.allEstimoteLocations.push(newEstimoteLocation);
            storedEstimoteLocations.isEstimoteLocationSaved = true;
            break;

        case estimoteLocationConstants.FALSIFY_IS_ESTIMOTE_LOCATION_SAVED:
            storedEstimoteLocations.isEstimoteLocationSaved = false;
            break;
    }

    estimoteLocationStore.emitChange();

    return true;
});

module.exports = estimoteLocationStore;