var React = require('react');
var ReactLibertyElement = require('./element.jsx');

class ReactLibertyText extends ReactLibertyElement {
  getDisplayObject() {
    var style = this.convertCSSintoPixiStyle();

    var basicText = new PIXI.Text(this.props.children, style);

    return basicText;
  }

  convertCSSintoPixiStyle(CSS) {
    CSS = CSS || this.props.style;
    var pixiStyle = {};
    pixiStyle.font = (CSS.fontSize || 18) + 'px ' + (CSS.fontFamily || 'Arial');
    pixiStyle.fill = CSS.color || '#000000';
    pixiStyle.wordWrapWidth = CSS.width || null;
    pixiStyle.align = CSS.textAlign;
    if (pixiStyle.wordWrapWidth) {
      pixiStyle.wordWrap = true;
    }
    return pixiStyle;
  }
}

window['GLp'] = module.exports = ReactLibertyText;