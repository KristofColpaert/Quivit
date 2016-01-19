var userValidator = function(req, res, next) {
    'use strict';

    //Check new User
    if(!req.body.email || req.body.email === '') {
        res.json({error : 'Please check email'});
    }

    else if(!req.body.email.match(/^[A-Za-z0-9._-]+[@][A-Za-z0-9_-]+[.][A-Za-z0-9._]+$/)){
        res.json({error : 'Please check email'});
    }

    else if(!req.body.password || req.body.password === ''){
        res.json({error : 'Please check password'});
    }

    else {
        next();
    }
};

module.exports = userValidator;