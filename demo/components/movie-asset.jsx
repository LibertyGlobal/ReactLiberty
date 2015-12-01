var React = require('react');
var ReactLiberty = require('../../src/index');
var Motion = require('react-motion').Motion;
var spring = require('react-motion').spring;

var PLACEHOLDER = require('../assets/images/placeholder.png');
var HIGHLIGHT = require('../assets/images/app-highlight.png');

class MovieAsset extends React.Component {
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
            <GLimg style={styles.image} src={this.props.data.images.icon['192x192'] || PLACEHOLDER} key="3"/>
            <GLp style={styles.title} key="1">{this.props.data.name}</GLp>
        </GLdiv>;
    }
}

module.exports = MovieAsset;