export class User {

    _userIcons = {
        0: '🥷',
        1: '🧑‍🌾',
        2: '🧙‍♂️',
        3: '🧞',
        4: '🧟',
        5: '🧑‍🎤',
        6: '🧝',
        7: '🦹',
        8: '🧛',
        9: '🧜‍♂️',
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
            chr   = this.getUsername().charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
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