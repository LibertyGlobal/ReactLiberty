var ReactLibertyElement = require('./element.jsx');

class ReactLibertyImage extends ReactLibertyElement {
  constructor() {
    super(...arguments);
    this.onImageLoaded = this.onImageLoaded.bind(this);
  }

  getDisplayObject() {
    var result;
    if (this.props && this.props.src) {
      result = document.createElement('img');
      result.src = this.props.src;
      result.width = this.style.width + 'px';
      result.height = this.style.height + 'px';

      //If sizes are not set use images sizes when it is loaded
      //if (!this.style.width || !this.style.height) {
      //  result.texture.baseTexture.on('loaded', this.onImageLoaded);
      //}
    } else {
      throw(new Error('ReactLiberty.Image: src is not set'));
    }
    return result;
  }

  //Update scene and image sizes when loaded
  onImageLoaded() {
    if (this.parent) {
      this.parent.layout = null;
    }

    this.layout = null;

    this.style.width = this.style.width || this._displayObject.texture.baseTexture.width;
    this.style.height = this.style.height || this._displayObject.texture.baseTexture.height;

    if (this.parent) {
      this.parent.doLayout();
      this.parent.updateDisplayObject(true);
    } else {
      this.layout.width = this.style.width || this._displayObject.texture.baseTexture.width;
      this.layout.height = this.style.height || this._displayObject.texture.baseTexture.height;
    }
  }

  updateDisplayObject() {
    super.updateDisplayObject();
    this._displayObject.width = this.layout && this.layout.width || this.props.width || this._displayObject.width;
    this._displayObject.height = this.layout && this.layout.height || this.props.height || this._displayObject.height;
  }
}

window['DOMimg'] = module.exports = ReactLibertyImage;