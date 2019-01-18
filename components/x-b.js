import { html, LitElement } from 'lit-element';
import { propsmixin } from "../mixins/propsmixin.js";

let props = () => ([]);

export class XB extends propsmixin(props, LitElement) {
    onBeforeEnter(location, commands, router) {
        if (!firebase.auth().currentUser) {
            return commands.redirect('/')
        }
        console.log('GOING INTO USERS')
    }
    render() {
       
        return html`BBBBB`;
    }
}

customElements.define('x-b', XB);