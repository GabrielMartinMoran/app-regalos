import { Pallete } from '../config.js';
import { ReactiveComponent } from './reactive-component.js';

export class Input extends ReactiveComponent {

    _type = null;
    _placeholder = null;
    _onEnterKey = null;

    constructor(name, type, placeholder, onChange = (value) => { }, onEnterKey = () => {}) {
        super(onChange);
        this._id = name;
        this._name = name;
        this._type = type;
        this._placeholder = placeholder;
        this._onEnterKey = onEnterKey;
        this._registerEnterKeyEvent();
    }

    _getElementHtml() {
        return /*html*/ `
            <input type="${this._type}" id="${this._id}" class="textInput" name="${this._name}" placeholder="${this._placeholder}" onchange="${this._getChangeEventHandler()}">
            <script>
                document.getElementById("${this._id}").addEventListener('keyup', (event) => {
                    if (event.keyCode === 13) {
                        event.preventDefault();
                        alert("Enter ${this._id}");
                    }
                });
            </script>
        `;
    }

    _getElementCSS() {
        return /*css*/ `
            .textInput {
                padding: 0.5rem;
                border-radius: 2px;
                background-color: ${Pallete.ELEMENTS};
                color: ${Pallete.TEXT};
                border: 1px solid ${Pallete.TEXT_SHADOW};
            }

            .textInput::placeholder {
                color: ${Pallete.TEXT_SHADOW};
            }

            /* Autofill */
            input:-webkit-autofill,
            input:-webkit-autofill:hover, 
            input:-webkit-autofill:focus, 
            input:-webkit-autofill:active {
                -webkit-box-shadow: 0 0 0 30px ${Pallete.ELEMENTS} inset !important;
            }
            input:-webkit-autofill {
                -webkit-text-fill-color: ${Pallete.TEXT} !important;
            }
        `;
    }

    _onValueChange() {
        const value = document.getElementById(this._name).value;
        this.setValue(value);
    }

    setValue(value) {
        super.setValue(value);
        document.getElementById(this._id).value = value;
    }

    _registerEnterKeyEvent() {/*
        var element = document.getElementById(this._id);
        element.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this._onEnterKey();
            }
        });*/
    }
}