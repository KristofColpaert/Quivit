/**
 * Created by kristofcolpaert on 10/11/15.
 */

var laterationCalculator = (function () {
    'use strict';

    //Variables
    var lateration = require('lateration');
    var Circle = lateration.Circle;
    var Vector = lateration.Vector;
    var laterationLaterate = lateration.laterate;

    //Function
    var laterate = function(positionObjects, callback) {
        if(positionObjects.length > 3) {
            constructBeacons(positionObjects, function(error, beacons) {
                if(error) {
                    callback(error, null);
                }

                else {
                    var position = laterationLaterate(beacons);
                    callback(null, position);
                }
            });
        }

        else {
            var error = "Three or more distances should be defined.";
            callback(error, null);
        }
    };

    var constructBeacons = function(postionObjects, callback) {
        if(postionObjects.length > 3) {
            var beacons = [];
            postionObjects.forEach(function(positionObject) {
                constructCircle(positionObject, function(error, circle) {
                    if(error) {
                        callback(error, null);
                    }

                    else {
                        beacons.push(circle);
                    }
                })
            });
            callback(null, beacons);
        }

        else {
            var error = "Three or more distances should be defined.";
            callback(error, null);
        }
    };

    var constructCircle = function(positionObject, callback) {
        if(positionObject) {
            var beaconCircle = new Circle(new Vector(positionObject.x, positionObject.y), positionObject.distance);
            callback(null, beaconCircle);
        }

        else {
            var error = "Position should be defined.";
            callback(error, null);
        }
    };

    //Return
    return {
        laterate : laterate
    };
})();

module.exports = laterationCalculator;