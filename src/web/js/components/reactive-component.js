import { UUID4Generator } from '../utils/uuid4-generator.js';
import { Component } from '../component.js';

export class ReactiveComponent extends Component {

    _onChange = null;
    _function_name = null;
    _value = null;

    constructor(onChange=null) {
        super();
        this._onChange = onChange;
        this._function_name = `change_${UUID4Generator.generateId().replaceAll('-', '_')}_function`;
        this._registerFunction();
    }

    _registerFunction() {
        window[this._function_name] = () => this._onValueChange();
    }

    _onValueChange() {
        throw '_onValueChange is not implemented!';
    }

    _getChangeEventHandler() {
        return `${this._function_name}()`;
    }

    setValue(value) {
        this._value = value;
        if (this._onChange) this._onChange(value);
    }

    getValue(value) {
        return this._value;
    }


}