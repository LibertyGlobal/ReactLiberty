import _ from 'lodash';
import React from 'react';
import { registerFocusableComponent, unregisterFocusableComponent } from './FocusManager'

export default {

  contextTypes: {
    navigationContainerId: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      onBlur: _.noop,
      onFocus: _.noop,
      onSelect: _.noop
    };
  },

  componentWillMount() {
    this.id = _.uniqueId('Focusable');
    this.parentId = this.context.navigationContainerId;
    registerFocusableComponent(this);
  },

  componentWillUnmount() {
    unregisterFocusableComponent(this);
    this.parentId = null;
  }

}
