window.ReactLiberty = module.exports = {};

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