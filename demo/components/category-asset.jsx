var React = require('react');
var ReactLiberty = require('../../src/index');
var Motion = require('react-motion').Motion;
var spring = require('react-motion').spring;
var appService = require('../services/applications-service.js');

var FocusManager = require('sunbeam').FocusManager;
var Focusable = require('sunbeam').Focusable;

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

class CatAssetHighlight extends React.Component {
  render() {
    var style = {
      width: 216,
      height: 129,
      position: 'absolute',
      opacity: 0.001
    };

    return <Img ref="highlight" style={style} src={HIGHLIGHT}/>;
  }
}

class CategoryAsset extends Focusable {
  static highlightClass = CatAssetHighlight;

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
    }
  }

  shouldComponentUpdate(a, b) {
    return false;
  }

  render() {
    var styles = CategoryAsset.styles;

    return <Div>
      <Img style={styles.image} src={CATEGORY_ICONS[this.props.data.id] || CATEGORY_ICONS['video']} key="3"/>
    </Div>;
  }
}

module.exports = CategoryAsset;