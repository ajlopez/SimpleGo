
var simplego = require('../');
    
exports['create board'] = function (test) {
	var board = simplego.board();
	test.ok(board);
	test.equal(board.width(), 19);
	test.equal(board.height(), 19);
	test.equal(board.size(), 19 * 19);
}

exports['get no positions from empty board'] = function (test) {
	var board = simplego.board();
	var positions = board.positions();

	test.ok(positions);
	test.equal(positions.length, 0);
}

exports['valid and invalid cells'] = function (test) {
	var board = simplego.board();
	
	test.ok(board.valid(0, 0));
	test.ok(board.valid(18, 18));
	
	test.ok(!board.valid(-1, 0));
	test.ok(!board.valid(0, -1));
	test.ok(!board.valid(19, 0));
	test.ok(!board.valid(0, 19));
}
