var React = require('react');
var ReactDOM = require('react-dom');
var MenuItem = require('./menu-item.jsx');

var IndexStrategy = require('../../vendor/sunbeam').strategies.horizontalIndexBasedFocusStrategy.default;
var FocusManager = require('../../vendor/sunbeam').FocusManager;
var FocusableContainer = require('../../vendor/sunbeam').FocusableContainer;

class Menu extends FocusableContainer {
  getFocusStrategy() {
    if (!this.focusStrategy) {
      this.focusStrategy = new IndexStrategy();
    }

    return this.focusStrategy;
  }

  componentWillMount() {
    super.componentWillMount();
  }

  render() {
    return (
      <ul>
        {this.props.children}
      </ul>
    );
  }
}

module.exports = Menu;