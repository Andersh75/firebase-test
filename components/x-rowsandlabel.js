import { html, LitElement} from 'lit-element';
import { rxmixin } from '../mixins/rxmixin.js';
import { rx, toRender, prepareRender, getData } from "../utils/whcg-functions.js";
import './x-assumption-row.js';
import * as R from "ramda/es/index.js";
;

let props = () => ([
    { propKey: "selected", propValue: { type: String }, rx: false },
    { propKey: "label", propValue: { type: String }, rx: true },
    { propKey: "button", propValue: { type: Boolean }, rx: true },
    { propKey: "data", propValue: { type: Object }, rx: true },
    { propKey: "rows", propValue: { type: Object }, rx: true },
    { propKey: "props", propValue: { type: Object }, rx: false }
  ]);

export class XRowsandlabel extends rxmixin(props, LitElement) {

    constructor() {
        super();
        this.rows = []
        this.renderlabel = false
        this.renderrows = false
        this.okToRender = false
    }

    getData(value, index) {
        return getData.call(this, value, index)
      }

      firstUpdated() {
        super.firstUpdated();
        rx.latestCombiner([this.label$, this.rows$, this.button$])
        .pipe(rx.undefinedElementRemover)
        .subscribe(() => {
            this.renderlabel = this.label;
            this.renderrows = this.rows;
            this.renderbutton = this.button;
            this.okToRender = true;
            this.requestUpdate();
        })
    }

    rowChangedHandler(e, index) {
        let event = new CustomEvent('rowchanged', { detail: {value: e.detail.value, row: index}}); 
        this.dispatchEvent(event);
    }

    removeRowHandler(index) {
        let event = new CustomEvent('removerowchanged', { detail: {row: index}}); 
        this.dispatchEvent(event);
    }

    addRowHandler(index) {
        let event = new CustomEvent('addrowchanged', { detail: {row: index}}); 
        this.dispatchEvent(event);
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        changedProperties.forEach((oldValue, propName) => { 
            if (propName === "props") {
                this.props.forEach((prop, index) => {
                    if (prop.name == 'label') {
                        this.label = prop;
                    }
                    if (prop.name == 'rows') {
                        this.rows = prop;
                    }
                    if (!isNaN(+prop.name)) {
                        this.rows[+prop.name - 1] = prop;
                    }
                    if (prop.name == 'button') {
                        this.button = prop;
                    }
                })
            };
          });
    }
    render() {
        
        return this.okToRender ? html`
            <style>

                .table {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    grid-template-rows: 28px auto;
                    grid-column-gap: 20px;
                    grid-row-gap: 20px;
                }    

                .rowslabel{
                    font: var(--font-table-label);
                    color: var(--color-text);                    
                }

                .rows {
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-row-gap: 20px;
                }
                

                .test {
                    color: white;
                }

            </style>
            
            <div class="table">
                ${toRender.call(this, prepareRender(this.renderlabel))}
                
                ${toRender.call(this, prepareRender(this.renderrows))}
     
            </div>`: html``
    }
}

customElements.define('x-rowsandlabel', XRowsandlabel);


{/* <div class="rows">
                    
                
</div> */}


{/* ${toRender.call(this, prepareRender(this.renderlabel))} */}
