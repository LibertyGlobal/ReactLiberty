var React = require('react');
var ReactLiberty = require('../../src/index');

var backToTopImage = require('../assets/images/back-to-top.png');
var backToTopHighlightImage = require('../assets/images/back-to-top-hl.png');

var FocusManager = require('../vendor/sunbeam').FocusManager;
var Focusable = require('../vendor/sunbeam').Focusable;

class BackToTopButton extends Focusable {
  styles = {
    width: 179,
    height: 54
  }

  static styles = {
    main: {
      width: 179,
      height: 54,
      left: 450
    },
    image: {
      width: 179,
      height: 54,
      position: 'absolute'
    },
    highlight: {
      width: 179,
      height: 54,
      position: 'absolute',
      opacity: 0.001
    },
    text: {
      fontSize: 24,
      height: 24,
      color: '#B8B8BB',
      textAlign: 'center',
      top: 15,
      left: 27,
      position: 'relative',
      fontFamily: 'InterstatePro'
    }
  }

  componentDidReceiveFocus () {
    this.refs.highlight.style.opacity = 0.999;
    this.refs.highlight.updateDisplayObject();
  }

  componentDidLoseFocus () {
    this.refs.highlight.style.opacity = 0.001;
    this.refs.highlight.updateDisplayObject();
  }

  render() {
    var styles = BackToTopButton.styles;

    return (<Div style={styles.main}>
      <Img width="179" height="54" style={styles.image} src={backToTopImage}/>
      <Img width="179" height="54" ref="highlight" style={styles.highlight} src={backToTopHighlightImage}/>
      <P style={styles.text}>Back to top</P>
    </Div>);
  }
}

module.exports = BackToTopButton;