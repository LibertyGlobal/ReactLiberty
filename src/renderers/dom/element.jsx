var React = window.React || require('react');
var ReactMount = window.ReactMount || require('react/lib/ReactMount');
var ReactLiberty = require('../../core.js');

var nextMountID = 0;

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
    this.lastLayout = null;
    this.layout = null;
    this.parent = null;
    this.children = [];
    this.DOMParent = null;
    this._displayObject = null;
    this._isRootLibertyNode = false;

    //DOM attached specific
    this.parentX = 0;
    this.parentY = 0;

    this._mountOrder = 0;
    this._topLevelWrapper = null;

    this._renderedChildren = null;
    this.timesLayouted = 0;
  }

  shouldComponentUpdate() {
    return false;
  }

  getDisplayObject() {
    return document.createElement('div');
  }

  createDisplayObject() {
    this._displayObject = this._displayObject || this.getDisplayObject();
    this._displayObject.style.position = 'absolute';
    this._displayObject.style.left = '0';
    this._displayObject.style.top = '0';
    this._displayObject.style.backfaceVisibility = 'hidden';
    this._displayObject.style.webkitBackfaceVisibility = 'hidden';
    this._displayObject.style.willChange = 'transform';
  }

  receiveComponent(nextElement, transaction, context) {
    var style = this.props.style;

    if (nextElement.props.style && this.props.style) {
      for (var propertyName in this.props.style) {
        nextElement.props.style[propertyName] = nextElement.props.style[propertyName] || this.props.style[propertyName];
      }
    }

    this.props = nextElement.props;

    if (this.componentDidUpdate) {
      transaction.getReactMountReady().enqueue(this.componentDidUpdate, this);
    }
  }

  mountComponent(rootID, transaction, context) {
    this.props = this._currentElement.props;
    this.createDisplayObject();

    this._context = context;
    this._mountOrder = nextMountID++;
    this._rootNodeID = rootID;
    this._instance = this;

    this.parent = this._context && this._context.parent || context && context.parent;
    var parentPixiContainer = null;

    if (!this.parent) {
      this._isRootLibertyNode = true;
    } else {
      this.parent.children.push(this);
      this.parent._displayObject.appendChild(this._displayObject);
    }

    if (this.componentDidMount) {
      transaction.getReactMountReady().enqueue(this.componentDidMount, this);
    }

    return this;
  }

  mountComponentToDOM() {
    try {
      //If is being added to ReactDOM node then consider X,Y of it`ss bounding rect as a location
      var parentId = this._instance._rootNodeID.substr(0, this._instance._rootNodeID.lastIndexOf('.'));
      this.DOMParent = ReactMount.getNode(parentId);
      var boundingRect = this.DOMParent.getBoundingClientRect();

      var styles = window.getComputedStyle(this.DOMParent);
      var paddingLeft = parseInt(styles.paddingLeft);
      var paddingTop = parseInt(styles.paddingTop);

      this.parentX = paddingLeft;
      this.parentY = paddingTop;

      if (this.DOMParent.style.position !== 'absolute' || this.DOMParent.style.position !== 'fixed') {
        this.DOMParent.style.position = 'relative';
      }

      this.DOMParent.appendChild(this._displayObject);

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

    if (this._displayObject) {
      this._displayObject.parentNode.removeChild(this._displayObject);
    }

    if (this.parent) {
      var indexOnParent = this.parent.children.indexOf(this);
      if (indexOnParent !== -1) {
        this.parent.children.splice(indexOnParent, 1);
      }
    }
  }

  updateDisplayObject() {
    //Debugging
    //console.trace('@S+update child coordinates');
    //console.log('Updating : ' + this.constructor.name + ', ' + JSON.stringify(this.layout));

    //Needed if we scale from center but adds additional calculation
    //var halfWidth = 0;
    //var halfHeight = 0;
    /*var halfWidth = (((this.layout && this.layout.width) || this.style.width) / 2) || 0;
     var halfHeight = (((this.layout && this.layout.height) || this.style.height) / 2) || 0;
     this._displayObject.pivot.x = halfWidth;
     this._displayObject.pivot.y = halfHeight;*/
    //this._displayObject.scale.x = this.style.scale || 1;
    //this._displayObject.scale.y = this.style.scale || 1;

    //Rotation
    //this._displayObject.rotation = this.props && parseInt(this.props.rotation, 10) || 0;

    //Opacity
    if (this._displayObject._cachedOpacity !== this.style.opacity && this.style.opacity) {
      this._displayObject._cachedOpacity = this._displayObject.style.opacity = this.style.opacity || 1;
      this._modified = this._displayObject._cachedOpacity !== 1 || this._displayObject._cachedOpacity !== 0 ? true : false;
    }

    //Translation
    var x = 0;
    var y = 0;

    x = this.style.translateX || 0 + (this.layout && this.layout.left || (this.props && this.props.x) || 0);// + halfWidth;
    y = this.style.translateY || 0 + (this.layout && this.layout.top || (this.props && this.props.y) || 0);// + halfHeight;

    if (this.DOMParent) {
      x += this.parentX;
      y += this.parentY;
    }

    var transform = (this._modified || this.style.translateX || this.style.translateY) ? 'translateZ(0)' : '';
    transform += 'translateX(' + x + 'px) translateY(' + y + 'px)';

    if (this._displayObject.style[transformPropertyName] !== transform) {
      this._displayObject.style[transformPropertyName] = transform;
    }
  }

  get style() {
    return this.props && this.props.style || {};
  }

  componentDidUpdate() {
    this.updateDisplayObject();
  }

  componentDidMount() {
    if (this._isRootLibertyNode) {
      setTimeout(this.mountComponentToDOM.bind(this), 100);
    }
    this.updateDisplayObject();
  }

  render() {
    return this;
  }

  getPublicInstance() {
    return this;
  }
}

//Detecting transform property
var testEl = document.createElement('div');
testEl.style.MozTransform = 'translate(100px) rotate(20deg)';
testEl.style.webkitTransform = 'translate(100px) rotate(20deg)';
var styleAttrLowercase = testEl.getAttribute('style').toLowerCase();
var hasWebkitTransform = styleAttrLowercase.indexOf('webkit') !== -1;
var transformPropertyName = hasWebkitTransform ? 'webkitTransform' : 'transform';

module.exports = ReactLibertyElement;
