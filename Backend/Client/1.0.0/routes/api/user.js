var express = require('express'),
    router = express.Router(),
    User = require('../../models/User.js'),
    userRepository = require('../../data/userRepository.js');

//GET: single user
router.get('/:id', function(req, res) {
    //Get id
    var id = req.params.id;
    userRepository.getSingle(id, function(result) {
        res.json(result);
    });
});

//GET: all users
router.get('/', function(req, res) {
    userRepository.getAll(function(result) {
        res.json(result);
    });
});

//POST: new user
router.post('/', function(req, res) {
    //Make new object
    var email = req.body.email;
    var password = req.body.password;
    var newUser = new User(email, password);
    userRepository.add(newUser, function(error, result){
        if(!error) {
            res.json(result);
        }

        else {
            res.json(error);
        }
    });
});

module.exports = router;