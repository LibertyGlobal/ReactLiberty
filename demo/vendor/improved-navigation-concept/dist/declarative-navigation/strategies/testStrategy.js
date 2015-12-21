'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Disposition = require('./spatial-navigation-utils/Disposition');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  getPreferredFocusedComponentNode: function getPreferredFocusedComponentNode(containerNode, prevFocusedComponentNode) {
    if (!prevFocusedComponentNode) {
      return containerNode.children[0];
    }

    if ((0, _Disposition.isAboveComponent)(prevFocusedComponentNode, containerNode)) {
      return (0, _Disposition.getClosestUpperNode)(containerNode.children, prevFocusedComponentNode);
    }

    if ((0, _Disposition.isBelowComponent)(prevFocusedComponentNode, containerNode)) {
      return (0, _Disposition.getClosestLowerNode)(containerNode.children, prevFocusedComponentNode);
    }

    if ((0, _Disposition.isLeftToComponent)(prevFocusedComponentNode, containerNode)) {
      return (0, _Disposition.getClosestLeftNode)(containerNode.children, prevFocusedComponentNode);
    }

    if ((0, _Disposition.isRightToComponent)(prevFocusedComponentNode, containerNode)) {
      return (0, _Disposition.getClosestRightNode)(containerNode.children, prevFocusedComponentNode);
    }

    return containerNode.children[0];
  },
  moveUp: function moveUp(containerNode, prevFocusedComponentNode) {
    return (0, _Disposition.getClosestUpperNode)(containerNode.children, prevFocusedComponentNode) || 'loseFocus';
  },
  moveDown: function moveDown(containerNode, prevFocusedComponentNode) {
    return (0, _Disposition.getClosestLowerNode)(containerNode.children, prevFocusedComponentNode) || 'loseFocus';
  },
  moveLeft: function moveLeft(containerNode, prevFocusedComponentNode) {
    return (0, _Disposition.getClosestLeftNode)(containerNode.children, prevFocusedComponentNode) || 'loseFocus';
  },
  moveRight: function moveRight(containerNode, prevFocusedComponentNode) {
    return (0, _Disposition.getClosestRightNode)(containerNode.children, prevFocusedComponentNode) || 'loseFocus';
  }
};