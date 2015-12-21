/**
 * FIXME: very poor implementation
 * @param candidateNodes {array} - array of TreeNode's nodes to search within
 * @param targetComponentNode {TreeNode}
 * @returns {TreeNode | null}
 */
export function getClosestUpperNode(candidateNodes, targetComponentNode) {
  let closestNode;

  _.forEach(candidateNodes, (candidateNode) => {
    if (targetComponentNode === candidateNode) {
      return;
    }
    if (!isAboveComponent(targetComponentNode, candidateNode)) {
      return;
    }

    if (
        !closestNode ||
        (
            closestNode.bottom <= candidateNode.bottom &&
            Math.abs(candidateNode.left - targetComponentNode.left) <= Math.abs(closestNode.left - targetComponentNode.left)
        )
    ) {
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
 export function getClosestLowerNode(candidateNodes, targetComponentNode) {
  let closestNode;

  _.forEach(candidateNodes, (candidateNode) => {
    if (targetComponentNode === candidateNode) {
      return;
    }
    if (!isBelowComponent(targetComponentNode, candidateNode)) {
      return;
    }

    if (
        !closestNode ||
        (
            candidateNode.top <= closestNode.top &&
            Math.abs(candidateNode.left - targetComponentNode.left) <= Math.abs(closestNode.left - targetComponentNode.left)
        )
    ) {
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
export function getClosestLeftNode(candidateNodes, targetComponentNode) {
  let closestNode;

  _.forEach(candidateNodes, (candidateNode) => {
    if (targetComponentNode === candidateNode) {
      return;
    }

    if (!isLeftToComponent(targetComponentNode, candidateNode)) {
      return;
    }

    if (
        !closestNode ||
        (
            closestNode.right <= candidateNode.right &&
            Math.abs(candidateNode.top - targetComponentNode.top) <= Math.abs(closestNode.top - targetComponentNode.top)
        )
    ) {
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
export function getClosestRightNode(candidateNodes, targetComponentNode) {
  let closestNode;

  _.forEach(candidateNodes, (candidateNode) => {
    if (targetComponentNode === candidateNode) {
      return;
    }

    if (!isRightToComponent(targetComponentNode, candidateNode)) {
      return;
    }

    if (
        !closestNode ||
        (
            candidateNode.left <= closestNode.left &&
            Math.abs(candidateNode.top - targetComponentNode.top) <= Math.abs(closestNode.top - targetComponentNode.top)
        )
    ) {
      closestNode = candidateNode;
    }
  });

  return closestNode;
}

export function isAboveComponent(bottomComponent, topComponent) {
  return topComponent.bottom < bottomComponent.bottom;
}

export function isBelowComponent(topComponent, bottomComponent) {
  return bottomComponent.top > topComponent.top;
}

export function isLeftToComponent(rightComponent, leftComponent) {
  return leftComponent.right < rightComponent.right;
}

export function isRightToComponent(leftComponent, rightComponent) {
  return rightComponent.left > leftComponent.left;
}