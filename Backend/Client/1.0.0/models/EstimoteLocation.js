var EstimoteLocation = function(estimoteLocationId, spaceWidth, spaceHeight) {
    'use strict';

    var self = this;

    this.estimoteLocationId = estimoteLocationId;
    this.spaceWidth = spaceWidth;
    this.spaceHeight = spaceHeight;
};
EstimoteLocation.prototype = {
    toJSON : function() {
        return {
            estimoteLocationId : this.estimoteLocationId,
            spaceWidth : this.spaceWidth,
            spaceHeight : this.spaceHeight
        };
    }
};

module.exports = EstimoteLocation;