# es6bindall

Simple function to bind multiple methods to an ES6 class's 'this' object. Intended as an equivalent to Backbone/Underscore's _.bindAll() method.

I created this plug-in to get around a problem where an ES6 class method's context is not autobound to the class's object.  This is a particular point of pain for ReactJS when using this syntax.  (ReactJS's previous .createClass() syntax _did_ autobind a component's methods to the component's own context.)

##Problem Code
In the code below, the ```close()``` and ```open()``` methods, which both call ```this.setState()``` will fail.  This is because those method's ```this``` object is not autobound to the component's context, so ```this.setState()``` simply doesn't exist.
```javascript
class ExampleModal extends React.Component {
  constructor(props) {
    super(props);
  }
  close() {
    this.setState({ showModal: false });
  }

  open(){
    this.setState({ showModal: true });
  }
  ```

##Workaround 1 - Bind method a call time
One workaround that I've seen suggests that you should bind the method when you're calling it, as shown below:
```javascript
// Example take from http://egorsmirnov.me/2015/08/16/react-and-es6-part3.html
export default class CartItem extends React.Component {
    render() {
        <button onClick={this.increaseQty.bind(this)} className="button success">+</button>
    }
}
```
This certainly gives you the most flexibility, since you can call the method as either bound or unbound should you wish.  Still, it's a massive pain in the rear to remeber to do this every time you call your method.


##Workaround 2 - Bind all methods manually
The code below will work correctly because each method's ```this``` is manually bound to the component's context by a separate ```.bind()``` call in the component's constructor.

```javascript
class ExampleModal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close() {
    this.setState({ showModal: false });
  }

  open(){
    this.setState({ showModal: true });
  }
  ```

While an improvement over Workaround 1, there's still a lot of code in your constructor just to bind your methods.  And so...


##Workaround 3 - Bind all methods manually with es6bindAll
...and so, I borrowed an idea from Backbone, which has [a _.bindAll() function](http://underscorejs.org/#bindAll) (actually part of Underscore), which you can call in your Backbone class constructors to bind its methods to itself.  From that, I've created es6BindAll as a simple function that binds a supplied list of method names to a supplied context (```this```).  It takes two arguments:

1. The context (i.e an object) to which the methods are to be bound.
2. An array of method names.  Those methods must exist in the current component/class, i.e. they can't be external functions.

Example use:
```javascript
import es6BindAll from "es6bindall";  // 'import {es6BindAll} from "es6bindall"' will also work

class ExampleModal extends React.Component {
  constructor(props) {
    super(props);
    es6BindAll(this, ["open", "close"]);
  }
  close() {
    this.setState({ showModal: false });
  }

  open(){
    this.setState({ showModal: true });
  }
  ```
  
  ##Browser Support
Internet Explorer 9 and upwards, plus all good browsers (i.e. any browser _not_ called Internet Explorer).


##Development Instructions
There's not much source code to change, but if you must!

First run `npm install` to update the dev dependencies, basically the Babel command line tool and its dependences.

The source code is in the src/es6bindall.js file, and is in an es6(ish) kind of format.  Run `npm run build` to have Babel transpile the code to es5 format to the project's main file, i.e. index.js in the root.

Alternatively, you can run `npm run start` to have Babel watch the src/es6bindall.js file for changes.  Babel will then update index.js automatically, whenever you save a change to src/es6bindall.js.

##Tests
Tests are built with mocha + chai.  Run with `npm run test`.

Tests check that a test method remains bound to its parent ojbect after its been bound using es6BindAll (i.e. .bind() under the covers), even if the context is being overriden by a .call().  (.bind trumps .call() it seems.)


