var React = require('react');
var ReactLibertyElement = require('./element.jsx');

class ReactLibertyText extends ReactLibertyElement {
  getDisplayObject() {
    var basicText = document.createElement('p');
    basicText.innerText = this.props.children;
    this.applyCSS(basicText);
    return basicText;
  }

  applyCSS(node) {
    if (!this.props.style) {
      return;
    }

    var CSS = this.props.style;

    node.style.padding = '0';
    node.style.margin = '0';
    node.style.fontSize = (CSS.fontSize || 18) + 'px';
    node.style.lineHeight = CSS.lineHeight ? CSS.lineHeight + 'px' : node.style.fontSize;
    node.style.fontFamily = CSS.fontFamily || 'Arial';
    node.style.color = CSS.color || '#000000';
    node.style.width = CSS.width ? CSS.width + 'px' : '100%';
    node.style.textAlign = CSS.textAlign;
    node.style.wordWrap = CSS.wordWrap;
    node.style.whiteSpace = !CSS.wordWrap && !CSS.width ? 'nowrap' : 'normal';
  }
}

window['DOMp'] = module.exports = ReactLibertyText;