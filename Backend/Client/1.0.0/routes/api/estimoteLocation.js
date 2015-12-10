var express = require('express'),
    router = express.Router(),
    EstimoteLocation = require('../../models/EstimoteLocation.js'),
    estimoteLocationRepository = require('../../data/estimoteLocationRepository.js');

//GET: get EstimoteLocation by id
router.get('/:id', function(req, res) {
   //Get id
    var id = req.params.id;
    estimoteLocationRepository.getSingle(id, function(result) {
        res.json(result);
    });
});

//GET: get all EstimoteLocations
router.get('/', function(req, res) {
    estimoteLocationRepository.getAll(function(result) {
        res.json(result);
    });
});

//POST: insert new game
router.post('/', function(req, res) {
    var estimoteLocationId = req.body.estimoteLocationId;
    var spaceWidth = req.body.spaceWidth;
    var spaceHeight = req.body.spaceHeight;
    var newEstimoteLocation = new EstimoteLocation(estimoteLocationId, spaceWidth, spaceHeight);
    estimoteLocationRepository.add(newEstimoteLocation, function(result) {
        res.json(result);
    });
});

module.exports = router;