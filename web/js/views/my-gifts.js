import { Component } from '../component.js';
import { Button } from '../components/button.js';
import { GiftCard } from '../components/gift-card.js';
import { Link } from '../components/link.js';
import { GiftRepository } from '../repositories/gift-repository.js';

export class MyGifts extends Component {

    _giftRepository = null;

    constructor() {
        super();
        this._giftRepository = new GiftRepository();
        this._getGifts();
    }

    _getElementHtml() {
        return /*html*/`
        <div class="myGiftsTitle">
            <h2>📜 Mi lista de regalos</h2>
            <div>
            ${new Button('createGift', 'primary', '+ Crear',
            () => { this._createGift() }
        ).render()
            }
            </div>
        </div>
        <div id="giftsList"></div>
        
        `;
    }

    _getElementCSS() {
        return /*css*/`
            .myGiftsTitle {
                display: flex;
                justify-content: center;
                position: relative;
            }

            .myGiftsTitle h2 {
                flex: 2;
                text-align: left;
            }

            .myGiftsTitle div {
                flex: 1;
                position: relative;
                display: flex;
                align-items: center;
            }

            .myGiftsTitle div button {
                margin-left: auto;
            }
        `;
    }

    _createGift() {
        window.location = `#/create-gift`;
    }

    async _getGifts() {
        const gifts = await this._giftRepository.getMyGifts();
        let giftsList = '';
        if (gifts.length > 0) {
            for (const gift of gifts) {
                giftsList += /*html*/`
                    ${new GiftCard(gift, true, false,
                        (deletedGift) => this._onGiftDeletion(deletedGift)
                    ).render()
                    }
                `;
            }
        } else {
            giftsList += /*html*/`
                <div class="container">
                    <h3>🧹 ¡Las cosas se ven muy limpias por aca! Se ve que no agregaste ningun regalo a tu lista...</h3>
                    <h3>¿Por que no probás ${new Link('linkCreateGift', '#/create-gift','agregando un regalo a tu lista', 'primaryText').render()}?</h3>
                </div>
            `;
        }
        document.getElementById('giftsList').innerHTML = giftsList;
    }

    _onGiftDeletion(gift) {
        this._getGifts();
    }
}