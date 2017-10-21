
var simplego = require('../');

exports['colors defined'] = function (test) {
	test.ok(simplego.White);
	test.ok(simplego.Black);
}
    
exports['create game with initial board'] = function (test) {
	var game = simplego.game();
	test.ok(game);

	var positions = game.positions();

	test.ok(positions);
	test.equal(positions.length, 0);
}

exports['get on empty cell'] = function (test) {
	var game = simplego.game();
	
	test.equal(game.get(10, 10), null);
}

exports['get on cell with stone'] = function (test) {
	var game = simplego.game();
	
	game.play(10, 10, simplego.Black);
	
	test.deepEqual(game.get(10, 10), { color: simplego.Black });
}

exports['play black'] = function (test) {
	var game = simplego.game();

	game.play(3, 3, simplego.Black);

	var positions = game.positions();

	test.ok(positions);
	test.equal(positions.length, 1);
	test.equal(positions[0].x, 3);
	test.equal(positions[0].y, 3);
	test.equal(positions[0].color, simplego.Black);
}

exports['play black and white'] = function (test) {
	var game = simplego.game();

	game.play(3, 3, simplego.Black);
	game.play(2, 5, simplego.White);

	var positions = game.positions();

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
	var game = simplego.game();

	for (var x = 0; x < 19; x++)
		for (var y = 0; y < 19; y++) {
			test.ok(game.isValidPlay(x, y, simplego.White));
			test.ok(game.isValidPlay(x, y, simplego.Black));
		}
}

exports['is invalid on a stone'] = function (test) {
	var game = simplego.game();

	game.play(3, 3, simplego.Black);
	game.play(2, 5, simplego.White);

	test.ok(!game.isValidPlay(3, 3, simplego.White));
	test.ok(!game.isValidPlay(2, 5, simplego.White));
	test.ok(!game.isValidPlay(3, 3, simplego.Black));
	test.ok(!game.isValidPlay(2, 5, simplego.Black));
}


