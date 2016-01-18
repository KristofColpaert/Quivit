'use strict';

var expect = require('chai').expect;
var playerRepository = require('../../data/playerRepository.js');
var Player = require('../../models/Player.js');

/*
** Unit tests testing the Player repository.
 */

describe('Test of the Player Repository.', function() {
    var newPlayer = new Player('Test', 'Test', '10', '566997831d6979315414f45a');
    var addedPlayer = null;

    describe('Testing the insertion of a Player.', function() {
        before(function(done) {
            playerRepository.add(newPlayer, function(insertionResult) {
                addedPlayer = insertionResult;
                done();
            });
        });

        it('Newly added player should not be undefined.', function(done) {
            expect(addedPlayer).not.to.be.undefined;
            done();
        });

        it('Newly added player should call "Test Test".', function(done) {
            expect(addedPlayer.firstName).to.equal('Test');
            expect(addedPlayer.lastName).to.equal('Test');
            done();
        });

        it('Getting newly adeed team should have name "Test Test".', function(done) {
            playerRepository.getSingle(addedPlayer._id, function(queryResult) {
                expect(queryResult[0].firstName).to.equal('Test');
                expect(queryResult[0].lastName).to.equal('Test');
                done();
            });
        });

        it('Getting players by team of newly added, should result in at least one player.', function(done) {
            playerRepository.getByTeam(addedPlayer.teamId, function(queryResult) {
                expect(queryResult.length).to.be.at.least(1);
                done();
            });
        });
    });

    describe('Testing the deletion of a Player.', function() {
        it('Player should be deleted.', function(done) {
            playerRepository.remove(addedPlayer._id, function(deletionResult) {
                expect(deletionResult).not.to.be.undefined;
                done();
            });
        });
    });

    describe('Testing the reception of all players.', function() {
        it('Should have more than one item.', function(done) {
            playerRepository.getAll(function(queryResult) {
                expect(queryResult.length).to.be.at.least(1);
                done();
            });
        });
    });
});