var userRepository = (function() {
    'use strict';

    //Variables
    var constants = require('./constants.js');
    var mongoskin = require('mongoskin');
    var errorLogger = require('../modules/errorLogger.js');
    var db = mongoskin.db(constants.DATABASE_URL, {safe : true});
    var ObjectID = require('mongoskin').ObjectID;
    var hashHelper = require('../modules/hashHelper.js');

    //Functions
    var getSingle = function(id, callback) {
        db.collection('users').find({ _id : ObjectID(id) }).toArray(function(error, result) {
            if(error) {
                errorLogger.log(error);
            }

            else {
                callback(result);
            }
        });
    };

    var getAll = function(callback) {
        db.collection('users').find().toArray(function(error, result) {
            if(error) {
                errorLogger.log(error);
            }

            else {
                callback(result);
            }
        });
    };

    //Authentication method
    var getByEmail = function(email, callback) {
        db.collection('users').find({ email : email }).toArray(function(error, result) {
            if(error) {
                errorLogger.log(error);
                callback(error, result);
            }

            else {
                callback(null, result);
            }
        });
    };

    var add = function(newUser, callback) {
        //Hash password
        hashHelper.hash(newUser.password, function(hashError, hashResult) {
            if(!hashError) {
                //Set hashed password
                newUser.password = hashResult;

                //Check unique
                getByEmail(newUser.email, function(existingError, existingResult) {
                    if(!existingError) {
                        if(existingResult.length > 0) {
                            callback({ error : 'User already in database' }, null);
                        }

                        else {
                            db.collection('users').insert(newUser, function(savingError, savingResult) {
                                if(savingError) {
                                    errorLogger.log(savingError);
                                    callback({ error : 'Saving faled'}, null);
                                }

                                else {
                                    var userId = savingResult.insertedIds[0];
                                    var resultObject = newUser.toJSON();
                                    resultObject._id = userId;
                                    callback(null, resultObject);
                                }
                            });
                        }
                    }

                    else {
                        errorLogger.log(existingError);
                        callback({ error : 'User not found' }, null);
                    }
                });
            }
            else {
                errorLogger.log(hashError);
                callback({ error : 'Hashing failed' }, null);
            }
        });
    };

    //Return
    return {
        getSingle : getSingle,
        getAll : getAll,
        getByEmail : getByEmail,
        add : add
    };
})();

module.exports = userRepository;