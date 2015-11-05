var net = require('net'),
    client1,
    client2,
    trilaterate = require("./trilaterate.js");

var test1 = [];
var test2 = [];

/**
 * Configuration of client1.
 */
client1 = net.connect(1337, '192.168.0.191', function() {
    console.log('Client1 maakt een connectie');
});

client1.on('data', function(data) {
    var beaconString = data.toString('utf8');
    var beaconArray = beaconString.split(';');

    for(var i = 0, l = beaconArray.length - 1; i < l; i++) {
        var beaconObject = JSON.parse(beaconArray[i]);
        //console.log(beaconObject.beacon.major+ ": " + (Math.round(beaconObject.beacon.accuracy * 100) / 100));

        if(beaconObject.beacon.major = '56796') {
            if(test1.length < 20) {
                test1.push(beaconObject.beacon.accuracy);
            }
            else {
                test1.shift();
                test1.push(beaconObject.beacon.accuracy);
            }
            checkDistance();
        }
    }
});

/**
 * Configuration of client2.
 */
client2 = net.connect(1337, '192.168.0.142', function() {
    console.log('Client2 maakt een connectie');
});

client2.on('data', function(data) {
    var beaconString = data.toString('utf8');
    var beaconArray = beaconString.split(';');

    for(var i = 0, l = beaconArray.length - 1; i < l; i++) {
        var beaconObject = JSON.parse(beaconArray[i]);
        //console.log(beaconObject.beacon.major+ ": " + (Math.round(beaconObject.beacon.accuracy * 100) / 100));

        if(beaconObject.beacon.major = '56796') {
            if(test2.length < 20) {
                test2.push(beaconObject.beacon.accuracy);
            }
            else {
                test2.shift();
                test2.push(beaconObject.beacon.accuracy);
            }
            checkDistance();
        }
    }
});

var checkDistance = function() {
    var sum1 = 0;
    test1.forEach(function(element) {
        sum1 += element;
    });
    var avg1 = sum1/20;

    var sum2 = 0;
    test2.forEach(function(element) {
        sum2 += element;
    });
    var avg2 = sum2/20;

    console.log(avg1);
    console.log(avg2);

    avg1 = avg1 * 2;
    avg2 = avg2 * 2;

    console.log(avg1);
    console.log(avg2);

    var p1 = {x : 0, y : 0, z : 0, r : avg1};
    var p2 = {x : 5, y : 3, z : 0, r : avg2};
    var p3 = {x : 2.5, y : 1.5, z : 0, r : 2};
    var test = new trilaterate(p1, p2, p3);

    console.log(test);
};