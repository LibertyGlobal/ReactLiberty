'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FocusManager = require('./FocusManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  getDefaultProps: function getDefaultProps() {
    return {
      onBlur: _lodash2.default.noop,
      onFocus: _lodash2.default.noop,
      onSelect: _lodash2.default.noop
    };
  },

  childContextTypes: {
    navigationContainerId: _react2.default.PropTypes.string
  },

  getChildContext: function getChildContext() {
    return {
      navigationContainerId: this.id
    };
  },

  componentWillMount: function componentWillMount() {
    this.id = _lodash2.default.uniqueId('NavigationContainer');
    this.parentId = this.context ? this.context.navigationContainerId : null;
    (0, _FocusManager.registerFocusableComponent)(this);
  },
  componentWillUnmount: function componentWillUnmount() {
    (0, _FocusManager.unregisterFocusableComponent)(this);
    this.parentId = null;
  }
};