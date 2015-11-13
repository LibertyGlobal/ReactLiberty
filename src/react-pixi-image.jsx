var React = require('react');
var ReactPixiElement = require('./react-pixi-element.jsx');

class ReactPixiImage extends ReactPixiElement {
    constructor() {
        super(...arguments);
        this.onImageLoaded = this.onImageLoaded.bind(this);
    }

    getPixiRepresentation() {
        var result;
        if (this.props && this.props.src) {
            result = new PIXI.Sprite.fromImage(this.props.src);

            //If sizes are not set use images sizes when it is loaded
            if (!this.style.width || !this.style.height) {
                result.texture.baseTexture.on('loaded', this.onImageLoaded);
            }
        } else {
            throw(new Error('ReactPixi.Image: src is not set'));
        }
        return result;
    }

    //Update scene and image sizes when loaded
    onImageLoaded() {
        this.style.width = this.style.width || this.pixiRepresentation.texture.baseTexture.width;
        this.style.height = this.style.height || this.pixiRepresentation.texture.baseTexture.height;

        this.parent.doLayout();
        this.parent.updatePixiRepresentation(true);
    }

    updatePixiRepresentation() {
        super.updatePixiRepresentation();
        this.pixiRepresentation.width = this.layout && this.layout.width || this.pixiRepresentation.width;
        this.pixiRepresentation.height = this.layout && this.layout.height || this.pixiRepresentation.height;
    }
}

module.exports = ReactPixiImage;