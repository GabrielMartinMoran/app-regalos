import { Home } from './views/home.js';
import { MyGifts } from './views/my-gifts.js';
import { CreateGift } from './views/create-gift.js';
import { SearchUsers } from './views/search-users.js';
import { Login } from './views/login.js';
import { UserGifts } from './views/user-gifts.js';
import { EditGift } from './views/edit-gift.js';
import { MyClaims } from './views/my-claims.js';
import { AuthRepository } from './repositories/auth-repository.js';

export class Router {
    _default_authenticated_route = 'home';
    _default_unauthenticated_route = 'login';
    _authRepository = null;

    _views = {
        'home': Home,
        'my-gifts': MyGifts,
        'create-gift': CreateGift,
        'search-users': SearchUsers,
        'login': Login,
        'user-gifts/<username>': UserGifts,
        'edit-gift/<giftId>': EditGift,
        'my-claims': MyClaims
    }

    constructor() {
        this._authRepository = new AuthRepository();
    }

    renderRoute(viewName) {
        const viewInstance = new this._views[viewName]();
        viewInstance.drawIn('appViewport');
    }

    _isValidRoute(viewPath, splittedRoute) {
        const splittedViewPath = viewPath.split('/');
        if (splittedRoute.length != splittedViewPath.length) return false;
        for (let i = 0; i < splittedViewPath.length; i++) {
            const pathPartBoundries = splittedViewPath[i].substr(0, 1) + splittedViewPath[i].substr(splittedViewPath[i].length - 1, 1);
            if (splittedViewPath[i] !== splittedRoute[i] && pathPartBoundries !== '<>') return false;
        }
        return true;
    }

    _isAuthorized(viewPath) {
        return (!this._authRepository.isAuthenticated() && viewPath === this._default_unauthenticated_route) ||
            (this._authRepository.isAuthenticated() && viewPath !== this._default_unauthenticated_route);
    }

    _getViewPathToRender(route) {
        const splittedRoute = route.split('/');
        for (const viewPath of Object.keys(this._views)) {
            if (this._isValidRoute(viewPath, splittedRoute) && this._isAuthorized(viewPath)) {
                return viewPath;
            }
        }
        return null;
    }

    _renderHash() {
        const route = window.location.hash.replace('#/', '');
        const viewPathToRender = this._getViewPathToRender(route);
        if (viewPathToRender) {
            this.renderRoute(viewPathToRender);
        } else {
            window.location.hash = `#/${
                this._authRepository.isAuthenticated() ? this._default_authenticated_route : this._default_unauthenticated_route
            }`;
        }
        /*
        if (this._authRepository.isAuthenticated()) {
            console.log('Authenticated', viewPathToRender);
            if (viewPathToRender) return this.renderRoute(viewPathToRender);
            return window.location.hash = `#/${this._default_authenticated_route}`;
        }
        // When user is not authenticated
        console.log('Unauthenticated', viewPathToRender);
        window.location.hash = `#/${this._default_authenticated_route}`;
        return this.renderRoute(this._default_unauthenticated_route);
        */
    }

    setUp() {
        window.addEventListener('hashchange', () => {
            this._renderHash();
        })
        this._renderHash();
    }

}