var React = require('react');
var ReactPixiElement = require('./react-pixi-element.jsx');

class ReactPixiImage extends ReactPixiElement {
    getPixiRepresentation() {
        var result;
        if (this.props && this.props.src) {
            result = new PIXI.Sprite.fromImage(this.props.src);
        } else {
            throw(new Error('ReactPixi.Image: src is not set'));
        }
        return result;
    }

    updatePixiRepresentation() {
        super.updatePixiRepresentation();
        this.pixiRepresentation.width = this.layout && this.layout.width || this.pixiRepresentation.width;
        this.pixiRepresentation.height = this.layout && this.layout.height || this.pixiRepresentation.height;
    }
}

module.exports = ReactPixiImage;