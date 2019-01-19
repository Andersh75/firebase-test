import { html, LitElement } from 'lit-element';
import { connectmixin } from '../mixins/connectmixin.js';
import * as R from "ramda/es/index.js";

let props = () => ([]);

    export class XUsers extends connectmixin(props, LitElement) {
    constructor() {
        super();
    }

    onBeforeEnter(location, commands, router) {
        if (!firebase.auth().currentUser) {
            return commands.redirect('/')
        }

    }

    stateChanged(state) {
        console.log(state)
    }

    render() {
        return html`
            <style>
                div {
                    font-family: var(--font);
                    color: red;
                }
            </style>
            <div>ÅÄÖ</div>
        `
    }
}


customElements.define('x-users', XUsers);
