import { html, LitElement } from 'lit-element';
import { propsmixin } from "../mixins/propsmixin.js";

let props = () => ([]);

export class XD extends propsmixin(props, LitElement) {

    render() {
       
        return html`DDDD`;
    }
}

customElements.define('x-d', XD);