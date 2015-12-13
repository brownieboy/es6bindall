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

describe('Control test 1', function() {
    it('should exist and be a function', function() {
        expect(boundObject1.testFunc)
            .toExist()
            .toBeAn(Function)
    })
    it('should be bound to default obj (itself) due to invocation', function() {
        expect(boundObject1.testFunc())
            .toBe(boundObject1)
    })
})

describe('Control test 2', function() {
    it('should exist and be a function', function() {
        expect(boundObject2.testFunc)
            .toExist()
            .toBeAn(Function)
    })
    it('should not be bound to default obj (itself) due to invocation', function() {
        expect(boundObject2.testFunc())
            .toBe(boundObject2)
    })
})

