var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    EventEmitter = require('events').EventEmitter,
    objectAssign = require('object-assign'),
    estimoteLocationConstants = require('../helpers/estimoteLocationConstants.js');

var CHANGE_EVENT = 'change';

//Stored objects
var storedEstimoteLocations = {
    isEstimoteLocationSaved : false,
    allEstimoteLocations : [],
    singleEstimoteLocation : []
};

var estimoteLocationStore = objectAssign({}, EventEmitter.prototype, {

});

module.exports = estimoteLocationStore;