var net = require('net'),
    jsonHeal = require('json-heal'),
    client1,
    client2;
/**
 * Configuration of client1.
 */
client1 = net.connect(1337, '192.168.0.191', function() {
    console.log('Client1 maakt een connectie');
});

client1.on('data', function(data) {
    //var distance = getDistance(JSON.parse(data.toString('utf8')));
});

/**
 * Configuration of client2.
 */
client2 = net.connect(1337, '192.168.0.142', function() {
    console.log('Client2 maakt een connectie');
});

client2.on('data', function(data) {
    var beaconString = data.toString('utf8');
    var beaconArray = beaconString.split(/(\}\})/);

    //console.log(beaconArray);

    for(i = 0, l = beaconArray.length; i < l; i++) {
        var beaconObject = beaconArray[i];

        if(beaconObject !== '}}' && beaconObject !== '') {
            console.log(beaconObject);
        }
    }
});

var getDistance = function(data) {
    var rssi = data.beacon.rssi;
    console.log(rssi);
};