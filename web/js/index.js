import { AppMenu } from './app-menu.js';
import { Component } from './component.js';
import { Navbar } from './components/navbar.js';
import { Pallete } from './config.js';
import { AuthRepository } from './repositories/auth-repository.js';
import { ScreenSizeHelper } from './utils/screen-size-helper.js';

export class Index extends Component {

    _appMenu = null;
    _navbar = null;
    _authRepository = null;
    _menuActive = false;

    constructor() {
        super();
        this._authRepository = new AuthRepository();
        this._appMenu = new AppMenu(() => this._closeMenu());
        this._navbar = new Navbar(() => this._onToggleMenu());
        window.onLogin = () => this._onLogin();
        window.onLogout = () => this._onLogout();
    }

    _getElementHtml() {
        // In case of unauthenticated usuers
        if (!this._authRepository.isAuthenticated()) {
            return /*html*/`
            <div id="appFullView">
                <div class="container" id="appBody">
                    <div class="container" id="appViewport">
                    </div>
                </div>
            </div>
            `;
        }
        return /*html*/`
        <div id="appGrid">
            <div id="navbarContainer">
                ${this._navbar.render()
            }
            </div>
            ${this._appMenu.render()}
            <div class="container" id="appBody">
                <div class="container" id="appViewport">
                </div>
            </div>
        </div>
        `;
    }

    _getElementCSS() {
        return /*css*/`

            body {
                margin: 0;
                color: ${Pallete.TEXT};
                text-decoration-color: ${Pallete.TEXT_SHADOW};
                font-family: Arial, sans-serif;
            }
            
            a {
                color: ${Pallete.TEXT_SHADOW};
                text-decoration: none;
            }
            
            a:hover {
                color: ${Pallete.TEXT};
            }

            code {
                background: ${Pallete.PRIMARY};
            }
            
            .container {
                padding: 1rem;
            }

            .flex {
                display: flex;
            }

            .center {
                text-align: center;
            }

            #appGrid {
                display: grid;
                height: 100%;
            }

            #appFullView {
                grid-template-columns: 1fr;
                display: grid;
                height: 100%;
            }

            #appBody {
                background-color: ${Pallete.BACKGROUND};
            }

            #appViewport {                
                background-color: ${Pallete.ELEMENTS};
            }

            #navbarContainer {
                position: fixed;
                z-index: 2001;
            }

            @font-face {
                font-family: 'emoji';
                src: url('emojione-svg.woff2')
                format('woff2');
              }


            ${ScreenSizeHelper.onLargeScreensAndBellow} {

                #appGrid {
                    grid-template-columns: 1fr 4fr;
                }

                #navbarContainer {
                    display: none;
                }
            }

            ${ScreenSizeHelper.onMediumScreensAndBellow} {
                #appGrid {
                    grid-template-columns: 1fr;
                }

                #navbarContainer {
                    display: block;
                }

                #appBody {
                    padding-top: 70px;
                }                
            }
        `;
    }

    _onToggleMenu() {
        if (!this._authRepository.isAuthenticated()) {
            this._closeMenu();
            return;
        }
        const appMenuElement = document.getElementById('appMenu');
        this._menuActive = !this._menuActive;
        appMenuElement.hidden = !this._menuActive;
    }

    _closeMenu() {
        const appMenuElement = document.getElementById('appMenu');
        this._menuActive = false;
        appMenuElement.hidden = true;
    }

    _renderSelf() {
        this.drawIn('indexViewport');
    }

    _onLogin() {
        window.location = `#/home`;
        this._renderSelf();
    }

    _onLogout() {
        this._closeMenu();
        window.location = '#/login';
        this._renderSelf();
    }

}