import { html, LitElement} from 'lit-element';
import { rx, toRender, prepareRender } from "../utils/whcg-functions.js";
import { rxmixin } from "../mixins/rxmixin.js";
import * as R from "ramda/es/index.js";


let props = () => ([
    { propKey: "data", propValue: { type: Object }, rx: true },
    { propKey: "comment", propValue: { type: String }, rx: true },
    { propKey: "label", propValue: { type: String }, rx: true },
    { propKey: "index", propValue: { type: Number }, rx: false },
    { propKey: "remove", propValue: { type: Boolean }, rx: false },
    { propKey: "props", propValue: { type: Object }, rx: false },
    { propKey: "removehidden", propValue: { type: Boolean }, rx: false },
    { propKey: "add", propValue: { type: Boolean }, rx: false },
  ]);

 
export class XAssumptionRow extends rxmixin(props, LitElement) {

    constructor() {
        super();
        this.data = false
        this.comment = false
        this.label = false
    }

    cellChangedHandler(e) {
        let event = new CustomEvent('rowchanged', { detail: {value: e.detail.value}}); 
        this.dispatchEvent(event);
    }


    removeClickHandler(e) {
        let event = new CustomEvent('removerow'); 
        this.dispatchEvent(event);
    }


    addClickHandler(e) {
        let event = new CustomEvent('addrow'); 
        this.dispatchEvent(event);
    }


    render() {    
        return this.okToRender ? html`
    
    <style>
        .tablerow {
            display: grid;
            grid-template-columns: repeat(10, 1fr);
            grid-column-gap: 20px;
            grid-template-areas: 
                "label      label       label    label        data        comment         comment         comment         comment         comment";
        }

        .extra {
            padding-top: 30px;
        }

        .label {
            grid-area: label; 
            font: var(--font-table-row-label);
            color: var(--color-text);
            white-space: nowrap;
        }

        .data {
            grid-area: data;
        }

        .comment {
            grid-area: comment;
            font: var(--font-table-row-comment);
            color: var(--color-text);
        }

        .svg {
            fill: white;
            height: 18px;
            margin-left: -24px;
            padding-right: 6px;
            position: relative;
            left: -16px;
            top: 34px;
            opacity: 0.25;
        }

        .hidden {
            visibility: hidden;
        }

        .svg:hover {
            opacity: 1;
            transition: opacity .25s ease-in-out .0s;
        }

        .header {
            border: 1px solid var(--color-transparent);
            color: var(--color-text);
            font: var(--font-table-label);
        }
    </style>
    
  
    <div class=${(this.index != 0 && this.remove) ? 'tablerow extra' : 'tablerow'}>
        <div class="label ${this.renderlabel.ui_schema && this.renderlabel.ui_schema.ui_options && this.renderlabel.ui_schema.ui_options.color ? this.renderlabel.ui_schema.ui_options.color : ''}">${this.removehidden ? html`<img src="./images/minus.svg" class="svg hidden" @click="${() => this.removeClickHandler()}">` : html``}${this.remove ? html`<img src="./images/minus.svg" class="svg" @click="${() => this.removeClickHandler()}">` : html``}${this.add ? html`<img src="./images/add-circular-outlined-button.svg" class="svg" @click="${() => this.addClickHandler()}">` : html``}${this.renderlabel.data_schema}</div>
        <div class="data">
            ${toRender.call(this, prepareRender(this.renderdata))}
        </div>
        <div class="comment">
            ${toRender.call(this, prepareRender(this.rendercomment))}
        </div>    
    </div>
        ` : html``
    }

    firstUpdated() {
        super.firstUpdated();
        rx.latestCombiner([this.data$, this.label$, this.comment$])
        .pipe(rx.undefinedElementRemover)
        .subscribe(() => {
            this.renderdata = this.data;
            this.renderlabel = this.label;
            this.rendercomment = this.comment;
            this.okToRender = true;
            this.requestUpdate();
        })
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        changedProperties.forEach((oldValue, propName) => { 
            if (propName === "props") {
                if (R.is(Array, this.props)) {
                    this.props.forEach(prop => {
                        if(prop.name == 'label') {
                            this.label = prop;
                        }
                        if(prop.name == 'data') {
                            this.data = prop;
                        }
                        if(prop.name == 'comment') {
                            this.comment = prop;
                        }
                    })
                } else {
                    if(this.props.name == 'label') {
                        this.label = this.props; 
                    }
                    if(this.props.name == 'data') {
                        this.data = this.props;
                    }
                    if(this.props.name == 'comment') {
                        this.comment = this.props;
                    }
                }
            };
        });
    }
}

customElements.define('x-assumption-row', XAssumptionRow);