import { UUID4Generator } from './utils/uuid4-generator.js';

export class Component {

    _id = null;
    __component_id = null; 

    constructor() {
        this._id = UUID4Generator.generateId();
        this.__component_id = UUID4Generator.generateId();
    }

    render() {
        this._register();
        return `<meta id='${this.__component_id}'><style>${this._getElementCSS()}</style>${this._getElementHtml()}</meta>`;
    }

    drawIn(elementId) {
        try {
            document.getElementById(elementId).innerHTML = this.render();
        } catch (e) {
            //if (e instanceof TypeError) throw `Element ${elementId} not found in dom!`;
            throw e;
        }
    }

    _getElementCSS() {
        return /*css*/``;
    }

    _getElementHtml() {
        throw 'generateHtml not yet implemented!'
    }

    _register() {
        // Ids provided by users
        if (!window.domComponents) window.domComponents = {};
        window.domComponents[this._id] = this;
        // Internal ids
        if (!window.registeredComponents) window.registeredComponents = [];
        window.registeredComponents.push(this);
    }

    findComponent(id) {
        if (window.domComponents) return window.domComponents[id];
        return null;
    }

    _onDestroy() {
    }

    isAlive() {
        return document.getElementById(this.__component_id);
    }
}