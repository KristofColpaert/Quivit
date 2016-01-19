var teamValidator = function(req, res, next) {
    'use strict';

    //Validate new Team
    if(!req.body.name || req.body.name === '') {
        res.json({error : 'Please check name'});
    }

    else if(!req.body.primaryColor || req.body.primaryColor === '') {
        res.json({error : 'Please check primaryColor'});
    }

    else if(!req.body.primaryColor.match(/[#]{1}[0-9A-F]{3,6}/)) {
        res.json({error : 'Please check primaryColor'});
    }

    else if(!req.body.secondaryColor || req.body.secondaryColor === '') {
        res.json({error : 'Please check secondaryColor'});
    }

    else if(!req.body.secondaryColor.match(/[#]{1}[0-9A-F]{3,6}/)) {
        res.json({error : 'Please check secondaryColor'});
    }

    else {
        next();
    }
};

module.exports = teamValidator;