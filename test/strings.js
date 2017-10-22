
var simplego = require('../');

exports['get string from empty cell'] = function (test) {
	var game = simplego.game();
	
	test.equal(game.string(3, 3), null);
}

exports['get string from cell with stone'] = function (test) {
	var game = simplego.game();
	
	game.play(3, 3, simplego.Black)
	
	var string = game.string(3, 3);
	
	test.ok(string);
	test.equal(string.stones().length, 1);
	test.deepEqual(string.stones()[0], { x: 3, y: 3, color: simplego.Black });
}

exports['get string from cell with stone and neighbor stone'] = function (test) {
	var game = simplego.game();
	
	game.play(3, 3, simplego.Black)
	game.play(4, 3, simplego.Black)
	
	var string = game.string(3, 3);
	
	test.ok(string);
	test.equal(string.stones().length, 2);
	test.deepEqual(string.stones()[0], { x: 3, y: 3, color: simplego.Black });
	test.deepEqual(string.stones()[1], { x: 4, y: 3, color: simplego.Black });
}

