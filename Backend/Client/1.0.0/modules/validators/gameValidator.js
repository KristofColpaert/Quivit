var gameValidator = function(req, res, next) {
    'use strict';

    //Variables
    var tempYear = req.body.gameDate.substr(0, 4);
    var tempMonth = req.body.gameDate.substr(4, 2);
    var tempDate = req.body.gameDate.substr(6, 2);
    var newDate = new Date(tempYear, tempMonth, tempDate);

    //Check new Game
    if(!req.body.teamHomeId || req.body.teamHomeId === '') {
        res.json({error : 'Please check the teamHomeId'});
    }

    else if(!req.body.gameDate || req.body.gameDate === '' || isNaN(req.body.gameDate)) {
        res.json({error : 'Please check the gameDate'});
    }

    else if(!newDate) {
        res.json({error : 'Please check the gameDate'});
    }

    else if(!req.body.gameTime || req.body.gameTime === '' || isNaN(req.body.gameTime) || req.body.gameTime.length > 4) {
        res.json({error : 'Please check the gameTime'});
    }

    else if(!req.body.estimoteLocationId || req.body.estimoteLocationId === '') {
        res.json({error : 'Please check the estimoteLocationId'});
    }

    else if(!req.body.teamAwayId || req.body.teamAwayId === '') {
        res.json({error : 'Please check the teamAwayId'});
    }

    else if(!req.body.image || req.body.image === '') {
        res.json({error : 'Please check the gameImage'});
    }

    else {
        next();
    }
};

module.exports = gameValidator;