var router = require('express').Router();
var playerPositionRepository = require('../../data/playerPositionRepository.js');

router.get('/:gameId/:playerId/:page', function(req, res) {
    playerPositionRepository.getPlayerPositions(req.params.gameId, req.params.playerId, req.params.page, function(result) {
        res.json(result);
    });
});

module.exports = router;