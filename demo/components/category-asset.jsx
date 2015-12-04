var React = require('react');
var ReactLiberty = require('../../src/index');
var Motion = require('react-motion').Motion;
var spring = require('react-motion').spring;
var appService = require('../services/applications-service.js');

var FocusManager = require('improved-navigation-concept').FocusManager;

var HIGHLIGHT = require('../assets/images/genre-highlight.png');

var categories = appService.getCategories();
var CATEGORY_ICONS = {
  sport: require('../assets/images/genres-icons/sports.png'),
  games: require('../assets/images/genres-icons/games.png'),
  lifestyle: require('../assets/images/genres-icons/life-style.png'),
  music: require('../assets/images/genres-icons/music.png'),
  news: require('../assets/images/genres-icons/news.png'),
  social: require('../assets/images/genres-icons/social.png'),
  video: require('../assets/images/genres-icons/video.png'),
};

class CategoryAsset extends React.Component {
  static styles = {
    width: 201,
    marginRight: 24,
    image: {
      position: 'relative',
      left: 8,
      top: 7,
      width: 201,
      height: 114,
      marginRight: 24
    },
    focus: {
      position: 'absolute',
      width: 216,
      height: 129,
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
    var styles = CategoryAsset.styles;

    return <GLdiv>
      <Motion ref='motion' key="focus-motion" defaultStyle={styles.focus} style={{opacity: this.opacitySpring}}>
        {function (interpolatedStyle) {
          return <GLimg style={interpolatedStyle} src={HIGHLIGHT} key="focus"/>
        }}
      </Motion>;
      <GLimg style={styles.image} src={CATEGORY_ICONS[this.props.data.id] || CATEGORY_ICONS['video']} key="3"/>
    </GLdiv>;
  }

  componentWillMount() {
    this.parentId = this.context.navigationContainerId;
    FocusManager.registerFocusableComponent(this);
  }
}

CategoryAsset.contextTypes = {
  navigationContainerId: React.PropTypes.string
};

module.exports = CategoryAsset;