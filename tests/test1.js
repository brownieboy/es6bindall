var test = require("tape");
var faucet = require("faucet");
var es6BindAll = require("../"); // index.js

test.createStream()
  .pipe(faucet())
  .pipe(process.stdout);


var boundObject1 = {
  name: "boundObject1",
  testFunc: function() {
    return this;
  },
  testFunc2: function() {
    return this;
  }
};

var boundObject2 = {
  name: "boundObject2"
};


// Control tests.
test("testFunc() method should be bound to boundObject1", function(t) {
  t.equal(boundObject1.testFunc(), boundObject1);
  t.end();
});

test("testFunc() method should be bound to boundObject2 via .call()", function(t) {
  t.equal(boundObject1.testFunc.call(boundObject2), boundObject2);
  t.end();
});

test("testFunc() method should not be bound to boundObject1 via .call()", function(t) {
  t.notEqual(boundObject1.testFunc.call(boundObject2), boundObject1);
  t.end();
});


// method should be bound to boundObject1, because that"s the context under which we"re
// calling it, i.e. boundObject1.testFunc(), plus we"ve bound it with es6BindAll anyway
test("testFunc() method should be bound to boundObject1 after es6bindall call", function(t) {
  es6BindAll(boundObject1, ["testFunc"]);
  t.equal(boundObject1.testFunc(), boundObject1);
  t.end();
});

// Check for binding string method name instead of an array.
test("testFunc2() method should be bound to boundObject2 after es6bindall call as a string", function(t) {
  es6BindAll(boundObject1, "testFunc2");
  t.equal(boundObject1.testFunc2(), boundObject1);
  t.end();
});


// method should be bound to boundObject1, because we've bound it with es6BindAll.  Even
// though we"re overriding the context to boundObject2 with the .call() method, our
// es6BindAll call (which is doing a .bind() under the covers) overrides that .call()
// every time.  A .bind() can only be done on a method once and that .bind() is final.
test("testFunc() method should still be bound to boundObject1, even when binding to boundObject2 with .call()", function(t) {
  es6BindAll(boundObject1, ["testFunc"]);
  t.equal(boundObject1.testFunc.call(boundObject2), boundObject1);
  t.end();
});


test("attempting to bind a non-existent method throws an error", function(t) {
  t.throws(() => es6BindAll(boundObject1, ["iDontExist"]), /Cannot bind method iDontExist to the supplied context, boundObject1/);
  t.end();
});
