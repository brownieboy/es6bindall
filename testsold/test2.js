var expect = require('expect');
var es6BindAll = require('../index.js');


console.log('typeof es6BindAll = ' + typeof es6BindAll);

var boundObject1 = {
    name: "boundObject1",
    testFunc: function() {
        return this;
    }
};

var boundObject2 = {
    name: "boundObject2",
    testFunc: function() {
        return this;
    }
};

// context[methodName] = context[methodName].bind(context);

boundObject1.testFunc = boundObject1.testFunc.bind(boundObject2);
// es6Bindall.es6BindallAll(boundObject2, )

describe('Standard bind() test', function() {
    it('should exist and be a function', function() {
        expect(boundObject1.testFunc)
            .toExist()
            .toBeAn(Function)
    })
    it('should be bound to the second object via ordinary .bind()', function() {
        expect(boundObject1.testFunc())
            .toBe(boundObject2)
    })
})

