var expect = require('expect');
var es6BindAll = require('../index.js');


console.log('typeof es6BindAll = ' + typeof es6BindAll);

var globalThis;

var boundObject1 = {
    name: "boundObject1",
    testFunc: (function() {
        console.log("running.., this.name = " + this.name);
    	globalThis = this;
    }())
};

console.log("globalThis = " + globalThis);

describe('Control test 1', function() {
    it('should be undefined', function() {
        expect(globalThis)
            .notToBe(boundObject1)
    })
})

var boundObject2 = {
    name: "boundObject2",
    binder: (function(){
        this.testFunc = this.testFunc.bind(this);
    }()),
    testFunc: (function() {
        console.log("running.., this.name = " + this.name);
        globalThis = this;
    }())
};

describe('Control test 2', function() {
    it('should be boundObject2', function() {
        expect(globalThis)
            .toBe(boundObject2)
    })
})


// describe('Control test 2', function() {
//     it('should exist and be a function', function() {
//         expect(boundObject2.testFunc)
//             .toExist()
//             .toBeAn(Function)
//     })
//     it('should not be bound to default obj (itself) due to invocation', function() {
//         expect(boundObject2.testFunc())
//             .toBe(boundObject2)
//     })
// })

