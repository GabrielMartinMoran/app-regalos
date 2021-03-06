export class EmojisProvider {

    static _emojisForSupportedBrowsers = {
        'userProfile0': '๐ฅท',
        'userProfile1': '๐งโ๐พ',
        'userProfile2': '๐งโโ๏ธ',
        'userProfile3': '๐ง',
        'userProfile4': '๐ง',
        'userProfile5': '๐งโ๐ค',
        'userProfile6': '๐ง',
        'userProfile7': '๐ฆน',
        'userProfile8': '๐ง',
        'userProfile9': '๐งโโ๏ธ',
        'emptyClaimedList': '๐ฆ',
        'emptyGiftsList': '๐งน',
    }

    static _emojisForUnsupportedBrowsers = {
        'userProfile0': '๐',
        'userProfile1': '๐',
        'userProfile2': '๐',
        'userProfile3': '๐',
        'userProfile4': '๐ค',
        'userProfile5': '๐',
        'userProfile6': '๐ณ',
        'userProfile7': '๐',
        'userProfile8': '๐ค ',
        'userProfile9': '๐',
        'emptyClaimedList': '๐ป',
        'emptyGiftsList': '๐ญ',
    }

    static _defaultEmoji = '๐';

    static emojisSupported() {
        const ctx = document.createElement("canvas").getContext("2d");
        ctx.canvas.width = ctx.canvas.height = 1;
        ctx.fillText('๐ฅท', -4, 4);
        return ctx.getImageData(0, 0, 1, 1).data[3] > 0; // Not a transparent pixel
    }

    static getEmoji(emojiName) {
        const emojisList = this.emojisSupported() ? this._emojisForSupportedBrowsers :
            this._emojisForUnsupportedBrowsers;
        if (emojiName in emojisList) return emojisList[emojiName];
        return this._defaultEmoji;        
    }
}