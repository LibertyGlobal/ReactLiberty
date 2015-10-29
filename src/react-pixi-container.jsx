var React = require('react');
var ReactPixi = require('./react-pixi-core.js');
var ReactPixiElement = require('./react-pixi-element.jsx');
var ReactElement = require('react/lib/ReactElement');
var instantiateReactComponent = require('react/lib/instantiateReactComponent');
var computeLayout = require('css-layout');

class ReactPixiContainer extends ReactPixiElement {
    getPixiRepresentation() {
        return new PIXI.Container();
    }

    mountChild(childClass) {
        if (ReactElement.isValidElement(childClass)) {
            var component = instantiateReactComponent(childClass);
            component.mountComponent(this, ReactPixi.transaction, {'parent': this});
            this.children.push(component._instance);
        }
    }

    mountChildren() {
        var self = this;
        if (this.props && this.props.children) {
            if (self.props.children instanceof Array) {
                this.props.children.forEach(function (child) {
                    self.mountChild(child);
                });
            } else {
                self._mountChild(self.props.children);
            }
        }

        computeLayout(this);
    }

    componentWillMount() {
        super.componentWillMount();
        this.mountChildren();
        this.updatePixiRepresentation();
    }
}

module.exports = ReactPixiContainer;