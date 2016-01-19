var estimoteLocationValidator = function(req, res, next) {
    'use strict';

    //Check new EstimoteLocation
    if(!req.body.estimoteLocationId || req.body.estimoteLocationId === '') {
        res.json({error : 'Please check the estimoteLocationId'});
    }

    else if(!req.body.spaceWidth || req.body.spaceWidth === '' || isNaN(req.body.spaceWidth)) {
        res.json({error : 'Please check the spaceWidth'});
    }

    else if(!req.body.spaceHeight || req.body.spaceHeight === '' || isNaN(req.body.spaceHeight)) {
        res.json({error : 'Please check the spaceHeight'});
    }

    else {
        next();
    }
};

module.exports = estimoteLocationValidator;