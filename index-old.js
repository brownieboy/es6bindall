"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function es6BindAll(context, methodNames) {
  methodNames.map(function (methodName) {
    context[methodName] = context[methodName].bind(context);
  });
};

exports.es6BindAll = es6BindAll;
exports.default = es6BindAll;
