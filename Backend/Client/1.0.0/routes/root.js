var path = require('path'),
    express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    res.sendFile(path.resolve('./public/index.html'));
});

module.exports = router;