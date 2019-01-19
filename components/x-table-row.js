import { html, LitElement } from 'lit-element';
import { rx, toRender, prepareRender } from "../utils/whcg-functions.js";
import { rxmixin } from "../mixins/rxmixin.js";
import "./x-input.js";
import * as R from "ramda/es/index.js";

let props = () => ([
    { propKey: "label", propValue: { type: Array }, rx: true },
    { propKey: "data", propValue: { type: Array }, rx: true },
    { propKey: "type", propValue: { type: String }, rx: false },
    { propKey: "startyear", propValue: { type: String }, rx: false},
    { propKey: "endyear", propValue: { type: Array }, rx: false},
    { propKey: "format", propValue: { type: Boolean }, rx: false },
    { propKey: "readonly", propValue: { type: Boolean }, rx: false },
    { propKey: "props", propValue: { type: Object }, rx: false },
    { propKey: "okToRender", propValue: { type: Boolean }, rx: false },
  ]);


export class XTableRow extends rxmixin(props, LitElement) {

    constructor() {
        super()
        this.readonly = false;
        this.label = false;
        this.data = false;
        this.okToRender = false;
        
    }


    cellChangedHandler(e, index) {
      
        let event = new CustomEvent('rowchanged', { detail: {column: index, value: e.detail.value }}); 
        this.dispatchEvent(event);
    }

    firstUpdated() {
        super.firstUpdated();
        rx.latestCombiner([this.data$, this.label$])
        .pipe(rx.undefinedElementRemover)
        .subscribe(() => {
            this.renderdata = this.data;
            this.renderlabel = this.label;

            if (this.renderdata && this.renderlabel) {
                this.okToRender = true;
                this.requestUpdate();
            }
        })

    }

    render() {

        return this.okToRender ? html`
            <style>
                .tablerow {
                    display: grid;
                    grid-template-columns: repeat(10, 1fr);
                    grid-column-gap: 20px;
                    grid-template-areas: 
                        "label    label    label      data    data      data    data      data    data     data";
                } 

                .label {
                    grid-area: label;
                    font: var(--font-table-row-label);
                    color: var(--color-text);
                }

                .data {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(1px,1fr));
                    grid-gap:2px;
                    grid-area: data;
                }

                .label--sum {
                    font: var(--font-table-row-label--sum);
                }

                .attention {
                    background-color: var(--color-attention);
                    border: 1px solid var(--color-attention);
                    color: var(--color-text);
                }

                .grey {
                    background-color: rgba(196, 196, 196, 0.16);
                    border: 1px solid var(--color-text);
                    color: var(--color-text);
                }

                .white {
                    border: 1px solid var(--color-text);
                    background-color: var(--color-text);
                    color: #575757;
                    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1); 
                } 

                .header {
                    border: 1px solid var(--color-transparent);
                    color: var(--color-text);
                    font: var(--font-table-label);
                }
            </style>
            
            <div class="tablerow">
                <div class="label ${this.renderlabel.ui_schema.ui_options.color == 'header' ? 'header' : ''} ${this.renderlabel.ui_schema.ui_options.type == 'sum' ? 'label--sum' : ''}">${this.renderlabel.data_schema}</div>
                <div class="data">
                    ${toRender.call(this, prepareRender(this.renderdata))}
                </div> 
            </div>
            ` : html``
    }

    updated(changedProperties) {
        super.updated(changedProperties)
        changedProperties.forEach((oldValue, propName) => {
            if (propName === "props") {
                if (R.is(Array, this.props)) {
                    this.props.forEach(prop => {
                        if (prop.name == 'label') {
                            this.label = prop;
                        }
                        if (prop.name == 'data') {
                            this.data = prop;
                        }
                    })
                } else {
                    if (this.props.name == 'label') {
                        this.label = this.props;

                    }
                    if (this.props.name == 'data') {
                        this.data = this.props;
                    }
                }
            };
        });
    }
}

customElements.define('x-table-row', XTableRow);