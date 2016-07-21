var ReactLibertyElement = require('./element.jsx');
var computeLayout = require('css-layout');
var ReactMultiChild = require('react/lib/ReactMultiChild');

const {assign} = Object;

class ReactLibertyContainer extends ReactLibertyElement {
    getDisplayObject() {
        return document.createElement('div');
    }

    mountComponent(rootID, transaction, context) {
        super.mountComponent(rootID, transaction, context);

        this._context.oldParent = this._context.parent;
        this._context.parent = this;
        this.mountChildren(this.props.children, transaction, this._context);
        this._context.parent = this._context.oldParent;

        transaction.getReactMountReady().enqueue(this.updateDisplayObject, this, true);

        if (this._isRootLibertyNode) {
            return '';
        } else {
            return this;
        }
    }

    mountChild(child) {
        if (typeof child !== 'string') {
            this.children.push(child);
        }
    }

    unmountComponent() {
        this.unmountChildren();
        super.unmountComponent();
    }

    receiveComponent(nextElement, transaction, nextContext) {
        super.receiveComponent(nextElement, transaction, nextContext);

        if (nextElement.props.children != this.props.children) {
            nextContext.parent = this;
            this._updateChildren(nextElement.props.children, transaction, nextContext);
            nextContext.parent = this.parent;
        }

        console.log('Receiving new component ');

        transaction.getReactMountReady().enqueue(this.updateDisplayObject, this, true);
    }

    updateDisplayObject(updateChildren) {
        super.updateDisplayObject();

        if (updateChildren) {
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].updateDisplayObject(updateChildren);
            }
        }
    }

    componentDidUpdate() {
        super.componentDidUpdate();
        if (this._isRootLibertyNode) {
            this.doLayout();
        }
    }

    componentDidMount() {
        super.componentDidMount();
        if (this._isRootLibertyNode) {
            this.doLayout();
        }
    }

    doLayout() {
        this.timesLayouted = this.timesLayouted + 1 || 1;
        console.log('Layouted, ' + this.constructor.name + ', times ' + this.timesLayouted);
        computeLayout(this);
        this.updateDisplayObject(true);
    }
}

assign(
    ReactLibertyContainer.prototype,
    ReactMultiChild.Mixin
);

window['DOMdiv'] = module.exports = ReactLibertyContainer;