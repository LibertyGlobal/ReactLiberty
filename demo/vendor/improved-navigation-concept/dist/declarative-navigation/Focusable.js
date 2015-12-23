'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _FocusManager = require('./FocusManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Focusable = (function (_React$Component) {
  _inherits(Focusable, _React$Component);

  function Focusable(props) {
    _classCallCheck(this, Focusable);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Focusable).call(this, props));

    _this.id = _lodash2.default.uniqueId('Focusable');
    return _this;
  }

  _createClass(Focusable, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.parentId = this.context.navigationContainerId;
      (0, _FocusManager.registerFocusableComponent)(this);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      (0, _FocusManager.setFocusableComponentDomNode)(this, _reactDom2.default.findDOMNode(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _FocusManager.unregisterFocusableComponent)(this);
      this.parentId = null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        null,
        _react2.default.Children.only(this.props.children)
      );
    }
  }]);

  return Focusable;
})(_react2.default.Component);

exports.default = Focusable;

Focusable.propTypes = {
  children: _react2.default.PropTypes.element.isRequired,
  onBlur: _react2.default.PropTypes.func,
  onFocus: _react2.default.PropTypes.func,
  onSelect: _react2.default.PropTypes.func
};
Focusable.defaultProps = {
  onBlur: _lodash2.default.noop,
  onFocus: _lodash2.default.noop,
  onSelect: _lodash2.default.noop
};
Focusable.contextTypes = {
  navigationContainerId: _react2.default.PropTypes.string
};