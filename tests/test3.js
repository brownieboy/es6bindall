/* eslint-env mocha */

var chai = require("chai");
var expect = chai.expect;
var es6BindAll = require("../");


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


es6BindAll(boundObject1, "testFunc");


// method should be bound to boundObject1, because we"ve bound it with es6BindAll.  Even
// though we"re overriding the context to boundObject2 with the .call() method, our
// es6BindAll call (which is doing a .bind() under the covers) overrides that .call()
// every time.  A .bind() can only be done on a method once and that .bind() is final.
describe("Bound test final to single method name", function() {
    it("should equal boundObject1, using .call() to bind to boundObject2", function() {
        expect(boundObject1.testFunc.call(boundObject2))
            .to.equal(boundObject1);
    });
});

