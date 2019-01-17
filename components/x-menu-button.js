import { html, LitElement } from 'lit-element';
import { propsmixin } from "../mixins/propsmixin.js";

let props = () => ([
    { propKey: "props", propValue: { type: Object }, rx: false },
    { propKey: "selected", propValue: { type: Boolean }, rx: false },
    { propKey: "value", propValue: { type: String }, rx: false },
  ]);

export class XMenuButton extends propsmixin(props, LitElement) {

    clickHandler() {
        let event = new CustomEvent('menuchanged');
        this.dispatchEvent(event);
    }

    updated(changedProperties) {
        super.updated(changedProperties)
        changedProperties.forEach((oldValue, propName) => {
            if (propName === "props") {
                this.selected = this.props.ui_schema.ui_options.selected;
                this.value = this.props.data_schema.value;
            };
        });
    }

    render() {
       
        return html`
            <style>
            .button {
                display: flex;
                justify-content: center;
                align-items: center;                    
                font: var(--font-menu);
                color: var(--color-menu); 
                border-bottom: 2px solid var(--color-transparent);
            }

            .selected {
                transition: border-bottom 0.1s ease-in;
                border-bottom: 2px solid var(--color-attention);
            }

            </style>
            <div class="${this.selected ? 'selected' : ''} button" @click="${() => this.clickHandler()}">${this.value}</div>     
        `;
    }
}

customElements.define('x-menu-button', XMenuButton);