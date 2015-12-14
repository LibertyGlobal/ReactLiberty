'use strict';

var React = require('react');
var ReactLiberty = require('../../../src/index');
var Motion = require('react-motion').Motion;
var spring = require('react-motion').spring;
var ChildrenItemsManager = require('./children-items-manager.jsx');
var DataItemsManager = require('./data-items-manager.jsx');

var FocusManager = require('improved-navigation-concept').FocusManager;
var FocusableComponent = require('improved-navigation-concept').NavigationContainerClass.default;

class List extends FocusableComponent {
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

  //Experiment
  constructor(props) {
    super(props);
    this.moveTo = 0;
    this.motionSpring = spring(this.moveTo, [120, 17]);
  }

  getPreferredFocusedComponentNode(containerNode, prevFocusedComponentNode) {
    return containerNode.children[this.state.currentIndex];
  }

  moveUp(containerNode, prevFocusedComponentNode) {
    if (this.props.orientation === List.orientation.VERTICAL) {
      return containerNode.children[this.selectPrev()];
    } else {
      return 'loseFocus';
    }
  }

  moveDown(containerNode, prevFocusedComponentNode) {
    if (this.props.orientation === List.orientation.VERTICAL) {
      return containerNode.children[this.selectNext()];
    } else {
      return 'loseFocus';
    }
  }

  moveLeft(containerNode, prevFocusedComponentNode) {
    if (this.props.orientation !== List.orientation.VERTICAL) {
      return containerNode.children[this.selectPrev()];
    } else {
      return 'loseFocus';
    }
  }

  moveRight(containerNode, prevFocusedComponentNode) {
    if (this.props.orientation !== List.orientation.VERTICAL) {
      return containerNode.children[this.selectNext()];
    } else {
      return 'loseFocus';
    }
  }

  componentWillMount() {
    super.componentWillMount();
    this.positionProperty = this.props.orientation === List.orientation.VERTICAL ? 'top' : 'left';
    this.sizeProperty = this.props.orientation === List.orientation.VERTICAL ? 'height' : 'width';
    this.directionProperty = this.props.orientation === List.orientation.VERTICAL ? 'column' : 'row';
    this.CSSNegativeProperty = this.props.orientation === List.orientation.VERTICAL ? 'Top' : 'Left';
    this.CSSPositiveProperty = this.props.orientation === List.orientation.VERTICAL ? 'Bottom' : 'Right';
    this.translateProperty = this.props.orientation === List.orientation.VERTICAL ? 'translateY' : 'translateX';

    this.styles.flexDirection = this.directionProperty;
    extendStyle(this.styles, this.props.style || {});

    /*
     * Initializing items manger which is a strategy for managing items. Interface should support following methods:
     * - getScrollForItem(itemIndex) - position to take to show item properly)
     * - getVisibleItems() - ReactElements to display
     * */

    var ItemsManagerClass = this.props.children ? ChildrenItemsManager : DataItemsManager;
    this.itemsManager = new ItemsManagerClass(this);
  }

  moveSelection(direction) {
    var itemsLength = this.itemsManager.getVisibleItems().length;
    var currentIndex = (this.state.currentIndex + direction) % itemsLength;
    currentIndex = currentIndex < 0 ? currentIndex = itemsLength + currentIndex : currentIndex;

    //Experiment
    this.state.currentIndex = currentIndex;

    //Calculating translate
    this.moveTo = this.itemsManager.getScrollForItem(this.state.currentIndex);
    this.motionSpring.val = -this.moveTo;
    this.refs.motion.startAnimating();

    this.setState({
      currentIndex
    });

    var currentItem = this.itemsManager.getVisibleItems()[currentIndex];

    return currentIndex;
  }

  selectNext() {
    return this.moveSelection(1);
  }

  selectPrev() {
    return this.moveSelection(-1);
  }

  shouldComponentUpdate(a, b) {
    if (b.currentIndex !== this.state.currentIndex) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    //Receiving items from items manager
    var items = this.itemsManager.getVisibleItems();
    var self = this;

    //Creating style object to pass motion spring
    var styleObject = {};
    styleObject[this.translateProperty] = this.motionSpring;

    return (<Motion ref='motion' defaultStyle={this.styles} style={styleObject}>
      {function (interpolatedStyle) {
        self.movedTo = interpolatedStyle[self.translateProperty];
        return (<GLdiv style={interpolatedStyle}>{items}</GLdiv>);
      }}
    </Motion>);
  }
}

List.defaultProps = {
  orientation: List.orientation.HORIZONTAL
};

var extendStyle = function (objA, objB) {
  for (var i in objB) {
    if (objB.hasOwnProperty(i)) {
      objA[i] = objB[i];
    }
  }
};

module.exports = List;