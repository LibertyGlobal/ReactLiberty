"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClosestUpperNode = getClosestUpperNode;
exports.getClosestLowerNode = getClosestLowerNode;
exports.getClosestLeftNode = getClosestLeftNode;
exports.getClosestRightNode = getClosestRightNode;
exports.isAboveComponent = isAboveComponent;
exports.isBelowComponent = isBelowComponent;
exports.isLeftToComponent = isLeftToComponent;
exports.isRightToComponent = isRightToComponent;
/**
 * FIXME: very poor implementation
 * @param candidateNodes {array} - array of TreeNode's nodes to search within
 * @param targetComponentNode {TreeNode}
 * @returns {TreeNode | null}
 */
function getClosestUpperNode(candidateNodes, targetComponentNode) {
  var closestNode = undefined;

  _.forEach(candidateNodes, function (candidateNode) {
    if (targetComponentNode === candidateNode) {
      return;
    }
    if (!isAboveComponent(targetComponentNode, candidateNode)) {
      return;
    }

    if (!closestNode || closestNode.bottom <= candidateNode.bottom && Math.abs(candidateNode.left - targetComponentNode.left) <= Math.abs(closestNode.left - targetComponentNode.left)) {
      closestNode = candidateNode;
    }
  });

  return closestNode;
}

/**
 * FIXME: very poor implementation
 * @param candidateNodes {array} - array of TreeNode's nodes to search within
 * @param targetComponentNode {TreeNode}
 * @returns {TreeNode | null}
 */
function getClosestLowerNode(candidateNodes, targetComponentNode) {
  var closestNode = undefined;

  _.forEach(candidateNodes, function (candidateNode) {
    if (targetComponentNode === candidateNode) {
      return;
    }
    if (!isBelowComponent(targetComponentNode, candidateNode)) {
      return;
    }

    if (!closestNode || candidateNode.top <= closestNode.top && Math.abs(candidateNode.left - targetComponentNode.left) <= Math.abs(closestNode.left - targetComponentNode.left)) {
      closestNode = candidateNode;
    }
  });

  return closestNode;
}

/**
 * FIXME: very poor implementation
 * @param candidateNodes {array} - array of TreeNode's nodes to search within
 * @param targetComponentNode {TreeNode}
 * @returns {TreeNode | null}
 */
function getClosestLeftNode(candidateNodes, targetComponentNode) {
  var closestNode = undefined;

  _.forEach(candidateNodes, function (candidateNode) {
    if (targetComponentNode === candidateNode) {
      return;
    }

    if (!isLeftToComponent(targetComponentNode, candidateNode)) {
      return;
    }

    if (!closestNode || closestNode.right <= candidateNode.right && Math.abs(candidateNode.top - targetComponentNode.top) <= Math.abs(closestNode.top - targetComponentNode.top)) {
      closestNode = candidateNode;
    }
  });

  return closestNode;
}

/**
 * FIXME: very poor implementation
 * @param candidateNodes {array} - array of TreeNode's nodes to search within
 * @param targetComponentNode {TreeNode}
 * @returns {TreeNode | null}
 */
function getClosestRightNode(candidateNodes, targetComponentNode) {
  var closestNode = undefined;

  _.forEach(candidateNodes, function (candidateNode) {
    if (targetComponentNode === candidateNode) {
      return;
    }

    if (!isRightToComponent(targetComponentNode, candidateNode)) {
      return;
    }

    if (!closestNode || candidateNode.left <= closestNode.left && Math.abs(candidateNode.top - targetComponentNode.top) <= Math.abs(closestNode.top - targetComponentNode.top)) {
      closestNode = candidateNode;
    }
  });

  return closestNode;
}

function isAboveComponent(bottomComponent, topComponent) {
  return topComponent.bottom < bottomComponent.bottom;
}

function isBelowComponent(topComponent, bottomComponent) {
  return bottomComponent.top > topComponent.top;
}

function isLeftToComponent(rightComponent, leftComponent) {
  return leftComponent.right < rightComponent.right;
}

function isRightToComponent(leftComponent, rightComponent) {
  return rightComponent.left > leftComponent.left;
}