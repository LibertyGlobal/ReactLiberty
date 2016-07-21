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
    this._visible = true;

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
    return new PIXI.Sprite();
  }

  createDisplayObject() {
    this._displayObject = this._displayObject || this.getDisplayObject();
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

    this.parent = this._context && this._context.parent;
    var parentPixiContainer = null;

    if (!this.parent) {
      this._isRootLibertyNode = true;
    } else {
      this.parent.children.push(this);
      this.parent._displayObject.addChild(this._displayObject);
      this._displayObject.mountOrder = this._mountOrder;
      console.log('Mounted ', this._mountOrder, this.parent._mountOrder);
    }

    if (this.componentDidMount) {
      transaction.getReactMountReady().enqueue(this.componentDidMount, this);
    }

    return this;
  }

  mountComponentToDOM() {
    try {
      //If is being added to ReactDOM node then consider X,Y of it`s bounding rect as a location
      var parentId = this._instance._rootNodeID.substr(0, this._instance._rootNodeID.lastIndexOf('.'));
      this.DOMParent = ReactMount.getNode(parentId);
      var boundingRect = this.DOMParent.getBoundingClientRect();

      var styles = window.getComputedStyle(this.DOMParent);
      var paddingLeft = parseInt(styles.paddingLeft);
      var paddingTop = parseInt(styles.paddingTop);

      this.parentX = boundingRect.left + paddingLeft;
      this.parentY = boundingRect.top + paddingTop;

      if (this.DOMParent.style.position !== 'absolute' || this.DOMParent.style.position !== 'fixed') {
        this.DOMParent.style.position = 'relative';
      }

      ReactLiberty.document.addChild(this._displayObject);

      console.log('Mounting to DOM');

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

    // Some existing components rely on inst.props even after they've been
    // destroyed (in event handlers).
    // TODO: inst.props = null;
    // TODO: inst.state = null;
    // TODO: inst.context = null;

    if (this._displayObject) {
      this._displayObject.parent.removeChild(this._displayObject);
      this._displayObject.destroy(false);
      ReactLiberty.markStageAsChanged();
    }
  }

  updateDisplayObject() {
    console.time("Update " + this.constructor.name);
    var halfWidth = 0;
    var halfHeight = 0;

    //Needed if we scale from center but adds additional calculation
    /*var halfWidth = (((this.layout && this.layout.width) || this.style.width) / 2) || 0;
     var halfHeight = (((this.layout && this.layout.height) || this.style.height) / 2) || 0;
     this._displayObject.pivot.x = halfWidth;
     this._displayObject.pivot.y = halfHeight;*/

    //this._displayObject.scale.x = this.style.scale || 1;
    //this._displayObject.scale.y = this.style.scale || 1;

    this._displayObject.x = this.style.translateX || 0 + (this.layout && this.layout.left || (this.props && this.props.x) || 0);// + halfWidth;
    this._displayObject.y = this.style.translateY || 0 + (this.layout && this.layout.top || (this.props && this.props.y) || 0);// + halfHeight;

    this._displayObject.alpha = this.style.opacity || 1;

    if (this.DOMParent) {
      this._displayObject.x += this.parentX;
      this._displayObject.y += this.parentY;
    }

    this._displayObject.rotation = this.props && parseInt(this.props.rotation, 10) || 0;

    this.updateVisibility();

    if (this._visible && !ReactLiberty.shouldRedraw) {
      ReactLiberty.markStageAsChanged();
    }
  }

  //Viewport culling
  updateVisibility() {
    this._displayObject.visible = this._visible = this.isOnScreen();
  }

  isOnScreen() {
    var bounds = this._displayObject.toGlobal({x:0, y:0});
    var stageW = ReactLiberty.renderer.width;
    var stageH = ReactLiberty.renderer.height;

    if(bounds.x > stageW || bounds.y > stageH || bounds.x + bounds.width < 0 || bounds.y + bounds.height < 0) {
      return false;
    }

    return true;
  }

  get style() {
    var style = (this.props && this.props.style) || this._style;
    return style;
  }

  componentDidUpdate() {
    this.updateDisplayObject();
  }

  componentDidMount() {
    if (this._isRootLibertyNode) {
      setTimeout(this.mountComponentToDOM.bind(this), 0);
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

module.exports = ReactLibertyElement;
