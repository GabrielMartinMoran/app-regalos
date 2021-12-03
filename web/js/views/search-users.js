import { Component } from '../component.js';
import { Link } from '../components/link.js';
import { AuthRepository } from '../repositories/auth-repository.js';
import { UserRepository } from '../repositories/user-repository.js';
import { ScreenSizeHelper } from '../utils/screen-size-helper.js';

export class SearchUsers extends Component {

    _userRepository = null;
    _authRepository = null;

    constructor() {
        super();
        this._userRepository = new UserRepository();
        this._authRepository = new AuthRepository();
        this._getUsers();
    }

    _getElementHtml() {
        return /*html*/`
        <h2>🔭 Buscar usuarios</h2>
        <h4>¿A quién podríamos hacerle un regalo?<h4>
        <div id="usersList"></div>
        `;
    }

    _getElementCSS() {
        return /*css*/`

            #usersList {
                display: grid;
            }

            .userLink {
                margin-bottom: 1rem;
            }

            ${ScreenSizeHelper.onLargeScreens} {
                #usersList {
                    grid-template-columns: 1fr 1fr 1fr;
                }
            }

            ${ScreenSizeHelper.onMediumScreens} {
                #usersList {
                    grid-template-columns: 1fr 1fr;
                }              
            }

            ${ScreenSizeHelper.onSmallScreens} {
                #usersList {
                    grid-template-columns: 1fr;
                }              
            }
        `;
    }

    async _getUsers() {
        const users = await this._userRepository.getAll();
        let usersList = '';
        for (const user of users) {
            // Logged user does not have to be listed
            if (user.getUsername() === this._authRepository.getAuthenticatedUsername()) {
                continue;
            }
            usersList += /*html*/`
                <div class="userLink">
                    ${
                        new Link('userLink', `#/user-gifts/${user.getUsername()}`, /*html*/`
                            <span>${user.getIcon()} ${user.getName()}</span>
                        `).render()
                    }
                </div>
            `;
        }
        document.getElementById('usersList').innerHTML = usersList;
    }
}