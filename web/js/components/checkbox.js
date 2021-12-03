import { Pallete } from '../config.js';
import { ReactiveComponent } from './reactive-component.js';

export class Checkbox extends ReactiveComponent {

    _type = null;
    _label = null;
    _value = false;

    constructor(name, label, initialValue, onChange = null) {
        super(onChange);
        this._id = name;
        this._name = name;
        this._label = label;
        this._value = initialValue;
    }

    _getElementHtml() {
        return /*html*/ `
        <div class="checkbox" id="${this._id}" name="${this._name}" onclick="${this._getChangeEventHandler()}">
            <div class="checkboxDotBorder">
                <div class="checkboxDot ${this._value ? 'chkBoxDotActive' : 'chkBoxDotInactive'}" id="checkboxDot${this._id}"></div>
            </div>
            <div class="checkboxText" id="checkboxLabel${this._id}">${this._label}</div>        
        </div>
        `;
    }

    _getElementCSS() {
        return /*css*/ `
            .checkbox {
                cursor: pointer;
                padding: 0.25rem 0.5rem 0rem 0.0rem;
                width: fit-content;
            }

            .checkboxDotBorder {
                height: 1rem;
                width: 2rem;
                margin-top: 0.5rem;
                border: 1px solid ${Pallete.TEXT_SHADOW};
                border-radius: 10px;
                display: inline-block;
                margin: 0px;
            }

            .checkboxDot {
                position: relative;
                height: 1rem;
                width: 1rem;
                border: 1px solid ${Pallete.TEXT_SHADOW};
                border-radius: 10px;
                margin: -1px;
                transition: 0.2s;
                -webkit-transition: 0.2s;
            }

            .checkboxDot.chkBoxDotActive {
                background-color: ${Pallete.PRIMARY};
                transform: translateX(1rem);
            }

            .checkboxDot.chkBoxDotInactive {
                background-color: ${Pallete.BACKGROUND};
                transform: translateX(0rem);
            }

            .checkboxText {
                display: inline-block;
                position: relative;
                top: -0.2rem;
            }
            
        `;
    }

    _onValueChange() {
        this._value = !this._value;
        this.setValue(this._value);

        // Update dot stile
        const dotElement = document.getElementById(`checkboxDot${this._id}`);
        let classToRemove;
        let classToAdd;
        if (this._value) {
            classToRemove = 'chkBoxDotInactive';
            classToAdd = 'chkBoxDotActive';
        } else {
            classToRemove = 'chkBoxDotActive';
            classToAdd = 'chkBoxDotInactive';
        }
        dotElement.classList.remove(classToRemove);
        dotElement.classList.add(classToAdd);
    }

    setValue(value) {
        super.setValue(value);
    }

    setLabel(label) {
        document.getElementById(`checkboxLabel${this._id}`).innerHTML = label;
    }
}