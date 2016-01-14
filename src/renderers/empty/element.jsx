var React = require('react');
var ReactMount = require('react/lib/ReactMount');
var ReactLiberty = require('../../core.js');
var ReactReconciler = require('react/lib/ReactReconciler');
var ReactInstanceMap = require('react/lib/ReactInstanceMap');
var ReactElement = require('react/lib/ReactElement');
var ReactCompositeComponent = require('react/lib/ReactCompositeComponent');

var testEl = document.createElement('div');
testEl.style.MozTransform = 'translate(100px) rotate(20deg)';
testEl.style.webkitTransform = 'translate(100px) rotate(20deg)';
var styleAttrLowercase = testEl.getAttribute('style').toLowerCase();
var hasWebkitTransform = styleAttrLowercase.indexOf('webkit') !== -1;

var transformPropertyName = hasWebkitTransform ? 'webkitTransform' : 'transform';

const { assign } = Object;

class ReactLibertyElement extends React.Component {
  construct(element) {
    this.props = null;
    this._currentElement = element;
    this._context = null;
    this._rootNodeID = null;
    this._instance = null;
    this._renderedComponent = this;

    this._cachedX = null;
    this._cachedY = null;
    this._cachedRotation = null;
    this._cachedScale = null;
    this._modified = false;

    //Liberty specific
    this._style = {};
    this.layout = null;
    this.parent = null;
    this.children = [];
    this.DOMParent = null;
    this._displayObject = null;
    this._isRootLibertyNode = false;

    //DOM attached specific
    this.parentX = 0;
    this.parentY = 0;
    this.isRootLibertyNode = true;

    this._mountOrder = 0;
    this._topLevelWrapper = null;

    this._renderedChildren = null;
    this.timesLayouted = 0;
  }

  shouldComponentUpdate() {
    return false;
  }

  getDisplayObject() {
    return null;
  }

  createDisplayObject() {
    this._displayObject = {};
  }

  receiveComponent(nextElement, transaction, context) {
    var newProps = nextElement.props;
    var oldProps = this._currentElement.props;

    this.props = newProps;

    this.updateDisplayObject();
    return this;
  }

  mountComponent(rootID, transaction, context) {
    this.props = this._currentElement.props;
    this.createDisplayObject();

    this._context = context;
    //this._mountOrder = nextMountID++;
    this._rootNodeID = rootID;
    this._instance = this;

    this.parent = this._context && this._context.parent;
    var parentPixiContainer = null;

    if (!this.parent) {
      //document.body.appendChild(this._displayObject);
      this._isRootLibertyNode = true;
    }

    if (this.componentDidMount) {
      transaction.getReactMountReady().enqueue(this.componentDidMount, this);
    }

    return this;
  }

  mountComponentToDOM() {
    try {
      //If is being added to ReactDOM node then consider X,Y of it`s bounding rect as a location
      this.DOMParent = ReactMount.findReactNodeByID(this._instance._rootNodeID.substr(0, this._instance._rootNodeID.lastIndexOf('.')));
      var boundingRect = this.DOMParent.getBoundingClientRect();

      var styles = window.getComputedStyle(this.DOMParent);
      var paddingLeft = parseInt(styles.paddingLeft);
      var paddingTop = parseInt(styles.paddingTop);

      //this.parentX = boundingRect.left + paddingLeft;
      //this.parentY = boundingRect.top + paddingTop;

      if (this.DOMParent.style.position !== 'absolute' || this.DOMParent.style.position !== 'fixed') {
        this.DOMParent.style.position = 'relative';
      }

      this.updateDisplayObject();
    } catch (e) {
      console.log(e);
    }
  }

  unmountComponent() {
    var inst = this._instance;

    if (inst.componentWillUnmount) {
      inst.componentWillUnmount();
    }

    //ReactReconciler.unmountComponent(this._renderedComponent);
    this._renderedComponent = null;
    this._instance = null;

    // These fields do not really need to be reset since this object is no
    // longer accessible.
    this._context = null;
    this._rootNodeID = null;
    this._topLevelWrapper = null;
  }

  updateDisplayObject() {

  }

  get style() {
    var style = (this.props && this.props.style) || this._style;
    return style;
  }

  componentDidMount() {
    if (this._isRootLibertyNode) {
      this.mountComponentToDOM();
    }
    this.updateDisplayObject();
  }

  render() {
    return this;
  }

  getPublicInstance() {
    return this;
  }

  getDisplayObject() {
    return this._displayObject;
  }
}

module.exports = ReactLibertyElement;
