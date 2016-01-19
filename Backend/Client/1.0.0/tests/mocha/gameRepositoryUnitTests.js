'use strict';

var expect = require('chai').expect;
var gameRepository = require('../../data/gameRepository.js');
var Game = require('../../models/Game.js');

/*
** Unit tests testing the Game repository.
 */

describe('Test of the Game repository.', function() {
    var newGame = new Game('20160101', '2000', '565d65929b971a0d10f9a5e0', '565d68fd9b971a0d10f9a5e1', '566ddcfd7d82440a0e3b7186', true, 1, 0, 'image.png');
    var addedGame = null;

    describe('Testing the insertion of a Game.', function() {
        before(function(done) {
            gameRepository.add(newGame, function(insertionResult) {
                addedGame = insertionResult;
                done();
            });
        });

        it('Newly added game should not be undefined.', function(done) {
            expect(addedGame).to.not.be.undefined;
            done();
        });

        it('Newly added game shoud have date "20160101".', function(done) {
            expect(addedGame.gameDate).to.equal('20160101');
            done();
        });

        it('Getting newly added game from database should result in an object.', function(done) {
            gameRepository.getSingle(addedGame._id, function(queryResult) {
                expect(queryResult[0].gameDate).to.equal('20160101');
                done();
            });
        });

        it('Adding to home score should result in a new home score.', function(done) {
            gameRepository.addToHomeScore(addedGame._id, function(insertionResult) {
                expect(insertionResult).to.equal(addedGame.scoreHome + 1);
                done();
            });
        });

        it('Adding to away score should result in a new away score.', function(done) {
            gameRepository.addToAwayScore(addedGame._id, function(insertionResult) {
                expect(insertionResult).to.equal(addedGame.scoreAway + 1);
                done();
            });
        });

        it('Selecting a game by this should return a result.', function(done) {
            gameRepository.getByDateIncluded('20160101', function(queryResult) {
                expect(queryResult.length).to.be.at.least(1);
                done();
            });
        });
    });

    describe('Testing the deletion of a Game.', function() {
        it('Game should be deleted.', function(done) {
            gameRepository.remove(addedGame._id, function(deletionResult) {
                expect(deletionResult).to.not.be.undefined;
                done();
            })
        });
    });

    describe('Testing the reception of Games.', function() {
        it('Should have past games.', function() {
            gameRepository.getPast('2016', '01', '01', function(queryResult) {
                expect(queryResult).to.not.be.undefined;
                expect(queryResult.length).to.be.at.least(1);
                done();
            });
        });
    });
});