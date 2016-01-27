var React = require('react');
var ReactDOM = require('react-dom');

var FocusManager = require('sunbeam').FocusManager;
var Focusable = require('sunbeam').Focusable;

class MenuItem extends Focusable {
  componentDidReceiveFocus() {
    this.setActive();

    ReactDOM.findDOMNode(this).style.borderBottomColor = '#3489CD';
  }

  componentDidLoseFocus() {
    if (!this.active) {
      this.setInactive();
    }

    ReactDOM.findDOMNode(this).style.borderBottomColor = 'transparent';
  }

  setActive() {
    ReactDOM.findDOMNode(this).style.color = '#3489CD';
  }

  setInactive() {
    ReactDOM.findDOMNode(this).style.color = '#E9E9EA';
  }

  render() {
    return <li>{this.props.children}</li>;
  }
}

module.exports = MenuItem;
