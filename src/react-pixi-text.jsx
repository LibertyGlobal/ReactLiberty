var React = require('react');
var ReactPixiElement = require('./react-pixi-element.jsx');

class ReactPixiText extends ReactPixiElement {
    getPixiRepresentation () {
        var basicText = new PIXI.Text(this.props.text);

        var style = {
            font: 'bold italic 36px Arial',
            fill: '#F7EDCA',
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440
        };

        return basicText;
    }
}

module.exports = ReactPixiText;