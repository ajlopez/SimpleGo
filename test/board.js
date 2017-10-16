
var simplego = require('../');
    
exports['create board'] = function (test) {
	var board = simplego.board();
	test.ok(board);
	test.equal(board.getWidth(), 19);
	test.equal(board.getHeight(), 19);
}

exports['get no positions from empty board'] = function (test) {
	var board = simplego.board();
	var positions = board.getPositions();

	test.ok(positions);
	test.equal(positions.length, 0);
}

