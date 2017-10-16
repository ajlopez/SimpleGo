
var simplego = require('../');
    
exports['create board'] = function (test) {
	var board = simplego.board();
	test.ok(board);
	test.equal(board.width(), 19);
	test.equal(board.height(), 19);
}

exports['get no positions from empty board'] = function (test) {
	var board = simplego.board();
	var positions = board.positions();

	test.ok(positions);
	test.equal(positions.length, 0);
}

