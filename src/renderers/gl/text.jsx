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
    var fontWeight = '400 ';

    if (CSS.fontWeight === 300 || CSS.fontWeight === 'light') {
      fontWeight = '300 ';
    } else if (CSS.fontWeight === 700 || CSS.fontWeight === 'bold') {
      fontWeight = '700 ';
    }

    pixiStyle.fontSize = CSS.fontSize || 18;
    pixiStyle.font = fontWeight + pixiStyle.fontSize + 'px ' + (CSS.fontFamily || 'Arial');
    pixiStyle.fontWeight = fontWeight;
    pixiStyle.fill = CSS.color || '#000000';
    pixiStyle.wordWrapWidth = CSS.width || null;
    pixiStyle.align = CSS.textAlign;
    pixiStyle.lineHeight = CSS.lineHeight ? CSS.lineHeight : pixiStyle.fontSize;
    if (pixiStyle.wordWrapWidth) {
      pixiStyle.wordWrap = true;
    }
    return pixiStyle;
  }

  updateDisplayObject() {
    super.updateDisplayObject();
    super.updateVisibility();
  }
}

window['GLp'] = module.exports = ReactLibertyText;