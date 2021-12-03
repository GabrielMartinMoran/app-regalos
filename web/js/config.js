const DARK_PALLETE = {

    BACKGROUND: '#211F2E',
    ELEMENTS: '#2F2B3F',

    PRIMARY: '#7743EF',
    PRIMARY_LIGHT: '#534bae',
    PRIMARY_DARK: '#000051',

    SECONDARY: '#ff9800',
    SECONDARY_LIGHT: '#ffc947',
    SECONDARY_DARK: '#c66900',

    WARNING: '#e9c46a',
    INFO: '#f4a261',
    DANGER: '#e76f51',

    TEXT: '#f5f5f5',
    TEXT_SHADOW: '#c2c2c2',

    MENU: '#16131f',
};

const LIGHT_PALLETE = {

    BACKGROUND: '#868A5A',
    ELEMENTS: '#F6E4C0',

    PRIMARY: '#ff9800',
    PRIMARY_LIGHT: '#ffc947',
    PRIMARY_DARK: '#c66900',

    SECONDARY: '#445128',
    SECONDARY_LIGHT: '#606C38',
    SECONDARY_DARK: '#364420',

    WARNING: '#e9c46a',
    INFO: '#f4a261',
    DANGER: '#e76f51',

    TEXT: '#151611',
    TEXT_SHADOW: '#26281F',

    MENU: '#F2D9B0',
};

export const Pallete = localStorage.getItem('theme') === 'dark' ? DARK_PALLETE : LIGHT_PALLETE;

export const WEB_API_URL = `${window.location.origin}/api`;