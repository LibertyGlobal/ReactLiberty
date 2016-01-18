var React = require('react');
var ReactLiberty = require('../../src/index');
var Motion = require('react-motion').Motion;
var spring = require('react-motion').spring;

var PLACEHOLDER = require('../assets/images/placeholder.png');
var HIGHLIGHT = require('../assets/images/app-highlight.png');

var FocusManager = require('sunbeam').FocusManager;
var Focusable = require('sunbeam').Focusable;

class AppAssetHighlight extends React.Component {
  render(){
    var style = {
      width: 164,
      height: 222,
      position: 'absolute',
      opacity: 0.001
    };

    return <Img ref="highlight" style={style} src={HIGHLIGHT}/>;
  }
}

class AppAsset extends Focusable {
  static highlightClass = AppAssetHighlight;

  static styles = {
    width: 164,
    marginRight: 24,
    image: {
      width: 164,
      height: 164,
      marginRight: 24
    },
    title: {
      fontFamily: 'InterstatePro',
      fontWeight: 300,
      fontSize: 20,
      width: 129,
      marginTop: 0,
      marginLeft: 5,
      worldWarp: true,
      height: 30,
      color: '#ffffff'
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
