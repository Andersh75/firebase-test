import { html, LitElement } from 'lit-element';


class XHome extends LitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <style>
            </style>
            <div>HOME!</div>
        `
    }
}


customElements.define('x-home', XHome);
