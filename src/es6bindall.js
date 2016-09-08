/**
 * es6BindAll Binds methods to their parent contexts, e.g. and ES6 class
 * @param  {class} context     The context to which the methods will be bound.  Normally an ES6 class.
 * @param  {array} methodNames An Array of methods to bind to the context.
 * @return {null}             Function returns nothing.
 */
function es6BindAll(context, methodNames) {
  if (!Array.isArray(methodNames)) {
    methodNames = [methodNames];
  }

  methodNames.map(function(methodName) {
    try {
      context[methodName] = context[methodName].bind(context);
    } catch (e) {
      var cName = context.name ? (", " + context.name) : "";
      throw new Error("Cannot bind method " + methodName +
        " to the supplied context" + cName + ".");
    }
    return null;
  });
}

export default es6BindAll;
