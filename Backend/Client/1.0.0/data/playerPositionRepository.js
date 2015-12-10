var playerPositionRepository = (function() {
    //Variables
    var constants = require('./constants.js');
    var mongoskin = require('mongoskin');
    var errorLogger = require('../modules/errorLogger.js');
    var db = mongoskin.db(constants.DATABASE_URL, {safe : true});
    var ObjectID = require('mongoskin').ObjectID;

    //Functions
    var add = function(newPlayerPosition){
        db.collection(newPlayerPosition.toString()).insert(newPlayerPosition, function(error, result){
            if(error) {
                errorLogger.log(error);
            }
        });
    };

    //Return
    return {
        add : add
    };
})();

module.exports = playerPositionRepository;