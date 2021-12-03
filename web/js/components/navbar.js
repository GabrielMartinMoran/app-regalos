import { Component } from '../component.js';
import { Pallete } from '../config.js';
import { Button } from './button.js';

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
            <h2>Regalorio</h2>
            <div id="themeChangerContainer">
            ${
                new Button('themeChangerButton', 'icon',
                    this._isLightTheme() ? '🌚' : '🌞',
                    () => { this._toggleTheme() }).render()
            }
            </div>
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

            #themeChangerContainer {
                flex: 1;
                text-align: right;
                margin-right: 1rem;
            }
        `;
    }

    _toggleTheme() {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'light') {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        window.location.reload();
    }

    _isLightTheme() {
        const currentTheme = localStorage.getItem('theme');
        return currentTheme === 'light' || !currentTheme;
    }
}