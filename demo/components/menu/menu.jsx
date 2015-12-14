var React = require('react');
var ReactDOM = require('react-dom');
var MenuItem = require('./menu-item.jsx');

var testStrategy = require('improved-navigation-concept').testStrategy;
var FocusManager = require('improved-navigation-concept').FocusManager;
var FocusableComponent = require('improved-navigation-concept').NavigationContainerClass.default;

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <ul>
          {this.props.children}
        </ul>
      </header>
    );
  }
}

Menu.defaultProps = {
  strategy: testStrategy
}

module.exports = Menu;