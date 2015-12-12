var es6BindAll = function es6BindAll(context, methodNames) {
  methodNames.map(function(methodName) {
    context[methodName] = context[methodName].bind(context);
  });
};
export {es6BindAll};
export default es6BindAll;