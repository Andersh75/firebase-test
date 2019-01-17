import { html, LitElement } from 'lit-element';
import { propsmixin } from "../mixins/propsmixin.js";

let props = () => ([]);

export class XA extends propsmixin(props, LitElement) {

    render() {
       
        return html`AAAAA`;
    }
}

customElements.define('x-a', XA);