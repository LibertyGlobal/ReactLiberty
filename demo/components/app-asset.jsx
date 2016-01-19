var React = require('react');
var ReactLiberty = require('../../src/index');
var Motion = require('react-motion').Motion;
var spring = require('react-motion').spring;

var PLACEHOLDER = require('../assets/images/placeholder.png');
var HIGHLIGHT = require('../assets/images/app-highlight.png');

var FocusManager = require('../vendor/sunbeam').FocusManager;
var Focusable = require('../vendor/sunbeam').Focusable;

class AppAssetHighlight extends React.Component {
  render(){
    var style = {
      width: 180,
      height: 238,
      position: 'absolute',
      opacity: 0.001
    };

    return <Img ref="highlight" style={style} src={HIGHLIGHT}/>;
  }
}

class AppAsset extends Focusable {
  static highlightClass = AppAssetHighlight;

  static styles = {
    width: 174,
    marginLeft: 3,
    marginRight: 14,
    image: {
      top: 3,
      width: 174,
      height: 174,
      marginLeft: 3,
      marginRight: 14
    },
    title: {
      fontFamily: 'InterstatePro',
      fontWeight: 300,
      fontSize: 20,
      width: 129,
      marginTop: 5,
      marginLeft: 8,
      worldWarp: true,
      height: 30,
      color: '#E9E9EA'
    }
  };

  shouldComponentUpdate(a, b) {
    return false;
  }

  showLabel() {
    //this.refs.label._displayObject.visible = true;
  }

  hideLabel() {
    //this.refs.label._displayObject.visible = false;
  }

  componentWillSelect() {
    window.appStore.runApp(this.props.data.id);
  }

  render() {
    var styles = AppAsset.styles;

    return <Div>
      <Img style={styles.image} src={this.props.data.images.icon['192x192'] || PLACEHOLDER} key="3"/>
      <P ref="label" style={styles.title} key="1">{this.props.data.name}</P>
    </Div>;
  }
}

module.exports = AppAsset;
