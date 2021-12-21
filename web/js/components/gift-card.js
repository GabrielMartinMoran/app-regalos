import { Component } from '../component.js';
import { Pallete } from '../config.js';
import { Button } from './button.js';
import { AuthRepository } from '../repositories/auth-repository.js';
import { GiftRepository } from '../repositories/gift-repository.js';
import { User } from '../models/user.js';

export class GiftCard extends Component {

    _authRepository = null;
    _giftRepository = null;
    _gift = null;
    _allowEdit = false;
    _allowMarkAsClaimed = true;
    _onDeleteCallback = null;

    constructor(gift, allowEdit = false, allowMarkAsClaimed = true, onDeleteCallback = (gift) => { }) {
        super();
        this._authRepository = new AuthRepository();
        this._giftRepository = new GiftRepository();
        this._gift = gift;
        this._allowEdit = allowEdit;
        this._allowMarkAsClaimed = allowMarkAsClaimed;
        this._onDeleteCallback = onDeleteCallback;
    }

    _getElementHtml() {
        return /*html*/`
        <div class="giftCard">
            <h2>
                ${this._gift.getName()}
            </h2>
            <hr class="giftCardDivider">
            <div class="giftCardDetail">
                ${this._gift.getDetail()}
            </div>
            <div class="giftCardEditButtons">
            ${this._allowEdit ? (
                new Button('editButton', 'primary-small', '🖋 Editar',
                    () => { this._editGift() }).render() +
                '<span class="giftCardEditButtonsSpacer"></span>' +
                new Button('deleteButton', 'danger-small', '🗑 Eliminar',
                    () => { this._deleteGift() }).render()
            ) : ''
            }
            </div>
            <div id="${this._gift.getId()}-claimContainer" class="claimContainer">
                ${this._getClaimContainer()
            }
            </div>
        </div>
        `;
    }

    _getElementCSS() {
        return /*css*/`
            .giftCard {
                padding: 0.2rem 1rem 0rem 1rem;
                margin-bottom: 0.5rem;
                border-radius: 2px;
                border: 1px solid ${Pallete.PRIMARY};
            }

            .giftCardDivider {
                border: 1px solid ${Pallete.PRIMARY};
                border-radius: 2px;
            }

            .claimContainer {
                text-align: right;
                margin-bottom: 1rem;
            }

            .otherPersonClaimed {
                color: ${Pallete.TEXT_SHADOW};
            }

            .giftCardEditButtons {
                text-align: right;
            }

            .giftCardEditButtonsSpacer {
                margin-right: 0.25rem;
            }

            .giftCardDetail {
                display: table;
                table-layout: fixed;
                width: 100%;
                word-wrap: break-word;
            }
        `;
    }

    _getClaimContainer() {
        if (!this._allowMarkAsClaimed) {
            return '';
        }
        let claimContainerHtml = '';
        if (this._gift.getClaimer()) {
            claimContainerHtml += /*html*/`
                ${this._gift.getClaimer().getUsername() === this._authRepository.getAuthenticatedUsername() ?
                    new Button('unclaimButton', 'danger', 'Mejor no me encargo...',
                        () => { this._unclaimGift() }).render() :
                    '<p class="otherPersonClaimed">' +
                    this._gift.getClaimer().getName() + ' se encarga de este regalo' +
                    '</p>'
                }
            `;
        } else {
            claimContainerHtml += /*html*/`
                ${new Button('claimButton', 'primary', '¡Yo me encargo!',
                () => { this._claimGift() }).render()
                }
            `;
        }
        return claimContainerHtml;
    }

    _updateClaimContainer() {
        document.getElementById(`${this._gift.getId()}-claimContainer`).innerHTML = this._getClaimContainer();
    }

    _editGift() {
        window.location = `#/edit-gift/${this._gift.getId()}`;
    }

    async _deleteGift() {
        const shouldDelete = confirm(`Estas seguro que quieres eliminar el regalo '${this._gift.getName()}'`);
        if (!shouldDelete) return;
        this._giftRepository.deleteGift(this._gift.getId());
        this._onDeleteCallback(this._gift);

    }

    async _claimGift() {
        await this._giftRepository.claimGift(this._gift);
        this._gift.setClaimer(new User(this._authRepository.getAuthenticatedUsername()));
        this._updateClaimContainer();
    }

    async _unclaimGift() {
        await this._giftRepository.unclaimGift(this._gift);
        this._gift.setClaimer(null);
        this._updateClaimContainer();
    }
}