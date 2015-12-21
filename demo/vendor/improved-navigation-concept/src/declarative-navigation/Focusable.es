import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { registerFocusableComponent, unregisterFocusableComponent, setFocusableComponentDomNode } from './FocusManager'

export default class Focusable extends React.Component {
  constructor(props) {
    super(props);

    this.id = _.uniqueId('Focusable');
  }

  componentWillMount() {
    this.parentId = this.context.navigationContainerId;
    registerFocusableComponent(this);
  }

  componentDidMount() {
    setFocusableComponentDomNode(this, ReactDOM.findDOMNode(this));
  }

  componentWillUnmount() {
    unregisterFocusableComponent(this);
    this.parentId = null;
  }

  render() {
    return (
        <span>
          {React.Children.only(this.props.children)}
        </span>
    );
  }
}

Focusable.propTypes = {
  children: React.PropTypes.element.isRequired,
  onBlur: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onSelect: React.PropTypes.func
};
Focusable.defaultProps = {
  onBlur: _.noop,
  onFocus: _.noop,
  onSelect: _.noop
};
Focusable.contextTypes = {
  navigationContainerId: React.PropTypes.string
};
