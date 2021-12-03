import { Component } from '../component.js';
import { Button } from '../components/button.js';
import { GiftCard } from '../components/gift-card.js';
import { GiftRepository } from '../repositories/gift-repository.js';

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

        for (const username of Object.keys(giftsByUser)) {
            // If the key exists, it allways have at leas 1 element
            const user = giftsByUser[username][0].getUser();
            giftsList += /*html*/`
                <h4>Tus encargos para ${user.getName()} ${user.getIcon()}</h4>
                <div>
            `;
            for (const gift of giftsByUser[username]) {
                giftsList += /*html*/`
                    ${
                        new GiftCard(gift, false, true).render()
                    }
                `;
            }
            giftsList += /*html*/`
                </div>
            `;
        }


        for (const gift of gifts) {

        }
        document.getElementById('giftsList').innerHTML = giftsList;
    }
}