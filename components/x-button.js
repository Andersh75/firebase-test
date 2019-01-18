import { html, LitElement} from 'lit-element';
import { propsmixin } from "../mixins/propsmixin.js";
import * as R from "ramda/es/index.js";


let props = () => ([
    { propKey: "props", propValue: { type: Object }, rx: false },
    { propKey: "data", propValue: { type: Object }, rx: false },
    { propKey: "selected", propValue: { type: Boolean }, rx: false },
    { propKey: "value", propValue: { type: String }, rx: false },
    { propKey: "color", propValue: { type: String }, rx: false },
  ]);


export class XButton extends propsmixin(props, LitElement) {

    constructor() {
        super();
        this.selected = false
    }

    clickHandler() {
        // console.log('click')
        let event = new CustomEvent('clickchanged');
        this.dispatchEvent(event);
    }

    updated(changedProperties) {
        super.updated(changedProperties)
        changedProperties.forEach((oldValue, propName) => {
            if (propName === "props") {
                if (this.props.ui_schema.ui_options) {
                    this.color = this.props.ui_schema.ui_options.color;
                    this.selected = this.props.ui_schema.ui_options.selected;
                }

                if (this.props.ui_schema.ui_actions) {
                }

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
                    padding-left: 1.0em;
                    padding-right: 1.0em;
                    box-shadow: var(--shadow--small);
                    font: var(--font-scenario-button);
                    border: 1px solid var(--color-text);
                    color: var(--color-text);
                }

                .grey {
                    background-color: var(--color-grey); 
                    border: 1px solid var(--color-text);
                    color: var(--color-text);
                }

                .grey.selected{
                    transition: background-color 0.1s ease-in;
                    background-color: var(--color-grey); 
                }
            </style>   
            
            <div class="button ${this.color} ${this.selected ? 'selected' : ''}" @click="${() => this.clickHandler()}">${this.value}</div> 
        `;
    }
}

customElements.define('x-button', XButton);


