
var simplego = require('../');

function contains(stones, stone) {
	for (var k = 0; k < stones.length; k++)
		if (stones[k].x === stone.x && stones[k].y === stone.y && stones[k].color === stone.color)
			return true;
	
	return false;
}

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
	test.ok(contains(string.stones(), { x: 3, y: 3, color: simplego.Black }));
	test.ok(contains(string.stones(), { x: 4, y: 3, color: simplego.Black }));
	
	test.equal(string, game.string(4,3));
}

exports['get string with five stones'] = function (test) {
	var game = simplego.game();
	
	game.play(2, 3, simplego.Black)
	game.play(3, 3, simplego.Black)
	game.play(4, 3, simplego.Black)
	game.play(3, 2, simplego.Black)
	game.play(3, 4, simplego.Black)
	
	var string = game.string(3, 3);
	
	test.ok(string);
	test.equal(string.stones().length, 5);
	
	test.ok(contains(string.stones(), { x: 3, y: 3, color: simplego.Black }));
	test.ok(contains(string.stones(), { x: 2, y: 3, color: simplego.Black }));
	test.ok(contains(string.stones(), { x: 4, y: 3, color: simplego.Black }));
	test.ok(contains(string.stones(), { x: 3, y: 2, color: simplego.Black }));
	test.ok(contains(string.stones(), { x: 3, y: 4, color: simplego.Black }));
	
	test.equal(string, game.string(4,3));
	test.equal(string, game.string(2,3));
	test.equal(string, game.string(3,2));
	test.equal(string, game.string(3,4));
}

exports['string union'] = function (test) {
	var game = simplego.game();
	
	game.play(3, 3, simplego.Black)
	game.play(5, 3, simplego.Black)
	
	var string = game.string(3, 3);
	
	test.ok(string);
	test.equal(string.stones().length, 1);
	test.deepEqual(string.stones()[0], { x: 3, y: 3, color: simplego.Black });
	
	var string = game.string(5, 3);
	
	test.ok(string);
	test.equal(string.stones().length, 1);
	test.deepEqual(string.stones()[0], { x: 5, y: 3, color: simplego.Black });
	
	game.play(4, 3, simplego.Black)

	var string = game.string(3, 3);
	
	test.ok(string);
	test.equal(string.stones().length, 3);
	test.ok(contains(string.stones(), { x: 3, y: 3, color: simplego.Black }));
	test.ok(contains(string.stones(), { x: 4, y: 3, color: simplego.Black }));
	test.ok(contains(string.stones(), { x: 5, y: 3, color: simplego.Black }));
}



