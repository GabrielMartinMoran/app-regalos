import { Component } from '../component.js';
import { Button } from '../components/button.js';
import { EnrichedTextInput } from '../components/enriched-text-input.js';
import { Input } from '../components/input.js';
import { AuthRepository } from '../repositories/auth-repository.js';
import { GiftRepository } from '../repositories/gift-repository.js';
import { UrlParamsGetter } from '../utils/url-params-getter.js';

export class EditGift extends Component {

    _giftRepository = null;
    _authRepository = null;
    _urlParamsGetter = null;
    _giftId = null;
    _gift = null;

    constructor() {
        super();
        this._giftRepository = new GiftRepository();
        this._authRepository = new AuthRepository();
        this._urlParamsGetter = new UrlParamsGetter();
        const urlParams = this._urlParamsGetter.getParamsFromExpression(['url', 'giftId']);
        this._giftId = urlParams.giftId;
        this._getGift();
    }



    _getElementHtml() {
        return /*html*/`
            <h2>🎁 Modificar regalo</h2>
            <div id="giftUpdateForm"></div>        
        `;
    }

    _getElementCSS() {
        return /*css*/`
            #giftNameInput {
                flex: 1;
            }
        `;
    }

    async _getGift() {
        this._gift = await this._giftRepository.getGift(
            this._authRepository.getAuthenticatedUsername(),
            this._giftId
        );
        const giftNameInput = new Input('giftNameInput', 'text', 'Nombre',
            (name) => this._gift.setName(name)
        );
        const giftDetailInput = new EnrichedTextInput(this._id + '_giftDetailInput', 'Detalle',
            (detail) => this._gift.setDetail(detail)
        );

        let giftUpdateFormHtml = /*html*/`
            <div class="container flex">
                ${
                    giftNameInput.render()
                }
            </div>
            <div class="container">
                ${
                    giftDetailInput.render()
                }
            </div>
            <div class="container center">
                ${
                    new Button('updateDevice', 'primary', '💾 Guardar',
                        () => this._updateGift()
                    ).render()
                }
            </div>
        `;

        document.getElementById('giftUpdateForm').innerHTML = giftUpdateFormHtml;

        giftNameInput.setValue(this._gift.getName());
        giftDetailInput.setValue(this._gift.getDetail());
    }

    async _updateGift() {
        await this._giftRepository.updateGift(this._gift);
        window.location = '/#/my-gifts';
    }
}