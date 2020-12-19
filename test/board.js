
const simplego = require('../');

const Black = simplego.Black;
const White = simplego.White;
    
exports['create board'] = function (test) {
	const board = simplego.board();
    
	test.ok(board);
	test.equal(board.width(), 19);
	test.equal(board.height(), 19);
	test.equal(board.size(), 19 * 19);
}

exports['get no positions from empty board'] = function (test) {
	const board = simplego.board();
	const positions = board.positions();

	test.ok(positions);
	test.equal(positions.length, 0);
}

exports['get positions from board with initial position'] = function (test) {
	const board = simplego.board(19, 19, [
        '. . .',
        '. X O',
        '. . X'
    ]);
    
	const positions = board.positions();

	test.ok(positions);
	test.equal(positions.length, 3);
    
    test.deepEqual(board.get(1, 1), { x: 1, y:1, color: Black });
    test.deepEqual(board.get(2, 1), { x: 2, y:1, color: White });
    test.deepEqual(board.get(2, 2), { x: 2, y:2, color: Black });
}

exports['create default board with initial position'] = function (test) {
	const board = simplego.board([
        '. . .',
        '. X O',
        '. . X'
    ]);
    
    test.equal(board.width(), 19);
    test.equal(board.height(), 19);
    
	const positions = board.positions();

	test.ok(positions);
	test.equal(positions.length, 3);
    
    test.deepEqual(board.get(1, 1), { x: 1, y:1, color: Black });
    test.deepEqual(board.get(2, 1), { x: 2, y:1, color: White });
    test.deepEqual(board.get(2, 2), { x: 2, y:2, color: Black });
}

exports['valid and invalid cells'] = function (test) {
	const board = simplego.board();
	
	test.ok(board.valid(0, 0));
	test.ok(board.valid(18, 18));
	
	test.ok(!board.valid(-1, 0));
	test.ok(!board.valid(0, -1));
	test.ok(!board.valid(19, 0));
	test.ok(!board.valid(0, 19));
}
