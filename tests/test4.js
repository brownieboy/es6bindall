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

// When testing a function call inside an expect, we need to
// wrap it in another function.
function testErrorFunc() {
  es6BindAll(boundObject1, ["nonExistentFunc"]);
}


describe("Try to bind a non-existent method", function() {
  it("should throw a 'Cannot bind method nonExistentFunc to the supplied context, boundObject1' error", function() {
    expect(testErrorFunc)  // Note: not testErrorFunc()
      .to.throw("Cannot bind method nonExistentFunc to the supplied context, boundObject1.");
  });
});
