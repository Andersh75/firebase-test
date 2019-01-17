import { html, LitElement } from 'lit-element';
import { rx, toRender, prepareRender } from "../utils/whcg-functions.js";
import { rxmixin } from "../mixins/rxmixin.js";

let props = () => ([
    { propKey: "props", propValue: { type: Object }, rx: false },
    { propKey: "buttons", propValue: { type: Object }, rx: true },
    { propKey: "okToRender", propValue: { type: Boolean }, rx: false },
  ]);

export class XMenuLogin extends rxmixin(props, LitElement) {

    constructor() {
        super()
        this.okToRender = false;
    }

    menuchangedHandler(index) {
        let event = new CustomEvent('menuchanged', { detail: {value: String(index)} });
        this.dispatchEvent(event);
    }
    
      firstUpdated() {
        super.firstUpdated();
        rx.latestCombiner([this.buttons$])
        .pipe(rx.undefinedElementRemover)
        .subscribe(() => {
            this.renderbuttons = this.buttons;
            this.okToRender = true;
            this.requestUpdate();
        })
    }

      updated(changedProperties) {
        super.updated(changedProperties);
        changedProperties.forEach((oldValue, propName) => { 
            if (propName === "props") {
                this.props.forEach(prop => {
                    if (prop.name == 'buttons') {
                        this.buttons = prop;
                    }
                })
            };
        });
    }


    render() {

        return this.okToRender ? html`
            <style>
@media only screen and (min-width : 660px) {   
                .menu {
                    display: grid;
                    grid-template-columns: repeat(${this.renderbuttons != undefined ? this.renderbuttons.json_schema.length : 1}, max-content);
                    grid-column-gap: 10px;
                }
}

@media only screen and (max-width : 659px) {   
                .menu {
                    display: grid;
                    grid-template-columns: repeat(${this.renderbuttons != undefined ? this.renderbuttons.json_schema.length : 1}, max-content);
                    grid-column-gap: 10px;
                    visibility: hidden;
                }
}

            </style>
            <div class="menu">
                ${toRender.call(this, prepareRender(this.renderbuttons))}
            </div>
            ` : html``
    }
}

customElements.define('x-menulogin', XMenuLogin);


