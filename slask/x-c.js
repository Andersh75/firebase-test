import { html, LitElement } from 'lit-element';
import { propsmixin } from "../mixins/propsmixin.js";

let props = () => ([]);

export class XC extends propsmixin(props, LitElement) {
    onBeforeEnter(location, commands, router) {
        if (!firebase.auth().currentUser) {
            return commands.redirect('/')
        }
    }
    render() {
       
        return html`CCCC`;
    }
}

customElements.define('x-c', XC);