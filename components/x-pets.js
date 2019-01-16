import { html, LitElement } from 'lit-element';

class XPets extends LitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <style>
            </style>
            <div>PETS</div>
        `
    }
}


customElements.define('x-pets', XPets);
