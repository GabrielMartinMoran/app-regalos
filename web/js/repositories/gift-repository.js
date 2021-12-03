import { Gift } from '../models/gift.js';
import { WebApiRepository } from './web-api-repository.js';

export class GiftRepository extends WebApiRepository {
    
    _controller = '/gifts';

    async getMyGifts() {
        const gifts = await this._get(`${this._controller}`);
        return gifts.map((gift) => Gift.fromObject(gift));
    }

    async getUserGifts(username) {
        const gifts = await this._get(`${this._controller}/${username}`);
        return gifts.map((gift) => Gift.fromObject(gift));
    }

    async getGift(username, giftId) {
        const gift = await this._get(`${this._controller}/${username}/${giftId}`);
        return Gift.fromObject(gift);
    }

    async updateGift(gift) {
        await this._put(`${this._controller}`, gift.toJson());
    }

    async createGift(gift) {
        await this._post(`${this._controller}`, gift.toJson());
    }

    async claimGift(gift) {
        await this._post(`${this._controller}/${gift.getUser().getUsername()}/${gift.getId()}/claim`, {});
    }

    async unclaimGift(gift) {
        await this._post(`${this._controller}/${gift.getUser().getUsername()}/${gift.getId()}/unclaim`, {});
    }

    async getMyClaimedGifts() {
        const gifts = await this._get(`${this._controller}/claims`);
        return gifts.map((gift) => Gift.fromObject(gift));
    }

    async deleteGift(giftId) {
        await this._delete(`${this._controller}/${giftId}`, {});
    }
}