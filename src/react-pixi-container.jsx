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
                self.mountChild(self.props.children);
            }
        }
    }

    updatePixiRepresentation(updateChildren) {
        super.updatePixiRepresentation();

        if (updateChildren) {
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].updatePixiRepresentation();
            }
        }
    }

    componentWillMount() {
        console.log('Layouting...');
        super.componentWillMount();
        this.mountChildren();
        computeLayout(this);
        this.updatePixiRepresentation(true);
    }
}

module.exports = ReactPixiContainer;