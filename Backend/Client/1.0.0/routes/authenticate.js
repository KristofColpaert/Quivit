var express = require('express'),
    router = express.Router(),
    userRepository = require('../data/userRepository.js'),
    hashHelper = require('../modules/hashHelper.js'),
    jsonWebToken = require('jsonwebtoken'),
    constants = require('../data/constants.js');

router.post('/', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    //Find user
    userRepository.getByEmail(email, function(error, userResult) {
        if(error) {
            res.json({ success : false, message : 'Authentication failed. User not found.' });
        }

        else if(userResult.length === 0) {
            res.json({ success : false, message : 'Authentication failed. User not found.' });
        }

        else {
            //Compare password hashes.
            hashHelper.compare(password, userResult[0].password, function(error, hashResult) {
                if(error) {
                    res.json({ success : false, message : 'Authentication failed.' });
                }

                else {
                    if(!hashResult) {
                        res.json({ success : false, message : 'Authentication faled. Wrong password.' });
                    }

                    //User is found and password is correct.
                    else {
                        //Create token
                        var token = jsonWebToken.sign(userResult, constants.SERVER_SECRET, {
                            expiresIn : 86400
                        });

                        res.json({
                            success : true,
                            message : 'Authentication success.',
                            token : token
                        });
                    }
                }
            });
        }
    });
});

module.exports = router;