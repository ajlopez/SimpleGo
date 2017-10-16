
var simplego = require('../');

exports['colors defined'] = function (test) {
	test.ok(simplego.White);
	test.ok(simplego.Black);
}
    
exports['create game with initial board'] = function (test) {
	var game = simplego.createGame();
	test.ok(game);

	var positions = game.getPositions();

	test.ok(positions);
	test.equal(positions.length, 0);
}


exports['play black'] = function (test) {
	var game = simplego.createGame();

	game.play(3, 3, simplego.Black);

	var positions = game.getPositions();

	test.ok(positions);
	test.equal(positions.length, 1);
	test.equal(positions[0].x, 3);
	test.equal(positions[0].y, 3);
	test.equal(positions[0].content.color, simplego.Black);
}

exports['plat black and white'] = function (test) {
	var game = simplego.createGame();

	game.play(3, 3, simplego.Black);
	game.play(2, 5, simplego.White);

	var positions = game.getPositions();

	test.ok(positions);
	test.equal(positions.length, 2);
	test.equal(positions[0].x, 3);
	test.equal(positions[0].y, 3);
	test.equal(positions[0].content.color, simplego.Black);
	test.equal(positions[1].x, 2);
	test.equal(positions[1].y, 5);
	test.equal(positions[1].content.color, simplego.White);
}

exports['is valid on empty'] = function (test) {
	var game = simplego.createGame();

	for (var x = 0; x < 19; x++)
		for (var y = 0; y < 19; y++) {
			test.ok(game.isValidPlay(x, y, simplego.White));
			test.ok(game.isValidPlay(x, y, simplego.Black));
		}
}

exports['is invalid on a stone'] = function (test) {
	var game = simplego.createGame();

	game.play(3, 3, simplego.Black);
	game.play(2, 5, simplego.White);

	test.ok(!game.isValidPlay(3, 3, simplego.White));
	test.ok(!game.isValidPlay(2, 5, simplego.White));
	test.ok(!game.isValidPlay(3, 3, simplego.Black));
	test.ok(!game.isValidPlay(2, 5, simplego.Black));
}


