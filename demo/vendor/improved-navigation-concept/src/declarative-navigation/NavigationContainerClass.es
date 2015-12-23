import _ from 'lodash';
import React from 'react';
import { registerFocusableComponent, unregisterFocusableComponent, setFocusableComponentDomNode } from './FocusManager';

export default class NavigationContainerClass extends React.Component {
  constructor(props) {
    super(props);

    this.id = _.uniqueId('NavigationContainer');
  }

  getChildContext() {
    return {
      navigationContainerId: this.id
    };
  }

  componentWillMount() {
    this.parentId = (this.context) ? this.context.navigationContainerId : null;
    registerFocusableComponent(this);
  }

  /*componentDidMount() {
    setFocusableComponentDomNode(this, ReactDOM.findDOMNode(this));
  }*/

  componentWillUnmount() {
    unregisterFocusableComponent(this);
    this.parentId = null;
  }

  // navigation methods
  getPreferredFocusedComponentNode(containerNode, prevFocusedComponentNode) {
    return this.props.strategy.getPreferredFocusedComponentNode(containerNode, prevFocusedComponentNode);
  }

  moveUp(containerNode, prevFocusedComponentNode) {
    return this.props.strategy.moveUp(containerNode, prevFocusedComponentNode);
  }

  moveDown(containerNode, prevFocusedComponentNode) {
    return this.props.strategy.moveDown(containerNode, prevFocusedComponentNode);
  }

  moveLeft(containerNode, prevFocusedComponentNode) {
    return this.props.strategy.moveLeft(containerNode, prevFocusedComponentNode);
  }

  moveRight(containerNode, prevFocusedComponentNode) {
    return this.props.strategy.moveRight(containerNode, prevFocusedComponentNode);
  }

  render() {
    return (
        <span>{this.props.children}</span>
    );
  }
}

NavigationContainerClass.propTypes = {
  strategy: React.PropTypes.shape({
    getPreferredFocusedComponentNode: React.PropTypes.func,
    moveUp: React.PropTypes.func,
    moveDown: React.PropTypes.func,
    moveLeft: React.PropTypes.func,
    moveRight: React.PropTypes.func
  }),
  onBlur: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onSelect: React.PropTypes.func
};
NavigationContainerClass.defaultProps = {
  onBlur: _.noop,
  onFocus: _.noop,
  onSelect: _.noop
};
NavigationContainerClass.childContextTypes = {
  navigationContainerId: React.PropTypes.string
};
NavigationContainerClass.contextTypes = {
  navigationContainerId: React.PropTypes.string
};
