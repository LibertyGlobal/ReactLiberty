var React = require('react');
var ReactLibertyElement = require('./element.jsx');

class ReactLibertyImage extends ReactLibertyElement {
  constructor() {
    super(...arguments);
    this.image = new Image();
    this.image.src = this.props.props.src;
  }
}

module.exports = ReactLibertyImage;