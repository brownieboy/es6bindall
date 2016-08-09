function es6BindAll(context, methodNames) {
  methodNames.map(function(methodName) {
    context[methodName] = context[methodName].bind(context);
  });
}

export default es6BindAll;
