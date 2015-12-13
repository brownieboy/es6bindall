var chai = require("chai");
var expect = chai.expect;
var es6BindAll = require('../index.js');


// Control tests.

var boundObject1 = {
    name: "boundObject1",
    testFunc: function() {
        console.log("running.., this.name = " + this.name);
        return this;
    }
};

var boundObject2 = {
    name: "boundObject2"
};


// method should be bound to boundObject1, because that's the context under which we're
// calling it, i.e. boundObject1.testFunc()
describe('Control test 1', function() {
    it('should equal boundObject1', function() {
        expect(boundObject1.testFunc())
            .to.equal(boundObject1)
    })
})

// method should be bound to boundObject2, because we're overriding its context with
// the .call() method.
describe('Control test 2', function() {
    it('should equal boundObject2, using .call()', function() {
        expect(boundObject1.testFunc.call(boundObject2))
            .to.equal(boundObject2)
    })
})
