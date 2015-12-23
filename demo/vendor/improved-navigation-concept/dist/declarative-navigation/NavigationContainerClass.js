'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FocusManager = require('./FocusManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavigationContainerClass = (function (_React$Component) {
  _inherits(NavigationContainerClass, _React$Component);

  function NavigationContainerClass(props) {
    _classCallCheck(this, NavigationContainerClass);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NavigationContainerClass).call(this, props));

    _this.id = _lodash2.default.uniqueId('NavigationContainer');
    return _this;
  }

  _createClass(NavigationContainerClass, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        navigationContainerId: this.id
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.parentId = this.context ? this.context.navigationContainerId : null;
      (0, _FocusManager.registerFocusableComponent)(this);
    }

    /*componentDidMount() {
      setFocusableComponentDomNode(this, ReactDOM.findDOMNode(this));
    }*/

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _FocusManager.unregisterFocusableComponent)(this);
      this.parentId = null;
    }

    // navigation methods

  }, {
    key: 'getPreferredFocusedComponentNode',
    value: function getPreferredFocusedComponentNode(containerNode, prevFocusedComponentNode) {
      return this.props.strategy.getPreferredFocusedComponentNode(containerNode, prevFocusedComponentNode);
    }
  }, {
    key: 'moveUp',
    value: function moveUp(containerNode, prevFocusedComponentNode) {
      return this.props.strategy.moveUp(containerNode, prevFocusedComponentNode);
    }
  }, {
    key: 'moveDown',
    value: function moveDown(containerNode, prevFocusedComponentNode) {
      return this.props.strategy.moveDown(containerNode, prevFocusedComponentNode);
    }
  }, {
    key: 'moveLeft',
    value: function moveLeft(containerNode, prevFocusedComponentNode) {
      return this.props.strategy.moveLeft(containerNode, prevFocusedComponentNode);
    }
  }, {
    key: 'moveRight',
    value: function moveRight(containerNode, prevFocusedComponentNode) {
      return this.props.strategy.moveRight(containerNode, prevFocusedComponentNode);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        null,
        this.props.children
      );
    }
  }]);

  return NavigationContainerClass;
})(_react2.default.Component);

exports.default = NavigationContainerClass;

NavigationContainerClass.propTypes = {
  strategy: _react2.default.PropTypes.shape({
    getPreferredFocusedComponentNode: _react2.default.PropTypes.func,
    moveUp: _react2.default.PropTypes.func,
    moveDown: _react2.default.PropTypes.func,
    moveLeft: _react2.default.PropTypes.func,
    moveRight: _react2.default.PropTypes.func
  }),
  onBlur: _react2.default.PropTypes.func,
  onFocus: _react2.default.PropTypes.func,
  onSelect: _react2.default.PropTypes.func
};
NavigationContainerClass.defaultProps = {
  onBlur: _lodash2.default.noop,
  onFocus: _lodash2.default.noop,
  onSelect: _lodash2.default.noop
};
NavigationContainerClass.childContextTypes = {
  navigationContainerId: _react2.default.PropTypes.string
};
NavigationContainerClass.contextTypes = {
  navigationContainerId: _react2.default.PropTypes.string
};