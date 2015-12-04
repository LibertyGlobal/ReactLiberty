module.exports = {};

var PIXI = require('pixi.js');
window.PIXI = PIXI;

// Initialize PIXI renderer
var renderer = PIXI.autoDetectRenderer(0, 0, {transparent: true});
renderer.view.style.position = 'fixed';
renderer.view.style.top = '0px';
renderer.view.style.left = '0px';
renderer.view.style['pointer-events'] = 'none';
renderer.view.style['pointerEvents'] = 'none';

module.exports.document = new PIXI.Container();

var resizeViewer = function () {
  var self = this,
    width = window.innerWidth,
    height = window.innerHeight;

  renderer.resize(width, height);
  renderer.render(module.exports.document);
}

var redrawStage = function () {
  if (true) {
    renderer.render(module.exports.document);
  }
  window.requestAnimationFrame(redrawStage);
}

resizeViewer();
document.body.appendChild(renderer.view);
window.requestAnimationFrame(redrawStage);

//Initialize React stage
var React = require('react');
var ReactElement = require('react/lib/ReactElement');
var ReactInstanceHandles = require('react/lib/ReactInstanceHandles');
var ReactUpdates = require('react/lib/ReactUpdates');
var instantiateReactComponent = require('react/lib/instantiateReactComponent');

module.exports.rootID = ReactInstanceHandles.createReactRootID();
module.exports.transaction = ReactUpdates.ReactReconcileTransaction.getPooled();

module.exports.render = function (pixiElement) {
  var component = instantiateReactComponent(pixiElement),
    instance;

  if (ReactElement.isValidElement(pixiElement)) {
    module.exports.transaction.perform(function () {
      instance = component.mountComponent(module.exports.rootID, module.exports.transaction, {});
      instance.isRootLibertyNode = true;
    });
    return instance;
  } else {
    console.log('ReactLiberty.render: Passed element is not a valid ReactElement');
  }
};