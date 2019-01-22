import { html, LitElement} from 'lit-element';
import { rxmixin } from '../mixins/rxmixin';
import { rx, toRender, prepareRender, getData } from "../utils/whcg-functions.js";
import * as R from "ramda/es/index.js";

let props = () => ([
    { propKey: "props", propValue: { type: Object }, rx: false },
    { propKey: "header", propValue: { type: Object }, rx: true },
    { propKey: "rows", propValue: { type: Object }, rx: true },
    { propKey: "sumrow", propValue: { type: Object }, rx: true },
    { propKey: "okToRender", propValue: { type: Boolean }, rx: false },
  ]);

export class XTable extends rxmixin(props, LitElement) {

    constructor() {
        super();
        this.okToRender = false;
        this.header = false;
        this.rows = false;
        this.sumrow = false;
      }

      getData(value, index) {
        return getData.call(this, value, index)
      }

    rowChangedHandler(e, index) {
        console.log('RCH: ', e, index)
        let event = new CustomEvent('tablechanged', { detail: {row: index, column: e.detail.column, value: e.detail.value}}); 
        this.dispatchEvent(event);
    }

    firstUpdated() {
        super.firstUpdated();
        rx.latestCombiner([this.header$, this.rows$, this.sumrow$])
        .pipe(rx.undefinedElementRemover)
        .subscribe(() => {
            this.renderheader = this.header;
            this.renderrows = this.rows;
            this.rendersumrow = this.sumrow;
            this.okToRender = true;
            this.requestUpdate();
        })
    }

    render() {
        
        return this.okToRender ? html`
            <style>
                .table {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    grid-gap: 2px;                 
                }
            </style>
            
            <div class="table">
                ${toRender.call(this, prepareRender(this.renderheader))}
                ${toRender.call(this, prepareRender(this.renderrows))}
                ${toRender.call(this, prepareRender(this.rendersumrow))}
            </div>
            ` : html``
    }

    updated(changedProperties){
        super.updated(changedProperties)
        changedProperties.forEach((oldValue, propName) => {
          if (propName === "props") {
            this.props.forEach(prop => {
                if (prop.name == 'header') {
                    this.header = prop;
                }
                if (prop.name == 'rows') {
                    this.rows = prop;
                }
                if (prop.name == 'sumrow') {
                    this.sumrow = prop;
                }
            })
          };
        });   
    }
}




customElements.define('x-table', XTable);



