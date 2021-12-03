import { Pallete } from '../config.js';
import { ReactiveComponent } from './reactive-component.js';

export class EnrichedTextInput extends ReactiveComponent {

    _placeholder = null;

    constructor(name, placeholder, onChange = null) {
        super(onChange);
        this._id = name;
        this._name = name;
        this._placeholder = placeholder;
    }

    _getElementHtml() {
        return /*html*/ `
        <textarea id="${this._id}" class="textInput" name="${this._name}" placeholder="${this._placeholder}" onchange="${this._getChangeEventHandler()}"></textarea>
        `;
    }

    _getElementCSS() {
        return /*css*/ `
            .tox-toolbar__primary {
                background: ${Pallete.ELEMENTS} !important;
                border-color: ${Pallete.TEXT_SHADOW};
                border-radius: 2px;
            }

            .tox-toolbar__overflow{
                background: ${Pallete.ELEMENTS} !important;
                border-color: ${Pallete.TEXT_SHADOW};
                border-radius: 2px;
            }

            .tox-edit-area__iframe {
                background: ${Pallete.ELEMENTS} !important;
                border-top: 1px solid ${Pallete.TEXT_SHADOW} !important;
                border-radius: 2px;
            }

            .mce-content-body {
                color: ${Pallete.TEXT} !important;
                transition-delay: 1s;
            }

            .tox {
                border-radius: 2px;
                border-color: ${Pallete.TEXT_SHADOW} !important;
            }

            .tox-tbtn {
                background: ${Pallete.ELEMENTS} !important;
            }

            .tox .tox-tbtn:hover {
                background: ${Pallete.PRIMARY} !important;
            }

            .tox-tbtn__icon-wrap svg {
                fill: ${Pallete.TEXT_SHADOW} !important;
            }

            .tox-tbtn--select {
                color: ${Pallete.TEXT_SHADOW} !important;
            }

            .tox-tbtn--select svg {
                fill: ${Pallete.TEXT_SHADOW} !important;
            }

            .tox-collection__group {
                background: ${Pallete.ELEMENTS} !important;
            }

            .tox-collection__item {
                background: ${Pallete.ELEMENTS} !important;
                color: ${Pallete.TEXT_SHADOW} !important;
            }

            .tox-collection__item svg {
                fill: ${Pallete.TEXT_SHADOW} !important;
            }

            .tox-collection__item-label code {
                background: ${Pallete.PRIMARY} !important;
            }

            .tox-collection__item-label span {
                text-decoration-color: ${Pallete.TEXT_SHADOW} !important;
            }
        `;
    }

    _updateTextColor() {
        // We have to update the value inside the iframe
        const iframeDocument = document.getElementById(`${this._id}_ifr`).contentWindow.document;
        const stylesheet = iframeDocument.createElement('style');
        stylesheet.textContent = /*css*/`
            body {
                color: ${Pallete.TEXT};
                text-decoration-color: ${Pallete.TEXT_SHADOW};
                font-family: Arial, sans-serif;
            }

            .mce-content-body:not([dir=rtl])[data-mce-placeholder]:not(.mce-visualblocks)::before {
                color: ${Pallete.TEXT_SHADOW} !important;
            }

            code {
                background: ${Pallete.PRIMARY} !important;
            }
        `;
        iframeDocument.head.append(stylesheet)
    }

    render() {
        const rendered = super.render();
        setTimeout(() => {
            tinymce.init({
                language: 'es',
                selector: `#${this._id}`,
                menubar: false,
                statusbar: false,
                init_instance_callback: (inst) => this._updateTextColor(),
                setup: (eventDetector) => {
                    eventDetector.on('change', (event) => {
                        this.setValue(eventDetector.getContent());
                    });
                }
            });
        }, 10);
        return rendered;
    }

    setValue(value) {
        super.setValue(value);
        document.getElementById(this._id).value = value;
    }
}