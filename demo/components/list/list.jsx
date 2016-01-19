'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactLiberty = require('../../../src/index');
var Motion = require('react-motion').Motion;
var spring = require('react-motion').spring;
var ChildrenItemsManager = require('./strategies/children-items-manager.jsx');
var DataItemsManager = require('./strategies/data-items-manager.jsx');

var FocusManager = require('../../vendor/sunbeam').FocusManager;
var FocusableContainer = require('../../vendor/sunbeam').FocusableContainer;

function invoke(fn) {
  if (typeof this[fn] === 'function') {
    this[fn]();
  }
}

class List extends FocusableContainer {
  static orientation = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal'
  };

  styles = {
    translateX: 0,
    translateY: 0
  };

  state = {
    currentIndex: 0
  };

  //Experiment
  constructor(props) {
    super(props);
    this.moveTo = 0;
    this.motionSpring = spring(this.moveTo, [120, 17]);
    //this.registeredChildren = new Set();
  }

  getPreferredFocusable(containerNode, prevFocusedComponentNode) {
    return this._focusable.children[this.state.currentIndex];
  }

  getUpFocusable(containerNode, prevFocusedComponentNode) {
    if (this.props.orientation === List.orientation.VERTICAL && (this.state.currentIndex !== 0 || this.props.cyclic)) {
      return this._focusable.children[this.selectPrev()];
    } else {
      return null;
    }
  }

  getDownFocusable(containerNode, prevFocusedComponentNode) {
    if (this.props.orientation === List.orientation.VERTICAL) {
      return this._focusable.children[this.selectNext()];
    } else {
      return null;
    }
  }

  getLeftFocusable(containerNode, prevFocusedComponentNode) {
    if (this.props.orientation !== List.orientation.VERTICAL) {
      return this._focusable.children[this.selectPrev()];
    } else {
      return null;
    }
  }

  getRightFocusable(containerNode, prevFocusedComponentNode) {
    if (this.props.orientation !== List.orientation.VERTICAL) {
      return this._focusable.children[this.selectNext()];
    } else {
      return null;
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

  componentDidReceiveFocus() {
    if (this.itemsManager.getHighlightClass()) {
      this.refs.motion.refs.container.children[0].style.opacity = 0.999;
      this.refs.motion.refs.container.children[0].updateDisplayObject();
    }

    //Array.from(this.registeredChildren).forEach(child => invoke.call(child, 'showLabel'));
  }

  componentDidLoseFocus() {
    if (this.itemsManager.getHighlightClass()) {
      this.refs.motion.refs.container.children[0].style.opacity = 0.001;
      this.refs.motion.refs.container.children[0].updateDisplayObject();
    }

    //Array.from(this.registeredChildren).forEach(child => invoke.call(child, 'hideLabel'));
  }

  goTo(newIndex) {
    var itemsLength = this.itemsManager.getVisibleItems().length;
    newIndex = newIndex % itemsLength;

    newIndex = newIndex < 0 ? newIndex = itemsLength + newIndex : newIndex;

    //Should be in sync if rerendered
    this.state.currentIndex = newIndex;

    //Calculating translate
    this.moveTo = this.itemsManager.getScrollForItem(this.state.currentIndex);

    if (this.itemsManager.getHighlightClass()) {
      this.refs.motion.refs.container.children[0].style[this.translateProperty] = this.itemsManager.getSizeForItem() * this.state.currentIndex;
      this.refs.motion.refs.container.children[0].updateDisplayObject();
    }

    this.motionSpring.val = -this.moveTo;
    this.refs.motion.startAnimating();

    this.setState({
      currentIndex: newIndex
    });

    var currentItem = this.itemsManager.getVisibleItems()[newIndex];

    return newIndex;
  }

  selectNext() {
    return this.goTo(this.state.currentIndex + 1);
  }

  selectPrev() {
    return this.goTo(this.state.currentIndex - 1);
  }

  shouldComponentUpdate(a, b) {
    return false;
  }

  render() {
    //const refFn = child => this.registeredChildren.add(child);

    //Receiving items from items manager
    var items = this.itemsManager.getVisibleItems();
    var self = this;

    //Creating style object to pass motion spring
    var styleObject = {};
    styleObject[this.translateProperty] = this.motionSpring;

    var highlightClass = this.itemsManager.getHighlightClass() || undefined;

    if (highlightClass) {
      var highlight = React.createElement(highlightClass);
    } else {
      var highlight = undefined;
    }

    return (<Motion ref='motion' defaultStyle={this.styles} style={styleObject}>
        {function (interpolatedStyle) {
          self.movedTo = interpolatedStyle[self.translateProperty];
          return (<Div ref='container' style={interpolatedStyle}>{highlight}{items}</Div>);
        }}
      </Motion>);
  }
}

List.defaultProps = {
  cyclic: true,
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
