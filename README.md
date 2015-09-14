# es6bindall

Simple function to bind multiple methods to an ES6 class's 'this' oject. Intended as an equivalent to Backbone's bindAll() method.

Created this to get around a problem where an ES6 class method's context is not autobound to the class's object.  This is a particular point of pain for ReactJS when using this syntax.  (ReactJS's previous .createClass() syntax _did_ autobind a component's methods to the component's own context.)

##Problem Code
In the code below, the close() and open() methods, which both call this.setState() will fail.  This is because those method's this oject is not autobound to the component's context, so this.setState() simply doesn't exist.
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

##Workaround 1 - Bind all methods manually
The code below will work correctly because each method's this is manually bound to the component's context by a separate .bind() call in the component's constructor.

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

That's a massive pain to remember to bind methods manually, not to mention a lot of extra lines of code in your constructor.  And so...


##Workaround 3 - Bind all methods manually with es6bindAll
es6BindAll is a simple function that binds a supplied list of method names to a supplied context (this).  It takes two arguments:

1. The context (i.e an object) to which the methods are to be bound.
2. An array of method names.  Those methods must exist in the current component/class, i.e. they can't be external functions.

Example use:
```javascript
import {es6BindAll} from "es6bindall";

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
Internet Explorer 9 and updwards, plus all good browsers (i.e. any browser _not_ called Internet Explorer).



