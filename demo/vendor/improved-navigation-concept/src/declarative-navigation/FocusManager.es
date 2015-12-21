import _ from 'lodash';

// both NavigationContainer's and Focusable's are stored in this tree
let focusables = {};
let currentFocusedComponentNode = null;

let currentFocusedNavigationContainerId = null;
let focusState = {};

global.focusables = focusables;

export function initializeFocus() {
  recalculateFocusableComponentsDimensions();

  let root = focusables.root;
  if (!root) {
    return;
  }

  let strategy = getNavigationStrategy(root);

  if (!strategy) {
    throw new Error('no "strategy" specified for the NavigationContainer with id: ' + root.component.id);
  }

  currentFocusedComponentNode = recursivelyGetPreferredFocusedComponentNode(root, strategy, null);
  executeNodeFocusCallbacks(currentFocusedComponentNode);
}

export function registerFocusableComponent(focusableComponent) {
  if (focusableComponent.parentId == null && focusables.root == null) {

    // focusableComponent is a root container
    focusables.root = {
      parent: null,
      component: focusableComponent,
      domNode: null,
      children: null
    };
  } else {
    let parentNode = findTreeNode(focusables, (node) => node.component.id === focusableComponent.parentId);

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

export function unregisterFocusableComponent(focusableComponent) {
  let componentNode = findTreeNode(focusables, (node) => node.component === focusableComponent);
  let parentNode = componentNode.parent;

  if (parentNode) {
    _.remove(parentNode.children, componentNode);
  } else {
    // containerComponent is the root
    focusables.root = null;
  }

  componentNode.parent = null;
  componentNode.component = null;
  componentNode.domNode = null;
  componentNode.children = null;
}

export function setFocusableComponentDomNode(focusableComponent, domNode) {
  let componentNode = findTreeNode(focusables, (node) => node.component === focusableComponent);

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

var executeActionFocusCallbacks = function(currentFocusedComponentNode, nextFocusedComponentNode) {

  let nextFocusedContainerNode = nextFocusedComponentNode.parent;
  let currentContainerComponentNode = currentFocusedComponentNode.parent;

  if (nextFocusedContainerNode !== currentContainerComponentNode) {
    executeNodeBlurCallbacks(currentContainerComponentNode);
    executeNodeFocusCallbacks(nextFocusedContainerNode);
  }

  executeNodeBlurCallbacks(currentFocusedComponentNode);
  executeNodeFocusCallbacks(nextFocusedComponentNode);
}

export function doUp() {
  let nextFocusedComponentNode = getNextFocusedComponent(currentFocusedComponentNode, 'Up');

  if (nextFocusedComponentNode === currentFocusedComponentNode) {
    return; //do nothing, we already have it focused
  }

  executeActionFocusCallbacks(currentFocusedComponentNode, nextFocusedComponentNode);

  currentFocusedComponentNode = nextFocusedComponentNode;
}
export function doDown() {
  let nextFocusedComponentNode = getNextFocusedComponent(currentFocusedComponentNode, 'Down');

  if (nextFocusedComponentNode === currentFocusedComponentNode) {
    return; //do nothing, we already have it focused
  }

  executeActionFocusCallbacks(currentFocusedComponentNode, nextFocusedComponentNode);

  currentFocusedComponentNode = nextFocusedComponentNode;
}

export function doLeft() {
  let nextFocusedComponentNode = getNextFocusedComponent(currentFocusedComponentNode, 'Left');

  if (nextFocusedComponentNode === currentFocusedComponentNode) {
    return; //do nothing, we already have it focused
  }

  executeActionFocusCallbacks(currentFocusedComponentNode, nextFocusedComponentNode);
  currentFocusedComponentNode = nextFocusedComponentNode;
}
export function doRight() {
  let nextFocusedComponentNode = getNextFocusedComponent(currentFocusedComponentNode, 'Right');

  if (nextFocusedComponentNode === currentFocusedComponentNode) {
    return; //do nothing, we already have it focused
  }

  executeActionFocusCallbacks(currentFocusedComponentNode, nextFocusedComponentNode);
  currentFocusedComponentNode = nextFocusedComponentNode;
}

export function doSelect() {
  currentFocusedComponentNode && currentFocusedComponentNode.component.props.onSelect();
}

export function recalculateFocusableComponentsDimensions() {
  const startTime = global.performance.now();
  let count = 0;
  forEachTreeNode(focusables, (node) => {
  // FIXME:
  if (!node.domNode) { return; }

  const clientRect = node.domNode.getBoundingClientRect();

  node.top = clientRect.top | 0;
  node.left = clientRect.left | 0;
  node.right = clientRect.right | 0;
  node.bottom = clientRect.bottom | 0;

  count++;
});

const endTime = global.performance.now();
console.info('[FOCUS MANAGER] - ' + count + ' elements takes duration to recalculate:' + (endTime - startTime));
}


//========================== private =========================================

function getNavigationStrategy(containerComponentNode) {
  let component = containerComponentNode.component;
  return _.property('getPreferredFocusedComponentNode')(component) && {
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
    let parentContainerNode = startNode.parent;

    if (!parentContainerNode) {
      return currFocusedComponent;
    }

    let parentNavigationStrategy = getNavigationStrategy(parentContainerNode);
    let nextFocusedNode = parentNavigationStrategy[`move${direction}`](parentContainerNode, currFocusedComponent);

    let nextFocusNodeNavigationStrategy = getNavigationStrategy(nextFocusedNode);
    let isContainerNode = nextFocusNodeNavigationStrategy != null;

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
  let preferredFocusedComponentNode = navigationStrategy.getPreferredFocusedComponentNode(
    containerNode,
    prevFocusedComponentNode
  );

  if (!preferredFocusedComponentNode) return null;

  if (!getNavigationStrategy(preferredFocusedComponentNode)) {
    return preferredFocusedComponentNode;
  }

  return recursivelyGetPreferredFocusedComponentNode(
    preferredFocusedComponentNode,
    getNavigationStrategy(preferredFocusedComponentNode),
    prevFocusedComponentNode
  );
}

// tree manipulations

function findTreeNode(tree, predicate) {
  const queue = [tree.root];
  let currentNode;
  while (currentNode = queue.shift()) {

    if (predicate(currentNode)) {
      return currentNode;
    }

    _.each(currentNode.children, (childNode) => queue.push(childNode));
  }
}

function forEachTreeNode(tree, iteratee) {
  const queue = [tree.root];
  let currentNode;
  while (currentNode = queue.shift()) {
    iteratee(currentNode);

    _.each(currentNode.children, (childNode) => queue.push(childNode));
  }
}

function addChild(node, child) {
  if (!_.isArray(node.children)) {
    node.children = [];
  }

  node.children.push(child);
}
