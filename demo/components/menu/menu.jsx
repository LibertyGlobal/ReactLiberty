var React = require('react');
var ReactDOM = require('react-dom');
var MenuItem = require('./menu-item.jsx');

var HorizontalIndexStrategy = require('sunbeam').strategies.horizontalIndexBasedFocusStrategy.default;
var FocusManager = require('sunbeam').FocusManager;
var FocusableContainer = require('sunbeam').FocusableContainer;

class MenuFocusStrategy extends HorizontalIndexStrategy {
  getPreferredFocusable(node) {
    var currentIndex = Math.max(1, this.selectedIndex);
    this.selectedIndex = currentIndex;
    return node._focusable.children && node._focusable.children[currentIndex] || null;
  }
}

class Menu extends FocusableContainer {
  getFocusStrategy() {
    if (!this.focusStrategy) {
      this.focusStrategy = new MenuFocusStrategy();
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