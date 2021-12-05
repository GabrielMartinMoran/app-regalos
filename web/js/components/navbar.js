import { Component } from '../component.js';
import { Pallete } from '../config.js';
import { Button } from './button.js';
import { Logo } from './logo.js';

export class Navbar extends Component {

    _onToggleMenu = null;

    constructor(onToggleMenu = () => {}) {
        super();
        this._onToggleMenu = onToggleMenu;
    }



    _getElementHtml() {
        return /*html*/`
        <div id="navbar">
            ${
                new Button('toggleMenuButton', 'icon', '📖',
                    () => { this._onToggleMenu() }).render()
            }
            <span id="navbarElementsSpacer"></span>
            <h2>${new Logo().render()}</h2>
        </div>
        `;
    }

    _getElementCSS() {
        return /*css*/`
            #navbar {
                position: fixed;
                background-color: ${Pallete.ELEMENTS};
                width: 100%;
                height: 50px;
                display: flex;
                align-items: center;
                padding-left: 0.5rem;
            }

            #navbarElementsSpacer {
                padding-left: 0.5rem;
            }
        `;
    }
}