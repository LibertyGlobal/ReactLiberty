var PIXI = require('pixi');
window.PIXI = PIXI;

// Initialize PIXI renderer
var renderer = PIXI.autoDetectRenderer(0, 0, {transparent: true, antialias: false, forceFXAA: true});
renderer.view.style.position = 'fixed';
renderer.view.style.top = '0px';
renderer.view.style.left = '0px';
renderer.view.style['pointer-events'] = 'none';
renderer.view.style['pointerEvents'] = 'none';

ReactLiberty.document = new PIXI.Container();
ReactLiberty.renderer = renderer;

var resizeViewer = function () {
  var self = this,
    width = window.innerWidth,
    height = window.innerHeight;

  renderer.resize(width, height);
  renderer.render(ReactLiberty.document);
}

resizeViewer();
document.body.appendChild(renderer.view);

ReactLiberty.redrawStage = function () {
  if (ReactLiberty.shouldRedraw) {
    renderer.render(ReactLiberty.document);
    ReactLiberty.shouldRedraw = false;
  }
};

ReactLiberty.markStageAsChanged = function () {
  if (!ReactLiberty.shouldRedraw) {
    ReactLiberty.shouldRedraw = true;
    requestAnimationFrame(ReactLiberty.redrawStage);
  }
};