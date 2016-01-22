var React = require('react');
var ReactDOM = require('react-dom');
var MenuItem = require('./menu-item.jsx');

var IndexStrategy = require('sunbeam').strategies.horizontalIndexBasedFocusStrategy.default;
var FocusManager = require('sunbeam').FocusManager;
var FocusableContainer = require('sunbeam').FocusableContainer;

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
    this.props.children.forEach(function (child) {

    });

    return (
      <ul>
        {this.props.children}
      </ul>
    );
  }
}

module.exports = Menu;