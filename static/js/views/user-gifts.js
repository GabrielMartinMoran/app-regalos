import { Component } from '../component.js';
import { Button } from '../components/button.js';
import { GiftCard } from '../components/gift-card.js';
import { GiftRepository } from '../repositories/gift-repository.js';
import { UserRepository } from '../repositories/user-repository.js';
import { UrlParamsGetter } from '../utils/url-params-getter.js';

export class UserGifts extends Component {

    _giftRepository = null;
    _userRepository = null;
    _urlParamsGetter = null;
    _username = null;

    constructor() {
        super();
        this._giftRepository = new GiftRepository();
        this._userRepository = new UserRepository();
        this._urlParamsGetter = new UrlParamsGetter();
        const urlParams = this._urlParamsGetter.getParamsFromExpression(['url', 'username']);
        this._username = urlParams.username
        this._getUser();
        this._getUserGifts();
    }

    _getElementHtml() {
        return /*html*/`
        <h2 id="giftsListTitle">📜 Lista de deseados</h2>
        <div id="giftsList"></div>
        `;
    }

    _createGift() {
        window.location = `#/create-gift`;
    }


    async _getUser() {
        const user = await this._userRepository.getByUsername(this._username);
        document.getElementById('giftsListTitle').innerHTML = `${user.getIcon()} Lista de deseados de ${user.getName()}`;
    }

    async _getUserGifts() {
        const gifts = await this._giftRepository.getUserGifts(this._username);
        let giftsList = '';
        if (gifts.length > 0) {
            for (const gift of gifts) {
                giftsList += /*html*/`
                    ${
                        new GiftCard(gift).render()
                    }
                `;
            }
        } else {
            giftsList += /*html*/`
                <div class="container">
                    <h3>🙈 ¡Ups! Parece que la lista esta vacía...</h3>
                </div>
            `;
        }
        document.getElementById('giftsList').innerHTML = giftsList;
    }
}