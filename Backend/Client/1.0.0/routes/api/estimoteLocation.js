var express = require('express'),
    router = express.Router(),
    EstimoteLocation = require('../../models/EstimoteLocation.js'),
    estimoteLocationRepository = require('../../data/estimoteLocationRepository.js'),
    authenticator = require('../../modules/authenticator.js');

//GET: get EstimoteLocation by id
router.get('/:method/:value', function(req, res) {
   //Get id
    if(req.params.method === 'id') {
        var id = req.params.value;
        estimoteLocationRepository.getSingle(id, function(result) {
            res.json(result);
        });
    }

    else if(req.params.method === 'estimoteLocationId') {
        var estimoteLocationId = req.params.value;
        estimoteLocationRepository.getByEstimoteLocationId(estimoteLocationId, function(result) {
            res.json(result);
        });
    }
});

//GET: get all EstimoteLocations
router.get('/', authenticator, function(req, res) {
    estimoteLocationRepository.getAll(function(result) {
        res.json(result);
    });
});

//POST: insert new game
router.post('/', authenticator, function(req, res) {
    var estimoteLocationId = req.body.estimoteLocationId;
    var spaceWidth = req.body.spaceWidth;
    var spaceHeight = req.body.spaceHeight;
    var newEstimoteLocation = new EstimoteLocation(estimoteLocationId, spaceWidth, spaceHeight);
    estimoteLocationRepository.add(newEstimoteLocation, function(result) {
        res.json(result);
    });
});

module.exports = router;