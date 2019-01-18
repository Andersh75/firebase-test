import { html, LitElement } from 'lit-element';
import { rx, toRender, getData, prepareRender } from "../utils/whcg-functions.js";
import'./x-button.js';
import { rxmixin } from '../mixins/rxmixin.js';
import * as R from "ramda/es/index.js";

let props = () => ([
    {
        propKey: "props",
        propValue: { type: Object },
        rx: true
    },
    {
        propKey: "buttons",
        propValue: { type: Object },
        rx: true
    },
    {
        propKey: "headline",
        propValue: { type: Object },
        rx: true
    },
    {
        propKey: "okToRender",
        propValue: { type: Boolean },
        rx: false
    },
]);

export class XSubheader extends rxmixin(props, LitElement) {
    constructor() {
        super();
        this.rendertitle = false
        this.renderbuttons = false
        this.okToRender = false
    }

    getData(value, index) {
        return getData.call(this, value, index)
      }

    scenarioChangedHandler(index) {
        let event = new CustomEvent('scenariochanged', { detail: {index: index }}); 
        this.dispatchEvent(event);
      }

    
      firstUpdated() {
        super.firstUpdated();
        rx.latestCombiner([this.buttons$, this.headline$])
        .pipe(rx.undefinedElementRemover)
        .subscribe((result) => {
            this.renderbuttons = this.buttons;
            this.rendertitle = this.headline;
            this.okToRender = true;
            this.requestUpdate();
        })
    }

    updated(changedProperties) {
        super.updated(changedProperties)
        changedProperties.forEach((oldValue, propName) => {
            if (propName === "props") {
                this.props.forEach(prop => {
                    if (prop.name == 'buttons') {
                        this.buttons = prop;
                    }
                    if (prop.name == 'title') {
                        this.headline = prop;
                    }
                })
            };
        });
    }



    render() {
        return this.okToRender ? 
        html`
            <style>
                .subheader {
                    display: grid;
                    grid-template-columns: repeat(12, 1fr);
                    grid-column-gap: 20px;
                    grid-template-areas: 
                        ".    title     title     title    title     title    title    boxes     boxes     boxes     boxes     .";
                }

                .title {                            
                    grid-area: title;
                    font: var(--font-subheader);
                    color: var(--color-text);
                    align-self: center;
                    /* visibility: ${this.hidetitle ? 'hidden' : 'visible'}; */
                } 

                .boxes {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    grid-column-gap: 20px;
                    grid-template-areas: 
                    "firstbox";                    
                    grid-area: boxes;
                    align-self: center;
                    justify-self: end;
               
                    
                }

                .data {
                    grid-area: firstbox;
                    display: grid;
                    grid-template-columns: repeat(${this.renderbuttons.json_schema.length}, 1fr);
                    grid-template-rows: auto;
                    grid-column-gap: 6px;
                }
            </style>
            
            <div class="subheader">
                <div class="title">${this.rendertitle.data_schema}</div>
                <div class="boxes">
                    <div class="data">
                        ${toRender.call(this, prepareRender(this.renderbuttons))}   
                    </div>
                </div>
            </div>`
            : html``
    }
}

customElements.define('x-subheader', XSubheader);