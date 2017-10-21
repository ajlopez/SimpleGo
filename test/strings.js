
var simplego = require('../');

exports['get string from empty cell'] = function (test) {
	var game = simplego.game();
	
	test.equal(game.string(3, 3), null);
}

