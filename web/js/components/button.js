import { Component } from '../component.js';
import { UUID4Generator } from '../utils/uuid4-generator.js';
import { Pallete } from '../config.js';

export class Button extends Component {

    _name = null;
    _type = null;
    _child = null;
    _onClick = null;
    _function_name = null;
    _isFormSubmit = false;

    /*
        types: [
            'primary', 'warning', 'danger', 'primary-small',
            'warning-small', 'danger-small', 'icon'
        ]
    */

    constructor(name, type, child, onClick, isFormSubmit=false) {
        super();
        this._id = name;
        this._name = name;
        this._type = type;
        this._child = child;
        this._onClick = onClick;
        this._function_name = `btn_${this._name}_${UUID4Generator.generateId().replaceAll('-', '_')}_function`;
        this._isFormSubmit = isFormSubmit;
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
        <button type="${this._isFormSubmit ? 'submit' : 'button'}" id="${this._id}" name="${this._name}" class="btn btn-${this._type}" onClick="${this._function_name}()">${this._renderChild()}</button>
        `;
    }

    _getElementCSS() {
        return /*css*/ `

            .btn {
                background-color: ${Pallete.PRIMARY};
                border-radius:2px;
                border: 1px solid ${Pallete.PRIMARY};
                display:inline-block;
                cursor:pointer;
                font-weight:bold;
                padding: 0.5rem 1rem;
                color: ${Pallete.TEXT};
            }

            .btn:hover {
                -webkit-filter: brightness(85%);
                -webkit-transition: all 0.5s ease;
                -moz-transition: all 0.5s ease;
                -o-transition: all 0.5s ease;
                -ms-transition: all 0.5s ease;
                transition: all 0.5s ease;
            }

            .btn:active {
                -webkit-filter: brightness(50%);
                -webkit-transition: all 0.1s ease;
                -moz-transition: all 0.1s ease;
                -o-transition: all 0.1s ease;
                -ms-transition: all 0.1s ease;
                transition: all 0.1s ease;
            }

            .btn-primary {
                background-color: ${Pallete.PRIMARY};
                border: 1px solid ${Pallete.PRIMARY};
            }

            .btn-primary-small {
                background-color: ${Pallete.PRIMARY};
                border: 1px solid ${Pallete.PRIMARY};
                padding: 0rem 0.25rem;
            }

            .btn-warning {
                background-color: ${Pallete.WARNING};
                border: 1px solid ${Pallete.WARNING};
            }

            .btn-warning-small {
                background-color: ${Pallete.WARNING};
                border: 1px solid ${Pallete.WARNING};
                padding: 0rem 0.25rem;
            }

            .btn-danger {
                background-color: ${Pallete.DANGER};
                border: 1px solid ${Pallete.DANGER};
            }

            .btn-danger-small {
                background-color: ${Pallete.DANGER};
                border: 1px solid ${Pallete.DANGER};
                padding: 0rem 0.25rem;
            }

            .btn-icon {
                padding: 0.5rem 0.5rem;
                font-size: 1.5rem;
                background-color: rgba(0,0,0,0); /* transparent */
                border: 0px solid rgba(0,0,0,0);
            }
        `;
    }
}