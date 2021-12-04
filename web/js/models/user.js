import { EmojisProvider } from '../utils/emojis-provider.js';

export class User {

    _userIcons = {
        0: EmojisProvider.getEmoji('userProfile0'),
        1: EmojisProvider.getEmoji('userProfile1'),
        2: EmojisProvider.getEmoji('userProfile2'),
        3: EmojisProvider.getEmoji('userProfile3'),
        4: EmojisProvider.getEmoji('userProfile4'),
        5: EmojisProvider.getEmoji('userProfile5'),
        6: EmojisProvider.getEmoji('userProfile6'),
        7: EmojisProvider.getEmoji('userProfile7'),
        8: EmojisProvider.getEmoji('userProfile8'),
        9: EmojisProvider.getEmoji('userProfile9'),
    }

    _username = null;
    _name = null;

    constructor(username, name) {
        this._username = username;
        this._name = name;
    }

    getUsername() {
        return this._username;
    }

    getName() {
        return this._name;
    }

    getIcon() {
        let hash = 0, i, chr;
        if (this.getUsername().length === 0) return hash;
        for (i = 0; i < this.getUsername().length; i++) {
            chr = this.getUsername().charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        const strHash = hash.toString();
        const hashValue = strHash.charAt(strHash.length - 2);
        return this._userIcons[parseInt(hashValue)];
    }

    static fromObject(obj) {
        const user = new User(
            obj.username,
            obj.name
        );
        return user;
    }
}