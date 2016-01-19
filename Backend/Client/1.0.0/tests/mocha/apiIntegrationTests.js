'use strict';

//Variables
var expect = require('chai').expect;
var http = require('http');

//Options for http-client
var options = {
    host : 'localhost',
    port : process.env.PORT || 3000,
    method : 'GET'
};

/*
** Testing Teams API
 */

describe('Testing Teams API.', function() {
    it('Call to Teams API should return multiple teams.', function(done) {
        options.path = '/api/team';
        var req = http.request(options, function(res) {
            var data = '';
            res.on('data', function(chunck) {
                data += chunck;
            });

            res.on('end', function() {
                expect(data.length).to.be.at.least(1);
                done();
            });
        }).end();
    });
});

describe('Testing Games API.', function() {
    it('Call to Past Games API should return multiple games.', function(done) {
        var tempYear = new Date().getFullYear();
        var tempMonth = ((new Date().getMonth() + 1) < 10 ? ('0' + (new Date().getMonth() + 1)) : (new Date().getMonth() + 1));
        var tempDate = ((new Date().getDate()) < 10 ? ('0' + (new Date().getDate())) : (new Date().getDate()));
        options.path = '/api/game/' + tempYear + '/' + tempMonth + '/' + tempDate + '/past';
        var req = http.request(options, function(res) {
            var data = '';
            res.on('data', function(chunck) {
                data += chunck;
            });

            res.on('end', function() {
                expect(data.length).to.be.at.least(1);
                done();
            });
        }).end();
    });

    it('Call to Todays Games API should return an array.', function(done) {
        var tempYear = new Date().getFullYear();
        var tempMonth = ((new Date().getMonth() + 1) < 10 ? ('0' + (new Date().getMonth() + 1)) : (new Date().getMonth() + 1));
        var tempDate = ((new Date().getDate()) < 10 ? ('0' + (new Date().getDate())) : (new Date().getDate()));
        options.path = '/api/game/' + tempYear + '/' + tempMonth + '/' + tempDate + '/excluded';
        var req = http.request(options, function(res) {
            var data = '';
            res.on('data', function(chunck) {
                data += chunck;
            });

            res.on('end', function() {
                expect(data.length).to.not.be.undefined;
                done();
            });
        }).end();
    });

    it('Call to Future Games API should return an array.', function(done) {
        options.path = '/api/game/';
        var req = http.request(options, function(res) {
            var data = '';
            res.on('data', function(chunck) {
                data += chunck;
            });

            res.on('end', function() {
                expect(data.length).to.not.be.undefined;
                done();
            });
        }).end();
    });
});

describe('Testing Players API.', function() {
    it('Call to Players API should return multiple items.', function(done) {
        options.path = '/api/player';
        var req = http.request(options, function(res) {
            var data = '';
            res.on('data', function(chunck) {
                data += chunck;
            });

            res.on('end', function() {
                expect(data.length).to.be.at.least(1);
                done();
            });
        }).end();
    });
});

describe('Testing EstimoteLocations API.', function() {
    it('Call to Estimote Locations API should return multiple items.', function(done) {
        options.path = '/api/estimotelocation';
        var req = http.request(options, function(res) {
            var data = '';
            res.on('data', function(chunck) {
                data += chunck;
            });

            res.on('end', function() {
                expect(data.length).to.be.at.least(1);
                done();
            });
        }).end();
    });
});