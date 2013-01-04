
var simplego = require('../'),
    assert = require('assert');

// Colors defined

assert.ok(simplego.White);
assert.ok(simplego.Black);
    
// create game with initial board

var game = simplego.createGame();
assert.ok(game);

var positions = game.getPositions();

assert.ok(positions);
assert.equal(positions.length, 0);

