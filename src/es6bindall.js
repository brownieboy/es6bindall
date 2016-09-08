function es6BindAll(context, methodNames) {
  methodNames.map(function(methodName) {
  	try
    	context[methodName] = context[methodName].bind(context);
	} catch(e) {
		throw "Cannot bind method " + methodName + " to the supplied context. Error " + e;
	}
  });
}

export default es6BindAll;
