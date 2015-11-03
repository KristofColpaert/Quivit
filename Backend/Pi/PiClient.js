var net = require('net'),
    client;

client = net.connect(1337, 'localhost', function() {
   console.log('Client maakt een connectie');
});

client.on('data', function(data) {
   console.log(data.toString('utf8'));
});