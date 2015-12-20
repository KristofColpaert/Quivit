var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    estimoteLocationConstants = require('../helpers/estimoteLocationConstants.js'),
    constants = require('../helpers/urlConstants.js'),
    ajax = require('../helpers/ajax.js');

var estimoteLocationActions = {

    //EstimoteLocation by id
    getEstimoteLocationByIdResponse : function(estimoteLocation) {
        AppDispatcher.handleServerAction({
            actionType : estimoteLocationConstants.GET_ESTIMOTE_LOCATION_RESPONSE,
            estimoteLocation : estimoteLocation,
        });
    },

    getEstimoteLocationByIdRequest : function(id) {
        ajax.getData(constants.baseApiEstimoteLocationUrl + "id/" + id, function(error, data) {
            if(!error) {
                estimoteLocationActions.getEstimoteLocationByIdResponse(data[0]);
            }
        });
    },

    //EstimoteLocation by EstimoteLocationId
    getEstimoteLocationByEstimoteLocationIdResponse : function(estimoteLocation) {
        AppDispatcher.handleServerAction({
            actionType : estimoteLocationConstants.GET_ESTIMOTE_LOCATION_BY_ESTIMOTE_LOCATION_ID_RESPONSE,
            estimoteLocation : estimoteLocation
        });
    },

    getEstimoteLocationByEstimoteLocationIdRequest : function(estimoteLocationId) {
        ajax.getData(constants.baseApiEstimoteLocationUrl + "estimoteLocationId/" + estimoteLocationId, function(error, data) {
            if(!error) {
                estimoteLocationActions.getEstimoteLocationByEstimoteLocationIdResponse(data[0]);
            }
        });
    },

    //All EstimoteLocations
    getEstimoteLocationsResponse : function(estimoteLocations) {
        AppDispatcher.handleServerAction({
            actionType : estimoteLocationConstants.GET_ESTIMOTE_LOCATIONS_RESPONSE,
            estimoteLocations : estimoteLocations
        });
    },

    getEstimoteLocationsRequest : function() {
        ajax.getData(constants.baseApiEstimoteLocationUrl, function(error, data) {
            if(!error) {
                estimoteLocationActions.getEstimoteLocationsResponse(data);
            }
        });
    },

    //New EstimoteLocation
    saveEstimoteLocationResponse : function(estimoteLocation) {
        AppDispatcher.handleServerAction({
            actionType : estimoteLocationConstants.SAVE_ESTIMOTE_LOCATION_RESPONSE,
            estimoteLocation : estimoteLocation
        });
    },

    saveEstimoteLocationRequest : function(estimoteLocation) {
        estimoteLocation = JSON.stringify(estimoteLocation);
        ajax.saveData(constants.baseApiEstimoteLocationUrl, estimoteLocation, function(error, data) {
            if(!error) {
                estimoteLocationActions.saveEstimoteLocationResponse(data);
            }
        });
    },

    //Set saved to false
    falsifyIsEstimoteLocationSaved : function() {
        AppDispatcher.handleServerAction({
            actionType : estimoteLocationConstants.FALSIFY_IS_ESTIMOTE_LOCATION_SAVED
        });
    }
};

module.exports = estimoteLocationActions;