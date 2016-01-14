var express = require('express'),
    path = require('path'),
    app = express();

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

module.exports = app;