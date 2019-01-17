import { html, LitElement } from 'lit-element';
import { propsmixin } from "../mixins/propsmixin.js";

let props = () => ([]);

export class XB extends propsmixin(props, LitElement) {

    render() {
       
        return html`BBBBB`;
    }
}

customElements.define('x-b', XB);