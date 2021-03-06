
const simplego = require('../');

exports['create path'] = function (test) {
    const path = simplego.path([[1, 1], [1, 2]]);
    
    test.ok(path);
    test.ok(typeof path === 'object');
    test.equal(path.length(), 2);
};

exports['path contains'] = function (test) {
    const path = simplego.path([[1, 1], [1, 2]]);
    
    test.ok(path.contains(1, 1));
    test.ok(path.contains(1, 2));
    
    test.ok(!path.contains(2, 1));
    test.ok(!path.contains(3, 3));
};

exports['path touch'] = function (test) {
    const path = simplego.path([[1, 1], [1, 2]]);
    
    test.ok(path.touch(0, 1));
    test.ok(path.touch(1, 0));
    test.ok(path.touch(1, 2));
    
    test.ok(!path.touch(1, 3));
    test.ok(!path.touch(2, 2));
    test.ok(!path.touch(3, 3));
};

exports['path positions'] = function (test) {
    const path = simplego.path([[1, 1], [1, 2]]);
    
    const result = path.positions();
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.deepEqual(result, [[1, 1], [1, 2]]);
};

exports['extend path'] = function (test) {
    const path = simplego.path([[1, 1], [1, 2]]);
    
    const result = path.extend(2, 2);
    
    test.ok(result);
    test.deepEqual(result.positions(), [[1, 1], [1, 2], [2, 2]]);
    test.deepEqual(path.positions(), [[1, 1], [1, 2]]);
};

exports['get paths'] = function (test) {
    const path = simplego.path([[1, 1], [1, 2]]);
    
    const result = path.extend(2, 2);
    
    test.ok(result);
    test.deepEqual(result.positions(), [[1, 1], [1, 2], [2, 2]]);
    test.deepEqual(path.positions(), [[1, 1], [1, 2]]);
};

exports['get paths up to lenght 2 from position in empty board'] = function (test) {
    const board = simplego.board();
    
    const result = board.paths(3, 3, 2);
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 5);
};

exports['get paths up to lenght 2 from corner position in empty board'] = function (test) {
    const board = simplego.board();
    
    const result = board.paths(0, 0, 2);
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 3);
};

exports['get paths up to lenght 3 from corner position in empty board'] = function (test) {
    const board = simplego.board();
    
    const result = board.paths(0, 0, 3);
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 7);
};

exports['get paths up to lenght 3 from position in empty board'] = function (test) {
    const board = simplego.board();
    
    const result = board.paths(3, 3, 3);
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 17);
};

exports['get paths up to lenght 4 from position in empty board'] = function (test) {
    const board = simplego.board();
    
    const result = board.paths(3, 3, 4);
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 17 + 4 * 7);
};

exports['get paths up to lenght 3 from position in non empty board'] = function (test) {
    const board = simplego.board();
    
    board.put(3, 4, { x: 3, y: 4, color: simplego.White });
    
    const result = board.paths(3, 3, 3);
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 14);
    
    let nfrom = 0;
    
    for (let k = 0; k < result.length; k++)
        if (!result[k].fromColor(board))
            nfrom++;
        
    test.equal(nfrom, 14);
    
    let nto = 0;
    
    for (let k = 0; k < result.length; k++)
        if (result[k].toColor(board) === simplego.White)
            nto++;
        
    test.equal(nto, 1);
};

