import { Index } from './index.js';
import { Router } from './router.js';

const router = new Router();
const index = new Index();

const registerComponentUnloader = () => {
    window.registeredComponents = [];
    setInterval(() => {
        const componentsToRemove = [];
        for (const registeredComponent of window.registeredComponents) {
            if (!registeredComponent.isAlive()) componentsToRemove.push(registeredComponent);
        }
        for (const componentToRemove of componentsToRemove) {
            // TODO: Remove components from window.domComponents, for this we have to ensure unique components custom ids
            componentToRemove._onDestroy();
            window.registeredComponents.splice(window.registeredComponents.indexOf(componentToRemove, 1));
        }
    }, 100);
}


function onLoad() {
    registerComponentUnloader();
    index.drawIn('indexViewport');
    router.setUp();
}

window.onload = () => {
    onLoad();
}
