
const simplego = require('../');

exports['create influence up to length 3 from empty board'] = function (test) {
    const board = simplego.board();
    
    const influence = board.influence(3);
    
    test.ok(influence);
    test.equal(influence.width(), board.width());
    test.equal(influence.height(), board.height());
    
    const width = board.width();
    const height = board.height();
    
    for (let k = 0; k < width; k++)
        for (let j = 0; j < height; j++)
            test.ok(Array.isArray(influence.get(k, j)));
        
    test.equal(influence.get(0, 0).length, 7);
};

