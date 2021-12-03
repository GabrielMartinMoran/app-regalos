import { Component } from '../component.js';
import { Button } from '../components/button.js';
import { Input } from '../components/input.js';
import { AuthRepository } from '../repositories/auth-repository.js';

export class Login extends Component {

    _authRepository = null;
    _usernameInput = null;
    _passwordInput = null;

    constructor() {
        super();
        this._authRepository = new AuthRepository();
        if (this._authRepository.isAuthenticated()) {
            window.location = `#/home`;
            return;
        }
        this._usernameInput = new Input('usernameInput', 'text', 'Usuario',(username) => this._formData.username = username, () => this._clickLoginButton());
        this._passwordInput = new Input('passwordInput', 'password', 'Contraseña', (password) => this._formData.password = password, () => this._clickLoginButton())

    }

    _formData = {
        username: null,
        password: null
    }

    _getElementHtml() {
        return /*html*/`
        <div class="center">
            <h1>Regalorio</h1>
        </div>
        <div id="loginFormContainer">
            <div id="loginFormSpacerLeft"></div>
            <form class="container center" id="loginForm" onsubmit="return false;">
                <h2>Iniciar sesión</h2>
                <div class="container flex">
                    ${
                        this._usernameInput.render()
                    }
                </div>
                <div class="container flex">
                    ${
                        this._passwordInput.render()
                    }
                </div>
                <div class="container flex">
                    ${
                        new Button('loginButton', 'primary', 'Iniciar sesión',
                            () => { this._login() }, true
                        ).render()
                }
                </div>
            </form>
            <div id="loginFormSpacerRight"></div>
        </div>
        `;
    }

    _getElementCSS() {
        return /*css*/`

            #loginFormContainer {
                display: grid;
                grid-template-columns: 4fr 5fr 4fr;
            }

            #usernameInput {
                flex: 1;
            }

            #passwordInput {
                flex: 1;
            }

            #loginButton {
                flex: 1;
            }
        `;
    }

    async _login() {
        await this._authRepository.login(this._formData);
    }

    _clickLoginButton() {
        document.getElementById('loginButton').click();
    }
}