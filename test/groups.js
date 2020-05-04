
const simplego = require('../');

function contains(stones, stone) {
	for (let k = 0; k < stones.length; k++)
		if (stones[k].x === stone.x && stones[k].y === stone.y && stones[k].color === stone.color)
			return true;
	
	return false;
}

exports['get group from empty cell'] = function (test) {
	const game = simplego.game();
	
	test.equal(game.group(3, 3), null);
}

exports['get groups from empty game'] = function (test) {
	const game = simplego.game();
	
	const result = game.groups();
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 0);
}

exports['get group from cell with stone'] = function (test) {
	const game = simplego.game();
	
	game.play(3, 3, simplego.Black)
	
	const group = game.group(3, 3);
	
	test.ok(group);
	test.equal(group.stones().length, 1);
	test.deepEqual(group.stones()[0], { x: 3, y: 3, color: simplego.Black });
}

exports['get group union with itself'] = function (test) {
	const game = simplego.game();
	
	game.play(3, 3, simplego.Black)
	
	const group = game.group(3, 3);
	const result = group.union(group);
	
	test.ok(result);
	test.strictEqual(result, group);
}

exports['get group from cell with stone given board with initial position'] = function (test) {
	const board = simplego.board(19, 19, [
		'....',
		'....',
		'....',
		'...X'
	]);
	
	const game = simplego.game(board);
	
	const group = game.group(3, 3);
	
	test.ok(group);
	test.equal(group.stones().length, 1);
	test.deepEqual(group.stones()[0], { x: 3, y: 3, color: simplego.Black });
}

exports['get group from cell with stone and neighbor stone'] = function (test) {
	const game = simplego.game();
	
	game.play(3, 3, simplego.Black);
	game.play(4, 3, simplego.Black);
	
	const group = game.group(3, 3);
	
	test.ok(group);
	test.equal(group.stones().length, 2);
	test.ok(contains(group.stones(), { x: 3, y: 3, color: simplego.Black }));
	test.ok(contains(group.stones(), { x: 4, y: 3, color: simplego.Black }));
	
	test.equal(group, game.group(4,3));
}

exports['get same group from two stones'] = function (test) {
	const game = simplego.game();
	
	game.play(3, 3, simplego.Black);
	game.play(4, 3, simplego.Black);
	
	const group1 = game.group(3, 3);
	const group2 = game.group(4, 3);

	test.ok(group1 === group2);
}

exports['get groups from game with two stones in a group'] = function (test) {
	const game = simplego.game();
	
	game.play(3, 3, simplego.Black)
	game.play(4, 3, simplego.Black)
	
	const groups = game.groups();
	
	test.ok(groups);
	test.ok(Array.isArray(groups));
	test.equal(groups.length, 1);
	test.ok(contains(groups[0].stones(), { x: 3, y: 3, color: simplego.Black }));
	test.ok(contains(groups[0].stones(), { x: 4, y: 3, color: simplego.Black }));
}

exports['get groups from game with two stones with different colors'] = function (test) {
	const game = simplego.game();
	
	game.play(3, 3, simplego.Black);
	game.play(4, 3, simplego.White);
	
	const groups = game.groups();
	
	test.ok(groups);
	test.ok(Array.isArray(groups));
	test.equal(groups.length, 2);
	test.ok(contains(groups[0].stones(), { x: 3, y: 3, color: simplego.Black }));
	test.ok(contains(groups[1].stones(), { x: 4, y: 3, color: simplego.White }));
}

exports['get group with five stones'] = function (test) {
	const game = simplego.game();
	
	game.play(2, 3, simplego.Black)
	game.play(3, 3, simplego.Black)
	game.play(4, 3, simplego.Black)
	game.play(3, 2, simplego.Black)
	game.play(3, 4, simplego.Black)
	
	const group = game.group(3, 3);
	
	test.ok(group);
	test.equal(group.stones().length, 5);
	
	test.ok(contains(group.stones(), { x: 3, y: 3, color: simplego.Black }));
	test.ok(contains(group.stones(), { x: 2, y: 3, color: simplego.Black }));
	test.ok(contains(group.stones(), { x: 4, y: 3, color: simplego.Black }));
	test.ok(contains(group.stones(), { x: 3, y: 2, color: simplego.Black }));
	test.ok(contains(group.stones(), { x: 3, y: 4, color: simplego.Black }));
	
	test.equal(group, game.group(4,3));
	test.equal(group, game.group(2,3));
	test.equal(group, game.group(3,2));
	test.equal(group, game.group(3,4));
}

exports['group union'] = function (test) {
	const game = simplego.game();
	
	game.play(3, 3, simplego.Black)
	game.play(5, 3, simplego.Black)
	
	const group = game.group(3, 3);
	
	test.ok(group);
	test.equal(group.stones().length, 1);
	test.deepEqual(group.stones()[0], { x: 3, y: 3, color: simplego.Black });
	
	const group2 = game.group(5, 3);
	
	test.ok(group2);
	test.equal(group2.stones().length, 1);
	test.deepEqual(group2.stones()[0], { x: 5, y: 3, color: simplego.Black });
	
	game.play(4, 3, simplego.Black);

	const group3 = game.group(3, 3);
	
	test.ok(group3);
	test.equal(group3.stones().length, 3);
	test.ok(contains(group3.stones(), { x: 3, y: 3, color: simplego.Black }));
	test.ok(contains(group3.stones(), { x: 4, y: 3, color: simplego.Black }));
	test.ok(contains(group3.stones(), { x: 5, y: 3, color: simplego.Black }));
}

exports['group no union with different color'] = function (test) {
	const game = simplego.game();
	
	game.play(3, 3, simplego.Black)
	game.play(5, 3, simplego.Black)
	
	const group = game.group(3, 3);
	
	test.ok(group);
	test.equal(group.stones().length, 1);
	test.deepEqual(group.stones()[0], { x: 3, y: 3, color: simplego.Black });
	
	const group2 = game.group(5, 3);
	
	test.ok(group2);
	test.equal(group2.stones().length, 1);
	test.deepEqual(group2.stones()[0], { x: 5, y: 3, color: simplego.Black });
	
	game.play(4, 3, simplego.White)

	const group3 = game.group(3, 3);
	
	test.ok(group3);
	test.equal(group3.stones().length, 1);
	test.deepEqual(group3.stones()[0], { x: 3, y: 3, color: simplego.Black });
}

