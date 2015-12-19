var User = function(email, password) {
    'use strict';

    var self = this;

    this.email = email;
    this.password = password;
}

User.prototype = {
    toString : function() {
        return this.email;
    },

    toJSON : function() {
        return {
            email : this.email,
            password : this.password
        };
    }
};

module.exports = User;