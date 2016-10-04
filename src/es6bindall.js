/**
 * es6BindAll Binds methods to their parent contexts, e.g. and ES6 class
 * @param  {class} context     The context to which the methods will be bound.  Normally an ES6 class.
 * @param  {array} methods An Array of methods to bind to the context.
 * @return {null}             Function returns nothing.
 */
function es6BindAll(context, ...methods) {
  methods.map((method) => {
    try {
      context[method] = context[method].bind(context);
    } catch (e) {
      var cName = context.name ? (", " + context.name) : "";
      var mName = typeof method === "function" ? method.name : method;
      console.log("Error: " + e);
      throw new Error("Cannot bind method " + mName + " to the supplied context" + cName);
    }
    return null;
  });
}

export default es6BindAll;
