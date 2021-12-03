export class ScreenSizeHelper {

    /*static screenSizeCategories = {
        SMALL: 1,
        MEDIUM: 2,
        LARGE: 3
    }

    static getScreenSizeCategory() {
        if (window.innerWidth <= 600) return this.screenSizeCategories.SMALL;
        if (window.innerWidth <= 1000) return this.screenSizeCategories.MEDIUM;
        return this.screenSizeCategories.LARGE;
    }*/

    static screenSizes = {
        SMALL: 600,
        MEDIUM: 1000,
        LARGE: 9999
    }

    static onLargeScreensAndBellow = `@media (max-width: ${this.screenSizes.LARGE}px)`;
    static onMediumScreensAndBellow = `@media (max-width: ${this.screenSizes.MEDIUM}px)`;    
    static onLargeScreens = `@media (min-width: ${this.screenSizes.MEDIUM + 1}px)`;
    static onMediumScreens = `@media (min-width: ${this.screenSizes.SMALL + 1}px) and (max-width: ${this.screenSizes.MEDIUM}px)`;
    static onSmallScreens = `@media (max-width: ${this.screenSizes.SMALL}px)`;

}