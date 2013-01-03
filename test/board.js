
var simplego = require('../'),
    assert = require('assert');
    
// create board

var board = simplego.createBoard();
assert.ok(board);
assert.equal(board.getWidth(), 19);
assert.equal(board.getHeight(), 19);

