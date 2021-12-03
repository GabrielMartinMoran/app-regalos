import { Component } from '../component.js';

export class Home extends Component {

    constructor() {
        super();
    }

    _getElementHtml() {
        return /*html*/`
            <h2>Regalorio</h2>
            <p>
            ¡Bienvenido al regalorio, la aplicación creada para simplificarle la vida a quienes quieran hacer regalos, 
            a la vez que aumenta las probabilidades de que te den lo que querés! ¿No es genial?
            </p>
        `;
    }
}