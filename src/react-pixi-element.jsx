var React = require('react');
var ReactPixi = require('./react-pixi-core.js');
var ReactElement = require('react/lib/ReactElement');
var instantiateReactComponent = require('react/lib/instantiateReactComponent');
var StyleMapper = require('./style-mapper.js');

class ReactPixiElement extends React.Component {
    constructor() {
        super();
        this.children = [];
    }

    getPixiRepresentation() {
        return new PIXI.Container();
    }

    mountComponent() {
        var parentPixiContainer = this._reactInternalInstance._context.parent ? this._reactInternalInstance._context.parent.pixiRepresentation : ReactPixi.document;

        this.pixiRepresentation = this.getPixiRepresentation();
        this.updatePixiRepresentation();

        parentPixiContainer.addChild(this.pixiRepresentation);
    }

    updatePixiRepresentation() {
        console.log('Updating : ' + this.constructor.name + ', ' + JSON.stringify(this.layout));

        this.pixiRepresentation.x = this.layout && this.layout.left || (this.props && this.props.x) || 0;
        this.pixiRepresentation.y = this.layout && this.layout.top || (this.props && this.props.y) || 0;

        this.pixiRepresentation.rotation = parseInt(this.props.rotation, 10) || 0;
    }

    get style() {
        var style = (this.props && this.props.style) || {};
        return style;
    }

    componentWillMount() {
        this.mountComponent();
    }

    componentWillUpdate(nextProps, prevProps) {
        this.updatePixiRepresentation();
    }

    render() {
        return false;
    }
}

module.exports = ReactPixiElement;