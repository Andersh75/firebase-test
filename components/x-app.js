import { html, LitElement } from 'lit-element';
import { Router } from '@vaadin/router'
import './x-home.js'
import './x-pets.js'
import './x-users.js'


class XApp extends LitElement {
    constructor() {
        super();
    }

    firstUpdated() {
        super.firstUpdated();

        const outlet = this.shadowRoot.getElementById('outlet');
        const router = new Router(outlet);
        router.setRoutes([
            {path: '/', component: 'x-home'},
            {path: '/users', component: 'x-users'},
            {path: '/pets', component: 'x-pets'},
            {path: '(.*)', component: 'x-home'},
        ]);
    }

    render() {
        return html`
            <style>
            </style>
            <a href="/">Home</a>
            <a href="/users">Users</a>
            <a href="/pets">Pets</a>
            <div id="outlet"></div>
        `
    }
}


customElements.define('x-app', XApp);