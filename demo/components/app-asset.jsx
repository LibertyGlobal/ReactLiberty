var React = require('react');
var ReactLiberty = require('../../src/index');
var Motion = require('react-motion').Motion;
var spring = require('react-motion').spring;

var PLACEHOLDER = require('../assets/images/placeholder.png');
var HIGHLIGHT = require('../assets/images/app-highlight.png');

var FocusManager = require('improved-navigation-concept').FocusManager;

class AppAsset extends React.Component {
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
      fontSize: 20,
      width: 129,
      marginTop: 0,
      marginLeft: 10,
      worldWarp: true,
      height: 30,
      color: '#ffffff'
    },
    focus: {
      position: 'absolute',
      width: 164,
      height: 222,
      opacity: 0.001
    }
  }

  constructor(props) {
    super(props);
    this.id = String(Date.now());
    this.opacitySpring = spring(0.001, [120, 17]);
  }

  shouldComponentUpdate(a, b) {
    return false;
  }

  componentReceivedFocus() {
    this.opacitySpring.val = 0.99;
    this.refs.motion.startAnimating();
  }

  componentLostFocus() {
    this.opacitySpring.val = 0.01;
    this.refs.motion.startAnimating();
  }

  render() {
    var styles = AppAsset.styles;

    return <Div>
      <Motion ref='motion' key="focus-motion" defaultStyle={styles.focus} style={{opacity: this.opacitySpring}}>
        {function (interpolatedStyle) {
          return <Img style={interpolatedStyle} src={HIGHLIGHT} key="focus"/>
        }}
      </Motion>;
      <Img style={styles.image} src={this.props.data.images.icon['192x192'] || PLACEHOLDER} key="3"/>
      <P style={styles.title} key="1">{this.props.data.name}</P>
    </Div>;
  }

  componentWillMount() {
    this.parentId = this.context.navigationContainerId;
    FocusManager.registerFocusableComponent(this);
  }
}

AppAsset.contextTypes = {
  navigationContainerId: React.PropTypes.string
};

module.exports = AppAsset;