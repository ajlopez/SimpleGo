
'use strict';

if (typeof simpleboard === 'undefined')
    var simpleboard = require('simpleboard');

var simplego = (function () {
    return {
        createBoard: function () {
            return simpleboard.createBoard(19, 19);
        }
    };
})();

if (typeof window === 'undefined') {
	module.exports = simplego;
}
