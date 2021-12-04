export class EmojisProvider {

    static _emojisForSupportedBrowsers = {
        'userProfile0': '🥷',
        'userProfile1': '🧑‍🌾',
        'userProfile2': '🧙‍♂️',
        'userProfile3': '🧞',
        'userProfile4': '🧟',
        'userProfile5': '🧑‍🎤',
        'userProfile6': '🧝',
        'userProfile7': '🦹',
        'userProfile8': '🧛',
        'userProfile9': '🧜‍♂️',
    }

    static _emojisForUnsupportedBrowsers = {
        'userProfile0': '🙃',
        'userProfile1': '😁',
        'userProfile2': '😂',
        'userProfile3': '😊',
        'userProfile4': '🤓',
        'userProfile5': '😎',
        'userProfile6': '😳',
        'userProfile7': '😜',
        'userProfile8': '🤠',
        'userProfile9': '😇',
    }

    static _defaultEmoji = '🔘';

    static emojisSupported() {
        const ctx = document.createElement("canvas").getContext("2d");
        ctx.canvas.width = ctx.canvas.height = 1;
        ctx.fillText('🥷', -4, 4);
        return ctx.getImageData(0, 0, 1, 1).data[3] > 0; // Not a transparent pixel
    }

    static getEmoji(emojiName) {
        const emojisList = this.emojisSupported() ? this._emojisForSupportedBrowsers :
            this._emojisForUnsupportedBrowsers;
        if (emojiName in emojisList) return emojisList[emojiName];
        return this._defaultEmoji;        
    }
}