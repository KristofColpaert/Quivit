'use strict';

var expect = require('chai').expect;
var teamRepository = require('../../data/teamRepository.js');
var Team = require('../../models/Team.js');

/*
** Unit tests testing the Team repository.
 */

describe('Test of the Team repository.', function() {
    var newTeam = new Team('TestTeam', '#FFFFFFF', '#FFFFFF');
    var addedTeam = null;

    describe('Testing the insertion of a Team.', function() {
        before(function(done) {
            teamRepository.add(newTeam, function(insertionResult) {
                addedTeam = insertionResult;
                done();
            });
        });

        it('Newly added team should not be undefined.', function(done) {
            expect(addedTeam).to.not.be.undefined;
            done();
        });
    });

    describe('Testing the deletion of a Team.', function() {
        it('Team should be deleted.', function(done) {
            teamRepository.remove(addedTeam._id, function(deletionResult) {
                expect(deletionResult).to.not.be.undefined;
                done();
            });
        });
    });

    describe('Testing the reception of all teams.', function() {
        it('Should have more than one item.', function(done) {
            teamRepository.getAll(function(queryResult) {
                expect(queryResult.length).to.be.at.least(1);
                done();
            });
        });
    });
});