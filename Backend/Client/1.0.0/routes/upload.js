var express = require('express'),
    router = express.Router(),
    constants = require('../data/constants.js'),
    azure = require('azure'),
    shortid = require('shortid');

router.get('/', function(req, res) {
    console.log('hier');
});

router.post('/', function(req, res) {
    var blobService = azure.createBlobService(constants.AZURE_STORAGE_ACCOUNT, constants.AZURE_STORAGE_ACCESS_KEY);

    var name = shortid.generate();

    blobService.createBlockBlobFromLocalFile('quivitimages', name, req.files.image.path, function(error, result, response) {
        var newImage = { url : constants.AZURE_STORAGE_BASE_URL + result.blob };
        res.json(newImage);
    });
});

module.exports = router;