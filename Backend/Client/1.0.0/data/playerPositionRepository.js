var playerPositionRepository = (function() {
    //Variables
    var constants = require('./constants.js');
    var mongoskin = require('mongoskin');
    var errorLogger = require('../modules/errorLogger.js');
    var db = mongoskin.db(constants.DATABASE_URL, {safe : true});
    var ObjectID = require('mongoskin').ObjectID;

    //Functions
    var getNumberOfPositionsInZones = function(gameId, playerId, zones, callback) {
        var collectionName = '' + gameId + playerId;

        //EventEmitter hack
        var dbCollection = db.collection(collectionName);
        dbCollection._emitter._maxListeners = 150;

        var counts = [];
        zones.forEach(function(zone) {
            dbCollection.count({ x : { $gt : zone.minX, $lt : zone.maxX}, y : { $gt : zone.minY, $lt : zone.maxY }}, function(error, count) {
                if(error) {
                    errorLogger.log(error);
                }
                else {
                    var countObject = {
                        minX : zone.minX,
                        minY : zone.minY,
                        maxX : zone.maxX,
                        maxY : zone.maxY,
                        count : count
                    };
                    counts.push(countObject);
                }

                if(counts.length === zones.length) {
                    callback(counts);
                }
            });
        });
    };

    var getPlayerPositions = function(gameId, playerId, page, callback){
        var collectionName = gameId + playerId;
        db.collection(collectionName).find({}).sort({ timestamp : 1 }).skip(page * 500).limit(500).toArray(function(error, data) {
            if(error) {
                errorLogger.log(error);
            }
            else {
                callback(data);
            }
        });
    };

    var add = function(newPlayerPosition){
        db.collection(newPlayerPosition.toString()).insert(newPlayerPosition, function(error, result){
            if(error) {
                errorLogger.log(error);
            }
        });
    };

    //Return
    return {
        getNumberOfPositionsInZones : getNumberOfPositionsInZones,
        getPlayerPositions : getPlayerPositions,
        add : add
    };
})();

module.exports = playerPositionRepository;