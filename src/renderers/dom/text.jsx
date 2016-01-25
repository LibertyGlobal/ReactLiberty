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
    var fontSize = (CSS.fontSize || 18);
    //1.15 eliminates difference between canvas and DOM visible lineHeight size when do defaults
    node.style.lineHeight = (CSS.lineHeight ? CSS.lineHeight : fontSize * 1.15) + 'px';
    //We add px after to avoid parseInt when calculating fontSize * 1.15
    node.style.fontSize = fontSize + 'px';
    node.style.fontFamily = CSS.fontFamily || 'Arial';
    node.style.color = CSS.color || '#000000';
    node.style.width = CSS.width ? CSS.width + 'px' : '100%';
    node.style.textAlign = CSS.textAlign;
    node.style.wordWrap = CSS.wordWrap;
    node.style.whiteSpace = !CSS.wordWrap && !CSS.width ? 'nowrap' : 'normal';
  }
}

window['DOMp'] = module.exports = ReactLibertyText;