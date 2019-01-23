import { html, LitElement} from 'lit-element';
import { rxmixin } from '../mixins/rxmixin';
import { rx, toRender, prepareRender, getData } from "../utils/whcg-functions.js";
;

let props = () => ([
    { propKey: "props", propValue: { type: Object }, rx: false },
    { propKey: "okToRender", propValue: { type: Boolean }, rx: false },
    { propKey: "grids", propValue: { type: Array }, rx: true },
  ]);

export class XGridbox extends rxmixin(props, LitElement) {

    constructor() {
        super();
        this.okToRender = false;
      }

      gridChangedHandler(e, index) {
        let event = new CustomEvent('gridchanged', { detail: {...e.detail, grid: index} });
        this.dispatchEvent(event);
      }

      getData(value, index) {
        return getData.call(this, value, index)
      }

    // rowChangedHandler(e, index) {
    //     let event = new CustomEvent('tablechanged', { detail: {row: index, column: e.detail.column, value: e.detail.value}}); 
    //     this.dispatchEvent(event);
    // }

    firstUpdated() {
        super.firstUpdated();
        rx.latestCombiner([this.grids$])
        .pipe(rx.undefinedElementRemover)
        .subscribe(() => {
            this.rendergrids = this.grids;

            
            this.okToRender = true;
            this.requestUpdate();
        })
    }

    render() {
        
        return this.okToRender ? html`
            <style>
                .gridbox {
                    display: flex;
                    flex-direction: column;                   
                }
            </style>
            
            <div class="gridbox">
                ${toRender.call(this, prepareRender(this.rendergrids))}
            </div>
            ` : html``
    }

    updated(changedProperties){
        super.updated(changedProperties)
        changedProperties.forEach((oldValue, propName) => {
          if (propName === "props") {
            console.log('BG', this.props)
            this.props.forEach(prop => {
                if (prop.name == 'grids') {
                    this.grids = prop;
                }
            })
          };
        });   
    }
}




customElements.define('x-gridbox', XGridbox);



