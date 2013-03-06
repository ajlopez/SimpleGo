
'use strict';

if (typeof simpleboard === 'undefined')
    var simpleboard = require('simpleboard');

var simplego = (function () {
    var Color = { Black: 1, White: 2 };

    function Game(board) {
        if (!board)
            board = getInitialBoard();

        this.getPositions = function () {
            return board.getPositions();
        };

        this.getSquare = function (x, y) {
            return board.getContent(x, y);
        };

		this.play = function (x, y, color) {
			board.putContent(x, y, { color: color });
		};
		
		this.isValidPlay = function (x, y, color) {
			var content = board.getContent(x, y);
			
			if (content)
				return false;
				
			return true;
		};
    }

    function getInitialBoard() {
        var board = simpleboard.createBoard(19, 19);

        return board;
    }

    return {
        createBoard: getInitialBoard,
        createGame: function (board) { return new Game(board); },
        Black: Color.Black,
        White: Color.White
    };
})();

if (typeof window === 'undefined') {
	module.exports = simplego;
}
