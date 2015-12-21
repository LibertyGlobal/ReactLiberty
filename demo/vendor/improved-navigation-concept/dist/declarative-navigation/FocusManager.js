'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeFocus = initializeFocus;
exports.registerFocusableComponent = registerFocusableComponent;
exports.unregisterFocusableComponent = unregisterFocusableComponent;
exports.setFocusableComponentDomNode = setFocusableComponentDomNode;
exports.doUp = doUp;
exports.doDown = doDown;
exports.doLeft = doLeft;
exports.doRight = doRight;
exports.doSelect = doSelect;
exports.recalculateFocusableComponentsDimensions = recalculateFocusableComponentsDimensions;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// both NavigationContainer's and Focusable's are stored in this tree
var focusables = {};
var currentFocusedComponentNode = null;

var currentFocusedNavigationContainerId = null;
var focusState = {};

global.focusables = focusables;

function initializeFocus() {
  recalculateFocusableComponentsDimensions();

  var root = focusables.root;
  if (!root) {
    return;
  }

  var strategy = getNavigationStrategy(root);

  if (!strategy) {
    throw new Error('no "strategy" specified for the NavigationContainer with id: ' + root.component.id);
  }

  currentFocusedComponentNode = recursivelyGetPreferredFocusedComponentNode(root, strategy, null);
  executeNodeFocusCallbacks(currentFocusedComponentNode);
}

function registerFocusableComponent(focusableComponent) {
  if (focusableComponent.parentId == null && focusables.root == null) {

    // focusableComponent is a root container
    focusables.root = {
      parent: null,
      component: focusableComponent,
      domNode: null,
      children: null
    };
  } else {
    var parentNode = findTreeNode(focusables, function (node) {
      return node.component.id === focusableComponent.parentId;
    });

    if (!parentNode) {
      throw new Error('cannot find parent component with id: ' + focusableComponent.parentId);
    }

    addChild(parentNode, {
      parent: parentNode,
      component: focusableComponent,
      domNode: null,
      children: null
    });
  }
}

function unregisterFocusableComponent(focusableComponent) {
  var componentNode = findTreeNode(focusables, function (node) {
    return node.component === focusableComponent;
  });
  var parentNode = componentNode.parent;

  if (parentNode) {
    _lodash2.default.remove(parentNode.children, componentNode);
  } else {
    // containerComponent is the root
    focusables.root = null;
  }

  componentNode.parent = null;
  componentNode.component = null;
  componentNode.domNode = null;
  componentNode.children = null;
}

function setFocusableComponentDomNode(focusableComponent, domNode) {
  var componentNode = findTreeNode(focusables, function (node) {
    return node.component === focusableComponent;
  });

  componentNode.domNode = domNode;
}

var executeNodeBlurCallbacks = function executeNodeBlurCallbacks(node) {
  node.component.props.onBlur ? node.component.props.onBlur() : null;
  node.component.componentLostFocus ? node.component.componentLostFocus() : null;
};

var executeNodeFocusCallbacks = function executeNodeFocusCallbacks(node) {
  node.component.props.onBlur ? node.component.props.onBlur() : null;
  node.component.componentReceivedFocus ? node.component.componentReceivedFocus() : null;
};

var executeActionFocusCallbacks = function executeActionFocusCallbacks(currentFocusedComponentNode, nextFocusedComponentNode) {

  var nextFocusedContainerNode = nextFocusedComponentNode.parent;
  var currentContainerComponentNode = currentFocusedComponentNode.parent;

  if (nextFocusedContainerNode !== currentContainerComponentNode) {
    executeNodeBlurCallbacks(currentContainerComponentNode);
    executeNodeFocusCallbacks(nextFocusedContainerNode);
  }

  executeNodeBlurCallbacks(currentFocusedComponentNode);
  executeNodeFocusCallbacks(nextFocusedComponentNode);
};

function doUp() {
  var nextFocusedComponentNode = getNextFocusedComponent(currentFocusedComponentNode, 'Up');

  if (nextFocusedComponentNode === currentFocusedComponentNode) {
    return; //do nothing, we already have it focused
  }

  executeActionFocusCallbacks(currentFocusedComponentNode, nextFocusedComponentNode);

  currentFocusedComponentNode = nextFocusedComponentNode;
}
function doDown() {
  var nextFocusedComponentNode = getNextFocusedComponent(currentFocusedComponentNode, 'Down');

  if (nextFocusedComponentNode === currentFocusedComponentNode) {
    return; //do nothing, we already have it focused
  }

  executeActionFocusCallbacks(currentFocusedComponentNode, nextFocusedComponentNode);

  currentFocusedComponentNode = nextFocusedComponentNode;
}

function doLeft() {
  var nextFocusedComponentNode = getNextFocusedComponent(currentFocusedComponentNode, 'Left');

  if (nextFocusedComponentNode === currentFocusedComponentNode) {
    return; //do nothing, we already have it focused
  }

  executeActionFocusCallbacks(currentFocusedComponentNode, nextFocusedComponentNode);
  currentFocusedComponentNode = nextFocusedComponentNode;
}
function doRight() {
  var nextFocusedComponentNode = getNextFocusedComponent(currentFocusedComponentNode, 'Right');

  if (nextFocusedComponentNode === currentFocusedComponentNode) {
    return; //do nothing, we already have it focused
  }

  executeActionFocusCallbacks(currentFocusedComponentNode, nextFocusedComponentNode);
  currentFocusedComponentNode = nextFocusedComponentNode;
}

function doSelect() {
  currentFocusedComponentNode && currentFocusedComponentNode.component.props.onSelect();
}

function recalculateFocusableComponentsDimensions() {
  var startTime = global.performance.now();
  var count = 0;
  forEachTreeNode(focusables, function (node) {
    // FIXME:
    if (!node.domNode) {
      return;
    }

    var clientRect = node.domNode.getBoundingClientRect();

    node.top = clientRect.top | 0;
    node.left = clientRect.left | 0;
    node.right = clientRect.right | 0;
    node.bottom = clientRect.bottom | 0;

    count++;
  });

  var endTime = global.performance.now();
  console.info('[FOCUS MANAGER] - ' + count + ' elements takes duration to recalculate:' + (endTime - startTime));
}

//========================== private =========================================

function getNavigationStrategy(containerComponentNode) {
  var component = containerComponentNode.component;
  return _lodash2.default.property('getPreferredFocusedComponentNode')(component) && {
    getPreferredFocusedComponentNode: component.getPreferredFocusedComponentNode.bind(component),
    moveUp: component.moveUp.bind(component),
    moveDown: component.moveDown.bind(component),
    moveLeft: component.moveLeft.bind(component),
    moveRight: component.moveRight.bind(component)
  };
}

function getNextFocusedComponent(focusedComponent, direction) {

  return _getNextFocusedComponent(focusedComponent, focusedComponent, direction);

  function _getNextFocusedComponent(startNode, currFocusedComponent, direction) {
    var parentContainerNode = startNode.parent;

    if (!parentContainerNode) {
      return currFocusedComponent;
    }

    var parentNavigationStrategy = getNavigationStrategy(parentContainerNode);
    var nextFocusedNode = parentNavigationStrategy['move' + direction](parentContainerNode, currFocusedComponent);

    var nextFocusNodeNavigationStrategy = getNavigationStrategy(nextFocusedNode);
    var isContainerNode = nextFocusNodeNavigationStrategy != null;

    if (isContainerNode) {
      return recursivelyGetPreferredFocusedComponentNode(nextFocusedNode, nextFocusNodeNavigationStrategy, currFocusedComponent);
    }

    if (nextFocusedNode === 'loseFocus') {
      return _getNextFocusedComponent(parentContainerNode, currFocusedComponent, direction);
    }

    return nextFocusedNode;
  }
}

function recursivelyGetPreferredFocusedComponentNode(containerNode, navigationStrategy, prevFocusedComponentNode) {
  var preferredFocusedComponentNode = navigationStrategy.getPreferredFocusedComponentNode(containerNode, prevFocusedComponentNode);

  if (!preferredFocusedComponentNode) return null;

  if (!getNavigationStrategy(preferredFocusedComponentNode)) {
    return preferredFocusedComponentNode;
  }

  return recursivelyGetPreferredFocusedComponentNode(preferredFocusedComponentNode, getNavigationStrategy(preferredFocusedComponentNode), prevFocusedComponentNode);
}

// tree manipulations

function findTreeNode(tree, predicate) {
  var queue = [tree.root];
  var currentNode = undefined;
  while (currentNode = queue.shift()) {

    if (predicate(currentNode)) {
      return currentNode;
    }

    _lodash2.default.each(currentNode.children, function (childNode) {
      return queue.push(childNode);
    });
  }
}

function forEachTreeNode(tree, iteratee) {
  var queue = [tree.root];
  var currentNode = undefined;
  while (currentNode = queue.shift()) {
    iteratee(currentNode);

    _lodash2.default.each(currentNode.children, function (childNode) {
      return queue.push(childNode);
    });
  }
}

function addChild(node, child) {
  if (!_lodash2.default.isArray(node.children)) {
    node.children = [];
  }

  node.children.push(child);
}