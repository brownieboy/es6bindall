
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



// method should be bound to boundObject1, because that"s the context under which we"re
// calling it, i.e. boundObject1.testFunc(), plus we"ve bound it with es6BindAll anyway
describe("Error trapping text", function() {
    es6BindAll(boundObject1, ["nonExistentFunc"]);

    it("should equal boundObject1 after binding", function() {
        expect(boundObject1.testFunc())
            .to.equal(boundObject1);
    })
})

