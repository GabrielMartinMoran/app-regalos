import { Component } from './component.js';
import { Link } from './components/link.js';
import { Pallete } from './config.js';
import { ScreenSizeHelper } from './utils/screen-size-helper.js';
import { AuthRepository } from './repositories/auth-repository.js';

export class AppMenu extends Component {

    _onMenuItemClick = null;
    _authRepository = null;

    constructor(onMenuItemClick = () => {}) {
        super();
        this._onMenuItemClick = onMenuItemClick;
        this._authRepository = new AuthRepository();
    }
    

    _getElementHtml() {
        return /*html*/`
        <div class="container" id="appMenu" hidden>
            <h2 id="appTitle">Regalorio</h2>
            <span id="navbarSpacer"></span>
            ${
                new Link('homeLink', '#/home', '🏠 Inicio', 'menuItem', () => this._onMenuItemClick()).render() +
                new Link('searchUsersLink', '#/search-users', '🔭 Buscar usuarios', 'menuItem', () => this._onMenuItemClick()).render() +
                new Link('myGiftsLink', '#/my-gifts', '📜 Mis lista de regalos', 'menuItem', () => this._onMenuItemClick()).render() +
                new Link('myClaimsLink', '#/my-claims', '📑 Mis encargos', 'menuItem', () => this._onMenuItemClick()).render()
            }
            <hr id="logoutDivider">       
            ${
                new Link('logoutLink', '', '💤 Cerrar sesión', 'menuItem', () => this._logout()).render()
            }
        </div>
        `;
    }

    _getElementCSS() {
        return /*css*/`

            #appMenu {
                background-color: ${Pallete.MENU};
                z-index: 2000;
            }

            .menuItem {
                display: block;
                margin-bottom: 1rem;
            }

            #logoutDivider {
                display: block;
                margin-top: 2rem;
                margin-bottom: 1rem;
            }

            ${ScreenSizeHelper.onLargeScreens} {
                #appMenu {
                    display: block;
                }
            } 

            ${ScreenSizeHelper.onLargeScreensAndBellow} {
                #appTitle {
                    display: block;
                }
            }

            ${ScreenSizeHelper.onMediumScreensAndBellow} {
                #appTitle {
                    display: none;
                }

                #navbarSpacer {
                    display: block;
                    margin-top: 60px;
                }

                #appMenu {
                    position: fixed;
                    height: inherit;
                }
            }
        `;
    }

    _logout() {
        this._authRepository.logout();
    }
}