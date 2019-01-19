import { html, LitElement } from 'lit-element';
import { propsmixin } from "../mixins/propsmixin.js";

let props = () => ([]);

export class XD extends propsmixin(props, LitElement) {
    // onBeforeEnter(location, commands, router) {
    //     if (!firebase.auth().currentUser) {
    //         return commands.redirect('/')
    //     }
    //     console.log('GOING INTO USERS')
    // }

    constructor() {
        super();
        firebase.auth().onAuthStateChanged((user) => {
            this.requestUpdate();
          });
    }
    render() {
       
        return html`DDDD
        ${JSON.stringify(firebase.auth().currentUser)}`;
    }
}

customElements.define('x-d', XD);