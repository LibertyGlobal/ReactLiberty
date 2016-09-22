var React = require('react');
var ReactDOM = require('react-dom');
var ReactLiberty = require('./core.js');

//Both canvas and gl are served by Pixi, so components are the same and only initialization code differs
ReactLiberty.gl = {};
ReactLiberty.canvas = {};
ReactLiberty.canvas.Element = ReactLiberty.gl.Element = require('./renderers/gl/element.jsx');
ReactLiberty.canvas.Container = ReactLiberty.gl.Container = require('./renderers/gl/container.jsx');
ReactLiberty.canvas.Image = ReactLiberty.gl.Image = require('./renderers/gl/image.jsx');
ReactLiberty.canvas.Text = ReactLiberty.gl.Text = require('./renderers/gl/text.jsx');

ReactLiberty.dom = {};
ReactLiberty.dom.Element = require('./renderers/dom/element.jsx');
ReactLiberty.dom.Container = require('./renderers/dom/container.jsx');
ReactLiberty.dom.Image = require('./renderers/dom/image.jsx');
ReactLiberty.dom.Text = require('./renderers/dom/text.jsx');

/*  Added for memory consumption investigation, use empty renderer when
    want to measure size of Pixi/DOM objects created */

/* ReactLiberty.empty = {};
ReactLiberty.empty.Element = require('./renderers/empty/element.jsx');
ReactLiberty.empty.Container = require('./renderers/empty/container.jsx');
ReactLiberty.empty.Image = require('./renderers/empty/image.jsx');
ReactLiberty.empty.Text = require('./renderers/empty/text.jsx'); */

window.libertyRender = window.libertyRender || 'dom';
window.Div = ReactLiberty[window.libertyRender].Container;
window.Img = ReactLiberty[window.libertyRender].Image;
window.P = ReactLiberty[window.libertyRender].Text;

if (window.libertyRender === 'canvas') {
  require('./renderers/canvas/init-renderer.js');
} else if (window.libertyRender === 'gl') {
  require('./renderers/gl/init-renderer.js');
}


ReactLiberty.Component = ReactLiberty[window.libertyRender].Container;

module.exports = ReactLiberty;