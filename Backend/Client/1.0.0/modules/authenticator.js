var authenticator = function(req, res, next) {
    'use strict';

    var jsonWebToken = require('jsonwebtoken');
    var constants = require('../data/constants.js');

    //CORS fix
    if(req.method === 'OPTIONS'){
        next();
    }

    //Check if authentication header is filled in
    else if(!req.headers['x-auth']) {
        res.status(401).json({
            success : false,
            message : 'No authentication token provided'
        });
    }

    else {
        var token = req.headers['x-auth'];

        if(token) {
            //Verify token
            jsonWebToken.verify(token, constants.SERVER_SECRET, function(error, decoded) {
                if(error) {
                    return res.status(401).json({
                        success : false,
                        message : 'Authentication with token failed'
                    });
                }

                else {
                    req.decoded = decoded;
                    next();
                }
            })
        }

        else {
            res.status(401).json({
                success : false,
                message : 'No authentication token provided'
            });
        }
    }
}

module.exports = authenticator;