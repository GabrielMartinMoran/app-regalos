import { Component } from '../component.js';
import { Button } from '../components/button.js';
import { EnrichedTextInput } from '../components/enriched-text-input.js';
import { Input } from '../components/input.js';
import { Gift } from '../models/gift.js';
import { GiftRepository } from '../repositories/gift-repository.js';

export class CreateGift extends Component {

    _giftRepository = null;
    _gift = null;

    constructor() {
        super();
        this._giftRepository = new GiftRepository();
        this._gift = new Gift(null, null, '');
    }

    _getElementHtml() {
        return /*html*/`
        <h2>🎁 Agregar regalo a mi lista</h2>
        <div class="container flex">
            ${
                new Input('giftNameInput', 'text', 'Nombre',
                    (name) => this._gift.setName(name)
                ).render()
            }
        </div>
        <div class="container">
            ${
                new EnrichedTextInput(this._id + 'giftDetailInput', 'Detalle',
                    (detail) => this._gift.setDetail(detail)
                ).render()
            }
        </div>
        <div class="container center">
            ${
                new Button('createGift', 'primary', '+ Crear',
                    () => this._createGift()
                ).render()
            }
        </div>
        `;
    }

    _getElementCSS() {
        return /*css*/`
            #giftNameInput {
                flex: 1;
            }
        `;
    }

    async _createGift() {
        if (this._isValidForm()) {
            await this._giftRepository.createGift(this._gift);
            window.location = '/#/my-gifts';
        }
    }

    _isValidForm() {
        if (!this._gift.getName()) {
            alert('El campo nombre es requerido!');
            return false;
        }
        return true;
    }
}