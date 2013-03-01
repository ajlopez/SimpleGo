
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

// play black

game.play(3, 3, simplego.Black);

var positions = game.getPositions();

assert.ok(positions);
assert.equal(positions.length, 1);
assert.equal(positions[0].x, 3);
assert.equal(positions[0].y, 3);
assert.equal(positions[0].content.color, simplego.Black);

// play white

game.play(2, 5, simplego.White);

var positions = game.getPositions();

assert.ok(positions);
assert.equal(positions.length, 2);
assert.equal(positions[0].x, 3);
assert.equal(positions[0].y, 3);
assert.equal(positions[0].content.color, simplego.Black);
assert.equal(positions[1].x, 2);
assert.equal(positions[1].y, 5);
assert.equal(positions[1].content.color, simplego.White);


