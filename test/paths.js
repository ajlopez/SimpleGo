
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

