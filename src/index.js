window.ReactLiberty = require('./core.js');

window.ReactLiberty.gl = {};
require('./renderers/gl/init-renderer.js');
window.ReactLiberty.gl.Element = require('./renderers/gl/element.jsx');
window.ReactLiberty.gl.Container = require('./renderers/gl/container.jsx');
window.ReactLiberty.gl.Image = require('./renderers/gl/image.jsx');
window.ReactLiberty.gl.Text = require('./renderers/gl/text.jsx');

window.ReactLiberty.dom = {};
window.ReactLiberty.dom.Element = require('./renderers/dom/element.jsx');
window.ReactLiberty.dom.Container = require('./renderers/dom/container.jsx');
window.ReactLiberty.dom.Image = require('./renderers/dom/image.jsx');
window.ReactLiberty.dom.Text = require('./renderers/dom/text.jsx');

if (window.libertyRender === 'dom') {
  window.Div = window.ReactLiberty.dom.Container;
  window.Img = window.ReactLiberty.dom.Image;
  window.P = window.ReactLiberty.dom.Text;
} else {
  window.Div = window.ReactLiberty.gl.Container;
  window.Img = window.ReactLiberty.gl.Image;
  window.P = window.ReactLiberty.gl.Text;
}



module.exports = window.ReactLiberty;