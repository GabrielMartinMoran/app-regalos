import { Pallete } from '../config.js';
import { ReactiveComponent } from './reactive-component.js';

export class Select extends ReactiveComponent {

    _name = null;
    _placeholder = null;
    _elements = null;
    _displayFunction = null;

    constructor(name, placeholder, elements, displayFunction, onChange = null) {
        super(onChange);
        this._id = name;
        this._name = name;
        this._placeholder = placeholder;
        this._elements = elements;
        this._displayFunction = displayFunction;
    }

    _getElementHtml() {
        let options = '';
        for (let i = 0; i < this._elements.length; i++) {
            const element = this._elements[i];
            options += `
            <option value="${i}">${this._displayFunction(element)}</option>
            `;
        }
        return /*html*/ `
        <select class="select" id="${this._id}" name="${this._name}" onchange="${this._getChangeEventHandler()}">
        <option class="selectOption" value="-1" disabled selected>${this._placeholder}</option>
        ${options}
        </select>
        `;
    }

    _getElementCSS() {
        return /*css*/ `
            .select {
                padding: 0.5rem;
                border-radius: 2px;
                background-color: ${Pallete.ELEMENTS};
                color: ${Pallete.TEXT};
                border: 1px solid ${Pallete.TEXT_SHADOW};
            }

            .select::placeholder {
                color: ${Pallete.TEXT_SHADOW};
            }
        `;
    }

    _onValueChange() {
        const value = parseInt(document.getElementById(this._name).value);
        if (value == -1) return;
        this.setValue(this._elements[value]);
    }

    setValue(value) {
        super.setValue(value);
        document.getElementById(this._id).value = this._elements.indexOf(value);
    }
}