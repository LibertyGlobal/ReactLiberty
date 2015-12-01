'use strict';

var React = require('react');
var ReactLiberty = require('../../../src/index');
var Motion = require('react-motion').Motion;
var spring = require('react-motion').spring;
var ChildrenItemsManager = require('./children-items-manager.jsx');
var DataItemsManager = require('./data-items-manager.jsx');

class Carusel extends React.Component {
    static orientation = {
        VERTICAL: 'vertical',
        HORIZONTAL: 'horizontal'
    }

    styles = {
        translateX: 0,
        translateY: 0
    }

    state = {
        currentIndex: 0
    }

    componentWillMount() {
        this.positionProperty = this.props.orientation === Carusel.orientation.VERTICAL ? 'top' : 'left';
        this.sizeProperty = this.props.orientation === Carusel.orientation.VERTICAL ? 'height' : 'width';
        this.directionProperty = this.props.orientation === Carusel.orientation.VERTICAL ? 'column' : 'row';
        this.CSSNegativeProperty = this.props.orientation === Carusel.orientation.VERTICAL ? 'Top' : 'Left';
        this.CSSPositiveProperty = this.props.orientation === Carusel.orientation.VERTICAL ? 'Bottom' : 'Right';
        this.translateProperty = this.props.orientation === Carusel.orientation.VERTICAL ? 'translateY' : 'translateX';

        this.styles.flexDirection = this.directionProperty;
        this.styles.extend(this.props.style || {});

        /*
        * Initializing items manger which is a strategy for managing items. Interface should support following methods:
        * - getScrollForItem(itemIndex) - position to take to show item properly)
        * - getVisibleItems() - ReactElements to display
        * */

        var ItemsManagerClass = this.props.children ? ChildrenItemsManager : DataItemsManager;
        this.itemsManager = new ItemsManagerClass(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    onKeyDown(e) {
        var direction = 1;

        if (this.props.orientation !== Carusel.orientation.VERTICAL) {
            direction = e.keyCode === 37 ? this.selectPrev() : e.keyCode === 39 ? this.selectNext() : null;
        } else {
            direction = e.keyCode === 38 ? this.selectPrev() : e.keyCode === 40 ? this.selectNext() : null;
        }
    }

    moveSelection(direction) {
        var itemsLength = this.itemsManager.getVisibleItems().length;
        var currentIndex = (this.state.currentIndex + direction) % itemsLength;
        currentIndex = currentIndex < 0 ? currentIndex = itemsLength + currentIndex : currentIndex;

        this.setState({
            currentIndex
        });

        var currentItem = this.itemsManager.getVisibleItems()[currentIndex];
        if (typeof(currentItem.onFocus) === 'function') {
            currentItem.onFocus.apply(currentItem);
        }
    }

    selectNext() {
        this.moveSelection(1);
    }

    selectPrev() {
        this.moveSelection(-1);
    }

    render() {
        //Receiving items from items manager
        var items = this.itemsManager.getVisibleItems();

        //Calculating translate
        var moveTo = this.itemsManager.getScrollForItem(this.state.currentIndex);

        //Creating motion spring
        var motionSpring = spring(-moveTo, [120, 17]);
        var styleObject = {};
        styleObject[this.translateProperty] = motionSpring;

        return (<Motion defaultStyle={this.styles} style={styleObject}>
            {interpolatedStyle => {
                this.movedTo = interpolatedStyle[this.translateProperty];
                return (<GLdiv style={interpolatedStyle}>{items}</GLdiv>);
            }}
        </Motion>);
    }
}

Object.prototype.extend = function(obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            this[i] = obj[i];
        }
    }
};

module.exports = Carusel;