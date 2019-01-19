import { html, LitElement } from 'lit-element';
import { reduxmixin } from "../mixins/reduxmixin.js";

let props = () => ([]);

export class XStartpage extends reduxmixin(props, LitElement) {
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
       
        return html`STARTSIDA
        <style>
            div {
                min-height: 60vh;
            }
        </style>
        <div>
            ${JSON.stringify(firebase.auth().currentUser)}
        </div>`;
    }
}

customElements.define('x-startpage', XStartpage);