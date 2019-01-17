import { html, LitElement } from 'lit-element';
import { propsmixin } from "../mixins/propsmixin.js";

let props = () => ([]);

export class XC extends propsmixin(props, LitElement) {

    render() {
       
        return html`CCCC`;
    }
}

customElements.define('x-c', XC);