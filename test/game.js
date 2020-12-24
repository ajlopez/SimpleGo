
const simplego = require('../');

exports['colors defined'] = function (test) {
	test.ok(simplego.White);
	test.ok(simplego.Black);
}
    
exports['create game with initial board'] = function (test) {
	const game = simplego.game();

	test.ok(game);

	const positions = game.positions();

	test.ok(positions);
	test.equal(positions.length, 0);
}

exports['get on empty cell'] = function (test) {
	const game = simplego.game();
	
	test.equal(game.get(10, 10), null);
}

exports['get on cell with stone'] = function (test) {
	const game = simplego.game();
	
	game.play(10, 10, simplego.Black);
	
	test.deepEqual(game.get(10, 10), { x: 10, y: 10, color: simplego.Black });
}

exports['play black'] = function (test) {
	const game = simplego.game();

	game.play(3, 3, simplego.Black);

	const positions = game.positions();

	test.ok(positions);
	test.equal(positions.length, 1);
	test.equal(positions[0].x, 3);
	test.equal(positions[0].y, 3);
	test.equal(positions[0].color, simplego.Black);
}

exports['play black and white'] = function (test) {
	const game = simplego.game();

	game.play(3, 3, simplego.Black);
	game.play(2, 5, simplego.White);

	const positions = game.positions();

	test.ok(positions);
	test.equal(positions.length, 2);
	test.equal(positions[0].x, 3);
	test.equal(positions[0].y, 3);
	test.equal(positions[0].color, simplego.Black);
	test.equal(positions[1].x, 2);
	test.equal(positions[1].y, 5);
	test.equal(positions[1].color, simplego.White);
}

exports['is valid on empty'] = function (test) {
	const game = simplego.game();

	for (let x = 0; x < 19; x++)
		for (let y = 0; y < 19; y++) {
			test.ok(game.isValidPlay(x, y, simplego.White));
			test.ok(game.isValidPlay(x, y, simplego.Black));
		}
}

exports['is invalid on a stone'] = function (test) {
	const game = simplego.game();

	game.play(3, 3, simplego.Black);
	game.play(2, 5, simplego.White);

	test.ok(!game.isValidPlay(3, 3, simplego.White));
	test.ok(!game.isValidPlay(2, 5, simplego.White));
	test.ok(!game.isValidPlay(3, 3, simplego.Black));
	test.ok(!game.isValidPlay(2, 5, simplego.Black));
}

exports['is valid play to form heavy group'] = function (test) {
	const game = simplego.game();

	game.play(3, 3, simplego.Black);
	game.play(3, 5, simplego.Black);
	game.play(2, 4, simplego.Black);
	game.play(4, 4, simplego.Black);

	test.ok(game.isValidPlay(3, 4, simplego.Black));
}

exports['is invalid commit one stone suicide'] = function (test) {
	const game = simplego.game();

	game.play(3, 3, simplego.Black);
	game.play(3, 5, simplego.Black);
	game.play(2, 4, simplego.Black);
	game.play(4, 4, simplego.Black);

	test.ok(!game.isValidPlay(3, 4, simplego.White));
}

exports['is invalid commit suicide one stone at corner'] = function (test) {
	const game = simplego.game();

	game.play(0, 1, simplego.Black);
	game.play(1, 0, simplego.Black);

	test.ok(!game.isValidPlay(0, 0, simplego.White));
}

exports['is invalid commit suicide one stone at border'] = function (test) {
	const game = simplego.game();

	game.play(0, 1, simplego.Black);
	game.play(1, 2, simplego.Black);
	game.play(0, 3, simplego.Black);

	test.ok(!game.isValidPlay(0, 2, simplego.White));
}

exports['is invalid commit two stone suicide'] = function (test) {
	const game = simplego.game();

	game.play(2, 3, simplego.Black);
	game.play(2, 5, simplego.Black);
	game.play(3, 3, simplego.Black);
	game.play(3, 5, simplego.Black);
	game.play(1, 4, simplego.Black);
	game.play(4, 4, simplego.Black);
	game.play(2, 4, simplego.White);

	test.ok(!game.isValidPlay(3, 4, simplego.White));
}

exports['is invalid commit three stone suicide'] = function (test) {
    const board = simplego.board([
        '....',
        '..O.',
        '.OXO',
        '.O.O',
        '.OXO',
        '..O.',
    ]);
    
    test.ok(!board.get(2,3));
    
	const game = simplego.game(board);

	test.ok(!game.isValidPlay(2, 3, simplego.Black));
}


exports['is valid commit three stone with one liberty'] = function (test) {
    const board = simplego.board([
        '....',
        '..O.',
        '.OXO',
        '.O.O',
        '.OXO',
        '....',
    ]);
    
    test.ok(!board.get(2,3));
    
	const game = simplego.game(board);

	test.ok(game.isValidPlay(2, 3, simplego.Black));
}

exports['play and kill one stone group'] = function (test) {
    const board = simplego.board([
        '....',
        '..O.',
        '.OXO',
        '....',
    ]);
    
    test.ok(!board.get(2,3));
    
	const game = simplego.game(board);

	test.ok(game.isValidPlay(2, 3, simplego.White));
    
    game.play(2, 3, simplego.White);
    
    test.equal(game.get(2, 2), null);
}

exports['play and kill two one stone groups'] = function (test) {
    const board = simplego.board([
        '....',
        '..O.',
        '.OXO',
        '.O.O',
        '.OXO',
        '..O.',
    ]);
    
    test.ok(!board.get(2,3));
    
	const game = simplego.game(board);

	test.ok(game.isValidPlay(2, 3, simplego.White));
    
    game.play(2, 3, simplego.White);
    
    test.equal(game.get(2, 2), null);
    test.equal(game.get(2, 4), null);
}

