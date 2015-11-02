/**
 * Created by kristofcolpaert on 02/11/15.
 */

var bleacon = require('bleacon');

bleacon.on('discover', function(bleacon) {
    console.log(bleacon);
});
bleacon.startScanning();