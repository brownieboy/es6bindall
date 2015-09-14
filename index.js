exports.es6BindAll = function(context, methodNames) {
  methodNames.map(function(methodName) {
    context[methodName] = context[methodName].bind(context);
  });
}