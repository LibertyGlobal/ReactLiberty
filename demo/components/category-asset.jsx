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

class MovieAsset extends React.Component {
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
    }

    shouldComponentUpdate(a, b) {
        if (a.selected !== this.props.selected) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        var opacitySpring = null;
        var styles = MovieAsset.styles;

        if (this.props.selected) {
            opacitySpring = spring(0.99, [120, 17]);
        } else {
            opacitySpring = spring(0.001, [120, 17])
        }

        return <GLdiv>
            <Motion key="focus-motion" defaultStyle={styles.focus} style={{opacity: opacitySpring}}>
                {interpolatedStyle => {
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

MovieAsset.defaultProps = {
    onBlur: function() {},
    onFocus: function() {},
    onSelect: function() {}
};

MovieAsset.contextTypes = {
    navigationContainerId: React.PropTypes.string
};

module.exports = MovieAsset;