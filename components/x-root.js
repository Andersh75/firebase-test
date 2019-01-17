import { html, LitElement } from 'lit-element';
import './x-header.js';
import './x-footer.js';
import { usermixin } from '../mixins/usermixin.js';
import { rxmixin } from '../mixins/rxmixin.js';

let props = () => ([]);

export class XRoot extends rxmixin(props, usermixin(props, LitElement)) {

    constructor() {
        super()
    }
    
    render() {
        return html`
        <slot></slot>`
    }
}

customElements.define('x-root', XRoot);