'use strict';

var expect = require('chai').expect;
var estimoteLocationRepository = require('../../data/estimoteLocationRepository.js');
var EstimoteLocation = require('../../models/EstimoteLocation.js');

/*
** Unit tests testing the EstimoteLocation repository.
 */

describe('Test of the EstimoteLocation repository.', function() {
    var newEstimoteLocation = new EstimoteLocation('estimoteLocationHome', '100', '100');
    var addedEstimoteLocation = null;

    describe('Testing the insertion of an EstimoteLocation.', function() {
        before(function(done) {
            estimoteLocationRepository.add(newEstimoteLocation, function(insertionResult) {
                addedEstimoteLocation = insertionResult;
                done();
            });
        });

        it('Newly added EstimoteLocation should not be undefined.', function(done) {
            expect(addedEstimoteLocation).to.not.be.undefined;
            done();
        });

        it('Newly added EstimoteLocation should have estimoteLocationId "estimoteLocationHome".', function(done) {
            expect(addedEstimoteLocation.estimoteLocationId).to.equal('estimoteLocationHome');
            done();
        });

        it('Getting newly added EstimoteLocation should result in an object.', function(done) {
            estimoteLocationRepository.getByEstimoteLocationId('estimoteLocationHome', function(queryResult) {
                expect(queryResult[0].estimoteLocationId).to.equal('estimoteLocationHome');
                done();
            });
        });
    });

    describe('Testing the deletion of an EstimoteLocation.', function() {
        it('EstimoteLocation should be deleted.', function(done) {
            estimoteLocationRepository.remove(addedEstimoteLocation._id, function(deletionResult) {
                expect(deletionResult).to.not.be.undefined;
                done();
            });
        });
    });

    describe('Testing the reception of all estimoteLocations.', function() {
        it('Should have more than one item.', function(done) {
            estimoteLocationRepository.getAll(function(queryResult) {
                expect(queryResult.length).to.be.at.least(1);
                done();
            });
        });
    });
});