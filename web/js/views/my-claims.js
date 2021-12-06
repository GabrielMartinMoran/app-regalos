import { Component } from '../component.js';
import { Button } from '../components/button.js';
import { GiftCard } from '../components/gift-card.js';
import { Link } from '../components/link.js';
import { GiftRepository } from '../repositories/gift-repository.js';
import { EmojisProvider } from '../utils/emojis-provider.js';

export class MyClaims extends Component {

    _giftRepository = null;

    constructor() {
        super();
        this._giftRepository = new GiftRepository();
        this._getClaimedGifts();
    }

    _getElementHtml() {
        return /*html*/`
        <h2>📜 Mis encargos</h2>
        <div id="giftsList"></div>
        
        `;
    }

    _getElementCSS() {
        return /*css*/`
        `;
    }

    async _getClaimedGifts() {
        const gifts = await this._giftRepository.getMyClaimedGifts();
        let giftsByUser = {}
        for (const gift of gifts) {
            const username = gift.getUser().getUsername();
            if (giftsByUser[username]) {
                giftsByUser[username].push(gift);
            } else {
                giftsByUser[username] = [gift];
            }
        }

        let giftsList = '';

        let totalClaims = 0;
        for (const username of Object.keys(giftsByUser)) {
            // If the key exists, it allways have at leas 1 element
            const user = giftsByUser[username][0].getUser();
            giftsList += /*html*/`
                <h4>Tus encargos para ${user.getName()} ${user.getIcon()}</h4>
                <div>
            `;
            for (const gift of giftsByUser[username]) {
                totalClaims++;
                giftsList += /*html*/`
                    ${new GiftCard(gift, false, true).render()
                    }
                `;
            }
            giftsList += /*html*/`
                </div>
            `;
        }

        if (totalClaims == 0) {
            giftsList += /*html*/`
                <div class="container">
                    <h3>${EmojisProvider.getEmoji('emptyClaimedList')} ${EmojisProvider.emojisSupported() ? 'Cri cri...' : 'Buu...'} ¡Por acá no vuela ni una mosca! Pareciera que no querés hacerle un regalo a nadie...</h3>
                    <h3>¿Por que no probás ${new Link('linkSearchUsers', '#/search-users', 'buscando a alguien al que hacerle un regalo', 'primaryText').render()}?</h3>
                </div>
            `;
        }

        document.getElementById('giftsList').innerHTML = giftsList;
    }
}