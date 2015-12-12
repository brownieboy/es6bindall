"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var es6BindAll = function es6BindAll(context, methodNames) {
  methodNames.map(function (methodName) {
    context[methodName] = context[methodName].bind(context);
  });
};
exports.es6BindAll = es6BindAll;
exports.default = es6BindAll;
