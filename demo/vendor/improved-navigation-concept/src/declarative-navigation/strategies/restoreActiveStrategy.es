import _ from 'lodash';
import {
    getClosestUpperNode,
    getClosestLowerNode,
    getClosestLeftNode,
    getClosestRightNode
} from './spatial-navigation-utils/Disposition'

export default {
  getPreferredFocusedComponentNode(containerNode, prevFocusedComponentNode) {
    let activeChild = _.find(containerNode.children, (candidateNode) => {
      return candidateNode.component.props.isNavigationActive;
    });

    return activeChild || containerNode.children[0];
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
