window.ReactLiberty = require('./core.js');

//Both canvas and gl are served by Pixi, so components are the same and only initialization code differs
window.ReactLiberty.gl = {};
window.ReactLiberty.canvas = {};
window.ReactLiberty.canvas.Element = window.ReactLiberty.gl.Element = require('./renderers/gl/element.jsx');
window.ReactLiberty.canvas.Container = window.ReactLiberty.gl.Container = require('./renderers/gl/container.jsx');
window.ReactLiberty.canvas.Image = window.ReactLiberty.gl.Image = require('./renderers/gl/image.jsx');
window.ReactLiberty.canvas.Text = window.ReactLiberty.gl.Text = require('./renderers/gl/text.jsx');

window.ReactLiberty.dom = {};
window.ReactLiberty.dom.Element = require('./renderers/dom/element.jsx');
window.ReactLiberty.dom.Container = require('./renderers/dom/container.jsx');
window.ReactLiberty.dom.Image = require('./renderers/dom/image.jsx');
window.ReactLiberty.dom.Text = require('./renderers/dom/text.jsx');

/*  Added for memory consumption investigation, use empty renderer when
    want to measure size of Pixi/DOM objects created */

//window.ReactLiberty.empty = {};
//window.ReactLiberty.empty.Element = require('./renderers/empty/element.jsx');
//window.ReactLiberty.empty.Container = require('./renderers/empty/container.jsx');
//window.ReactLiberty.empty.Image = require('./renderers/empty/image.jsx');
//window.ReactLiberty.empty.Text = require('./renderers/empty/text.jsx');

window.libertyRender = window.libertyRender || 'dom';
window.Div = window.ReactLiberty[window.libertyRender].Container;
window.Img = window.ReactLiberty[window.libertyRender].Image;
window.P = window.ReactLiberty[window.libertyRender].Text;

if (window.libertyRender === 'canvas') {
  require('./renderers/canvas/init-renderer.js');
} else if (window.libertyRender === 'gl') {
  require('./renderers/gl/init-renderer.js');
}

module.exports = window.ReactLiberty;