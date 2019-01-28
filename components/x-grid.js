import { html, LitElement } from 'lit-element'
import { rxmixin } from '../mixins/rxmixin.js'
import '@vaadin/vaadin-grid/vaadin-grid.js'
import '@vaadin/vaadin-grid/vaadin-grid-selection-column.js'

let props = () => [
  { propKey: 'value', propValue: { type: Array }, rx: false },
  { propKey: 'valuedyn', propValue: { type: Array }, rx: false },
  { propKey: 'valueperm', propValue: { type: Array }, rx: false },
  { propKey: 'type', propValue: { type: String }, rx: false },
  { propKey: 'label', propValue: { type: Array }, rx: false },
  { propKey: 'props', propValue: { type: Array }, rx: false },
  { propKey: 'test', propValue: { type: Array }, rx: false },
  { propKey: 'years', propValue: { type: Array }, rx: false }
]

export class XGrid extends rxmixin(props, LitElement) {
  valuechangedHandler (e) {
    console.log(this.shadowRoot.querySelector('.thediv').selectedItems)
    let event = new CustomEvent('gridchanged', { detail: { selected: this.shadowRoot.querySelector('.thediv').selectedItems } })
    this.dispatchEvent(event)
  }

    clickHandler(e) {
        console.log(e)

    }

    render() {

        return html`
        <style>
            .thediv {
                font-size: var(--parmaco-font-size-m);
                border: 1px solid var(--whcg-shade-20pct);
                border-radius: 5px 5px 4px 4px;
                background-color: var(--whcg-shade-10pct);
                max-height: 400px;
                width: 100%;
            }
        </style>
        <vaadin-grid class="thediv" aria-label="Content Renderer Function" @change="${(e) => this.valuechangedHandler(e)}">
            <vaadin-grid-selection-column auto-select></vaadin-grid-selection-column>
            <vaadin-grid-column id="first"></vaadin-grid-column>
        </vaadin-grid>
        `;
    }


    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('resize', (event) => {
            this.shadowRoot.querySelector('.thediv').style.width = `${this.offsetWidth}px`;
          });
    }



    updated(changedProps) {
        super.updated(changedProps);

        if (changedProps.has('props')) {
            let data = [];

            data = this.props[0].json_schema.map(schema => {
                return {data: schema.json_schema[0].data_schema,
                    id: schema.json_schema[1].data_schema,
                    selected: schema.json_schema[2].data_schema}
            })

            let selectedIds = data.filter(item => {
                return item.selected == true
            }).map(item => {
                return {id: item.id}
            })


            const grid = this.shadowRoot.querySelector('vaadin-grid');
            grid.items = data;
            grid.itemIdPath="id"


            if(data.length < 8) {
                console.log(data.length)
                grid.heightByRows = true
            }


            const columns = this.shadowRoot.querySelectorAll('vaadin-grid-column');

            columns[0].renderer = function (root, column, rowData) {

                root.textContent = rowData.item.data;
            };
            columns[0].headerRenderer = function (root, column) {
                root.textContent = 'HEADER';
                root.addEventListener('click', e => {
                    this.clickHandler(e)
                })
            };

            columns[0].footerRenderer = function (root, column) {
                root.textContent = '';
            };

            grid.selectedItems = selectedIds;
        }

    }
}

window.customElements.define('x-grid', XGrid);


// canvas = html`<canvas id="myChart" height="300" width="750"></canvas>`;


{/* <div class="thediv">
${canvas}
</div> */}