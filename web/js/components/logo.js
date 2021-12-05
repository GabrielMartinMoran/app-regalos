import { Component } from '../component.js';
import { Pallete } from '../config.js';

export class Logo extends Component {

    _getElementHtml() {
        return /*html*/ `
            <span class="logoPrefix">Rega</span><span class="logoSufix">lista</span>
        `;
    }

    _getElementCSS() {
        return /*css*/ `
            .logoPrefix {
                color: ${Pallete.LOGO_PREFIX};
            }

            .logoSufix {
                color: ${Pallete.LOGO_SUFIX};
            }
        `;
    }
}