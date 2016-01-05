var React = require('react');
var ReactDOM = require('react-dom');

var FocusManager = require('sunbeam').FocusManager;
var Focusable = require('sunbeam').Focusable;

class MenuItem extends Focusable {
  componentDidReceiveFocus() {
    ReactDOM.findDOMNode(this).style.color = '#3489CD';
  }

  componentDidLoseFocus() {
    ReactDOM.findDOMNode(this).style.color = '#E9E9EA';
  }

  render() {
    return <li>{this.props.children}</li>;
  }
}

module.exports = MenuItem;