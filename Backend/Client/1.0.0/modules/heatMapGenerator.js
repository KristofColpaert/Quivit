var heatMapGenerator = (function(){
    'use strict';

    //Variables
    var playerPositionRepository = require('../data/playerPositionRepository.js');
    var estimoteLocationRepository = require('../data/estimoteLocationRepository.js');
    var gameRepository = require('../data/gameRepository.js');
    var async = require('async');

    var gameId;
    var playerId;

    //Functions
    var getHeatMapData = function(tempGameId, tempPlayerId, callback) {
        gameId = tempGameId;
        playerId = tempPlayerId;

        async.waterfall(
            [
                loadGame,
                loadEstimoteLocation,
                calculateZones,
                calculateHeatMapCounts
            ],
            function(error, result) {
                callback(error, result);
            }
        )
    };

    var loadGame = function(callback) {
        gameRepository.getSingle(gameId, function(gameResult) {
            callback(null, gameResult[0].estimoteLocationId);
        });
    };

    var loadEstimoteLocation = function(estimoteLocationId, callback) {
        estimoteLocationRepository.getByEstimoteLocationId(estimoteLocationId, function(estimoteLocationResult) {
            callback(null, estimoteLocationResult[0]);
        });
    };

    var calculateZones = function(estimoteLocation, callback) {
        var zoneWidth = estimoteLocation.spaceWidth / 10;
        var zoneHeight = estimoteLocation.spaceHeight / 10;
        var widthMappingFactor = estimoteLocation.spaceWidth / 2;
        var heightMappingFactor = estimoteLocation.spaceHeight / 2;
        var zones = [];

        for(var i = 0; i < 10; i++) {
            var minX = (0 - widthMappingFactor) + (i * zoneWidth);
            var maxX = minX + zoneWidth;

            for(var j = 0; j < 10; j++) {
                var minY = (0 - heightMappingFactor) + (j * zoneHeight);
                var maxY = minY + zoneHeight;

                var zone = {
                    minX : minX,
                    minY : minY,
                    maxX : maxX,
                    maxY : maxY
                };
                zones.push(zone);
            }
        }
        callback(null, zones);
    };

    var calculateHeatMapCounts = function(zones, callback) {
        playerPositionRepository.getNumberOfPositionsInZones(gameId, playerId, zones, function(playerPositionResult) {
            playerPositionResult.sort(comparePlayerPositionObjects);
            callback(null, playerPositionResult);
        });
    };

    var comparePlayerPositionObjects = function(a, b) {
        if(a.count < b.count) {
            return -1;
        }

        if(a.count > b.count) {
            return 1;
        }

        return 0;
    }


    //Return
    return {
        getHeatMapData : getHeatMapData
    };
})();

module.exports = heatMapGenerator;