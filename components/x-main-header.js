import { html, LitElement } from 'lit-element';
import { rxmixin } from "../mixins/rxmixin.js";
import { rx, toRender, prepareRender } from "../utils/whcg-functions.js";
import * as R from "ramda/es/index.js";
;

let props = () => ([
    { propKey: "props", propValue: { type: Object }, rx: false },
    { propKey: "data", propValue: { type: Object }, rx: true },
    { propKey: "comment", propValue: { type: String }, rx: true },
    { propKey: "label", propValue: { type: String }, rx: true },
    { propKey: "okToRender", propValue: { type: Boolean }, rx: false },
  ]);

export class XMainHeader extends rxmixin(props, LitElement) {
    constructor() {
        super()
        this.renderdata = false
        this.rendercomment = false
        this.renderlabel = false
        this.okToRender = false;
    }

    firstUpdated() {
        super.firstUpdated();
        rx.latestCombiner([this.data$, this.comment$, this.label$])
        .pipe(rx.undefinedElementRemover)
        .subscribe(() => {
            this.renderdata = this.data;
            this.rendercomment = this.comment;
            this.renderlabel = this.label;
            this.okToRender = true;
            this.requestUpdate();
        })
    }

      updated(changedProperties){
        super.updated(changedProperties)
        changedProperties.forEach((oldValue, propName) => {
          if (propName === "props") {
            this.props.forEach(prop => {
                if (prop.name == 'label') {
                    this.label = prop;
                }
                if (prop.name == 'data') {
                    this.data = prop;
                }
                if (prop.name == 'comment') {
                    this.comment = prop;
                }
            })
          };
        }); 
    }

    render() {
        
        return this.okToRender ? html`
              <style>
        
            .row {
                display: grid;
                grid-template-columns: repeat(10, 1fr);
                grid-column-gap: 20px;
                grid-template-areas: 
                    "label      label       label    .        data        comment         comment         comment         select         select";
                border-bottom: 2px solid var(--color-text);
                align-items: center;
                font: var(--font-main-header);
                color: var(--color-text); 
            }

            .label {
                grid-area: label; 

            }

            .data {
                grid-area: data; 
            }

            .comment {
                grid-area: comment;
            }
    </style>
    <div class="row">
        <div class="label">${toRender.call(this, prepareRender(this.renderlabel))}</div>
        <div class="data">${toRender.call(this, prepareRender(this.renderdata))}</div>
        <div class="comment">${toRender.call(this, prepareRender(this.rendercomment))}</div>
    </div>
        ` : html``
    }
}

customElements.define('x-main-header', XMainHeader);