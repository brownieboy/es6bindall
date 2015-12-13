var expect = require('expect');
var es6BindAll = require('../index.js');


console.log('typeof es6BindAll = ' + typeof es6BindAll);

var boundObject1 = {
    name: "boundObject1",
    testFunc: function() {
    	 console.log("running boundObject1 func");
    	return this;
    }
};

var boundObject2 = {
    name: "boundObject2",
    testFunc: function() {
    	console.log("running boundObject2 func");
        return this;
    }
};

// context[methodName] = context[methodName].bind(context);

boundObject1.testFunc = boundObject1.testFunc.bind(boundObject2);
boundObject1.testFunc = boundObject1.testFunc.bind(boundObject1);

// es6BindAll.es6BindAll(boundObject1, ["testFunc"]);

describe('es6BindAll bind() test', function() {
    it('should exist and be a function', function() {
        expect(boundObject1.testFunc)
            .toExist()
            .toBeAn(Function)
    })
    it('should be rebound to its own object via es6BindAll()', function() {
        expect(boundObject1.testFunc())
            .toBe(boundObject1)
    })
})

