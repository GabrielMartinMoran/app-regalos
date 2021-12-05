import { Component } from '../component.js';
import { Pallete } from '../config.js';
import { UUID4Generator } from '../utils/uuid4-generator.js';

export class Link extends Component {

    _name = null;
    _href = null;
    _child = null;
    _onClick = null;
    _cssClasses = null;
    _function_name = null;

    constructor(name, href, child, cssClasses = '', onClick = () => { }) {
        super();
        this._id = name;
        this._name = name;
        this._href = href;
        this._child = child;
        this._cssClasses = cssClasses;
        this._onClick = onClick;
        this._function_name = `link_${this._name}_${UUID4Generator.generateId().replaceAll('-', '_')}_function`;
        this._registerFunction();
    }

    _registerFunction() {
        window[this._function_name] = this._onClick;
    }

    _renderChild() {
        return this._child instanceof Component ? this._child.render() : this._child;
    }

    _getElementHtml() {
        return /*html*/ `
        <a href="${this._href}" id="${this._id}" name="${this._name}" onClick="${this._function_name}()" class="${this._cssClasses}">${this._renderChild()}</a>
        `;
    }

    _getElementCSS() {
        return /*css*/ ``;
    }
}