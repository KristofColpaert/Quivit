var estimoteLocationRepository = (function() {
    'use strict';

    //Variables
    var constants = require('./constants.js');
    var mongoskin = require('mongoskin')
    var db = mongoskin.db(constants.DATABASE_URL, {safe : true});
    var errorLogger = require('../modules/errorLogger.js');
    var ObjectID = require('mongoskin').ObjectID;

    //Functions
    var getSingle = function(id, callback) {
        db.collection('estimoteLocations').find({ _id : ObjectID(id) }).toArray(function(error , result) {
            if(error) {
                errorLogger.log('database', error);
            }
            else {
                callback(result);
            }
        });
    };
})();