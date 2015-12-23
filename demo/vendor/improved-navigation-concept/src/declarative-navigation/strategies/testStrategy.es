import _ from 'lodash';
import {
    getClosestUpperNode,
    getClosestLowerNode,
    getClosestLeftNode,
    getClosestRightNode,
    isAboveComponent,
    isBelowComponent,
    isLeftToComponent,
    isRightToComponent
} from './spatial-navigation-utils/Disposition'

export default {
  getPreferredFocusedComponentNode(containerNode, prevFocusedComponentNode) {
    if (!prevFocusedComponentNode) {
      return containerNode.children[0];
    }

    if (isAboveComponent(prevFocusedComponentNode, containerNode)) {
      return getClosestUpperNode(containerNode.children, prevFocusedComponentNode);
    }

    if (isBelowComponent(prevFocusedComponentNode, containerNode)) {
      return getClosestLowerNode(containerNode.children, prevFocusedComponentNode);
    }

    if (isLeftToComponent(prevFocusedComponentNode, containerNode)) {
      return getClosestLeftNode(containerNode.children, prevFocusedComponentNode);
    }

    if (isRightToComponent(prevFocusedComponentNode, containerNode)) {
      return getClosestRightNode(containerNode.children, prevFocusedComponentNode);
    }

    return containerNode.children[0];
  },

  moveUp(containerNode, prevFocusedComponentNode) {
    return getClosestUpperNode(containerNode.children, prevFocusedComponentNode) || 'loseFocus';
  },

  moveDown(containerNode, prevFocusedComponentNode) {
    return getClosestLowerNode(containerNode.children, prevFocusedComponentNode) || 'loseFocus';
},

  moveLeft(containerNode, prevFocusedComponentNode) {
    return getClosestLeftNode(containerNode.children, prevFocusedComponentNode) || 'loseFocus';
  },

  moveRight(containerNode, prevFocusedComponentNode) {
    return getClosestRightNode(containerNode.children, prevFocusedComponentNode) || 'loseFocus';
  }
};
