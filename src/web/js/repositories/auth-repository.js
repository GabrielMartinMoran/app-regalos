import { WebApiRepository } from './web-api-repository.js';

export class AuthRepository extends WebApiRepository {
    
    _controller = '/auth';

    async login(credentials) {
        const response = await this._post(`${this._controller}/login`, credentials);
        localStorage.setItem('token', response.token);
        localStorage.setItem('tokenUsername', credentials.username);
        if (window.onLogin) window.onLogin();
    }

    isAuthenticated() {
        return !!localStorage.getItem('token');
    }

    getAuthenticatedUsername() {
        return localStorage.getItem('tokenUsername');
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenUsername');
        if (window.onLogout) window.onLogout();
    }
}