var React = require('react');
var ReactDOM = require('react-dom');

var FocusManager = require('improved-navigation-concept').FocusManager;
var FocusableComponent = require('improved-navigation-concept').NavigationContainerClass.default;

class MenuItem extends FocusableComponent {
  constructor(props) {
    super(props);
    //this.id = String(Date.now());
  }

  componentReceivedFocus() {
    //ReactDOM.findDOMNode(this.refs.element).styles.color = 'blue';
  }

  componentLostFocus() {

  }

  render() {
    return <li>{this.props.children}</li>;
  }

  componentWillMount() {
    //this.parentId = this.context.navigationContainerId;
    //FocusManager.registerFocusableComponent(this);
  }

  componentWillUnmount() {
    //FocusManager.unregisterFocusableComponent(this);
  }
}

MenuItem.contextTypes = {
  //navigationContainerId: React.PropTypes.string
};

module.exports = MenuItem;