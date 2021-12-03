export class UrlParamsGetter {

    /**
     * Expression param indicates url elements like
     * ['url', 'param1', 'param2']
     * @param {string[]} expression 
     */
    getParamsFromExpression(urlParts) {
        const route = window.location.hash.replace('#/', '');
        const splittedRoute = route.split('/');
        const params = {}
        if (splittedRoute.length != urlParts.length) throw 'urlParts length does not match route parameters length';
        for (let i = 0; i < urlParts.length; i++) {
            params[urlParts[i]] = splittedRoute[i];            
        }
        return params;
    }
}