import { User } from './user.js';

export class Gift {

    _id = null;
    _name = null;
    _detail = null;
    _user = null;
    _claimer = null;

    constructor(id, name, detail, user, claimer) {
        this._id = id;
        this._name = name;
        this._detail = detail;
        this._user = user;
        this._claimer = claimer;
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getDetail() {
        return this._detail;
    }

    getClaimer() {
        return this._claimer;
    }

    getUser() {
        return this._user;
    }

    setName(name) {
        this._name = name;
    }

    setDetail(detail) {
        this._detail = detail;
    }

    setClaimer(claimer) {
        this._claimer = claimer;
    }

    toJson() {
        return {
            gift_id: this._id,
            name: this._name,
            detail: this._detail,
            username: this._user?.getUsername(),
            claimer: this._claimer?.getUsername()
        }
    }

    static fromObject(obj) {
        const gift = new Gift(
            obj.gift_id,
            obj.name,
            obj.detail,
            obj.user ? User.fromObject(obj.user) : null,
            obj.claimer ? User.fromObject(obj.claimer) : null
        );
        return gift;
    }
}