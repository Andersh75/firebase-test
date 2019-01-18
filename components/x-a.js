import { html, LitElement } from 'lit-element';
import { propsmixin } from "../mixins/propsmixin.js";

let props = () => ([]);

export class XA extends propsmixin(props, LitElement) {

    onBeforeEnter(location, commands, router) {
        if (!firebase.auth().currentUser) {
            return commands.redirect('/')
        }
        console.log('GOING INTO USERS')
    }

    render() {
       
        return html`AAAAA`;
    }
}

customElements.define('x-a', XA);