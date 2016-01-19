var playerValidator = function(req, res, next) {
    'use strict';

    //Check new player
    if(!req.body.firstName || req.body.firstName === '') {
        res.json({error : 'Please check firstName'});
    }

    else if(!req.body.lastName || req.body.lastName === '') {
        res.json({error : 'Please check lastName'});
    }

    else if(!req.body.kitNumber || req.body.kitNumber === '' || isNaN(req.body.kitNumber)){
        res.json({error : 'Please check kitNumber'});
    }

    else if(!req.body.teamId || req.body.teamId === '') {
        res.json({error : 'Please check teamId'});
    }

    else {
        next();
    }
};

module.exports = playerValidator;