import { html, LitElement } from "lit-element";
import { grid } from "../css/grid.css.js";
import { rx, toRender, prepareRender } from "../utils/whcg-functions.js";
import { rxmixin } from "../mixins/rxmixin.js";
import * as R from "ramda/es/index.js";
;

let props = () => [
  {
    propKey: "scenario",
    propValue: { type: String }
  },
  {
    propKey: "title",
    propValue: { type: String }
  },
  { 
    propKey: "renderdata", 
    propValue: { type: Array }, 
    rx: false 
  },
  { 
    propKey: "props", 
    propValue: { type: Object }, 
    rx: false 
  },
  { 
    propKey: "subheader", 
    propValue: { type: Object }, 
    rx: true 
  },
  { 
    propKey: "header", 
    propValue: { type: Object }, 
    rx: true 
  },
  { 
    propKey: "main", 
    propValue: { type: Object }, 
    rx: true 
  },
  // { 
  //   propKey: "hidesubheader", 
  //   propValue: { type: Boolean }, 
  //   rx: false 
  // },
];

export class XMain extends rxmixin(props, LitElement) {
  constructor() {
    super();
    this.rendermain = false
    this.renderheader = false
    this.rendersubheader = false
    this.okToRender = false
    this.scenario = chosenScenario;
    // this.hidesubheader = false
  }

  tablePagingChangedHandler() {
    let event = new CustomEvent('tablepagingchanged');
    this.dispatchEvent(event);
    // console.log(e)
  }

  scenarioChangedHandler(e) {
    let event = new CustomEvent('scenariochanged', { detail: {index: e.detail.index} });
    this.dispatchEvent(event);
  }

  gridChangedHandler(e, index) {
    let event = new CustomEvent('gridchanged', { detail: {...e.detail, table: index} });
    this.dispatchEvent(event);
  }

  tableChangedHandler(e, index) {
    console.log('TCH: ', e, index)
    let event = new CustomEvent('tablechanged', { detail: {...e.detail, table: index} });
    this.dispatchEvent(event);
  }

  addRowChangedHandler(e, index) {
    let event = new CustomEvent('addrowchanged', { detail: {...e.detail, table: index} });
    this.dispatchEvent(event);
  }

  removeRowChangedHandler(e, index) {
    let event = new CustomEvent('removerowchanged', { detail: {...e.detail, table: index} });
    this.dispatchEvent(event);
  }

  rowChangedHandler(e, index) {
    let event = new CustomEvent('rowchanged', { detail: {...e.detail, table: index} });
    this.dispatchEvent(event);
  }

  firstUpdated() {
    super.firstUpdated();
    rx.latestCombiner([this.subheader$])
      .pipe(rx.undefinedElementRemover)
      .subscribe(() => {
        this.rendersubheader = this.subheader;
        this.renderheader = this.header;
        this.rendermain = this.main;
        // this.renderscenario = this.scenario
        // this.rendertitle = this.title
        this.okToRender = true
        this.requestUpdate();
      })
   
  }

//   rx.latestCombiner([this.subheader$, this.header$, this.main$])
//   .pipe(rx.undefinedElementRemover)
//   .subscribe(() => {
//     this.rendersubheader = this.subheader;
//     this.renderheader = this.header;
//     this.rendermain = this.main;
//     this.renderscenario = this.scenario
//     this.rendertitle = this.title
//     this.okToRender = true
//     this.requestUpdate();
//   })

// }

  updated(changedProperties) {
    super.updated(changedProperties);
    changedProperties.forEach((oldValue, propName) => {
        if (propName === "props") {
          
          this.props.forEach(prop => {
          
            if (prop.name == 'subheader') {
              this.subheader = prop;
       
            }
            if (prop.name == 'header') {
              this.header = prop;
            }
            if (prop.name == 'main') {
              this.main = prop;
            }
          })
        };
    });

}


  render() {
    return this.okToRender ? html`
      ${grid}
      <style>
        .center {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: 90px auto 94px auto 200px;
          grid-column-gap: 20px;
          grid-template-areas:
            ".  .   .   .   .   .   .   .   .   .   .  ."
            "subheader  subheader   subheader   subheader   subheader   subheader   subheader   subheader   subheader   subheader   subheader  subheader"
            ".          .           .           .           .           .           .           .           .           .           .           ."
            "main       main        main        main        main        main        main        main        main        main        main        main"
            ".          .           .           .           .           .           .           .           .           .           .           .";

          grid-area: center;
        }

        .subheader {
          grid-area: subheader;
          /* position: sticky;
          top: 100px; */
          /* visibility: ${this.hidesubheader ? 'hidden' : 'visible'}; */
        }

        .main {
          grid-area: main;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: auto;
          grid-column-gap: 20px;
          grid-row-gap: 3em;
          display: grid;
        }

        .header {
          grid-column-start: 1;
          grid-column-end: 13;
          /* position: sticky;
          top: 180px; */
        }

        .table {
          grid-column-start: 1;
          grid-column-end: 13;
          padding-bottom: 10px; 
          /* position: sticky;
          top: 180px; */

        }

        .table-0 {
          grid-column-start: 1;
          grid-column-end: 7;
          padding-bottom: 50px;

        }

        .tableone {
          grid-column-start: 1;
          grid-column-end: 13;
          padding-bottom: 50px;
        }

        .tabletwo {
          grid-column-start: 1;
          grid-column-end: 13;
          padding-bottom: 50px;
        }

        /* .tablechartone-0 {
          grid-column-start: 1;
          grid-column-end: 7;
          padding-bottom: 50px;
        }

        .tabletchartwo-0 {
          grid-column-start: 7;
          grid-column-end: 13;
          padding-bottom: 50px;
        } */

        .table-1 {
          grid-column-start: 7;
          grid-column-end: 13;
          padding-bottom: 50px;
        }

        .gridbox-0 {
          grid-column-start: 2;
          grid-column-end: 4;
          padding-bottom: 50px;
          align-self: start

        }

        .gridbox-1 {
          grid-column-start: 4;
          grid-column-end: 6;
          padding-bottom: 50px;
          align-self: start
        }

        .gridbox-2 {
          grid-column-start: 6;
          grid-column-end: 8;
          padding-bottom: 50px;
          align-self: start
        }

      </style>


      <div class="center">
          ${toRender.call(this, prepareRender(this.rendersubheader))}
        <div class="main">
          ${toRender.call(this, prepareRender(this.renderheader))}
          ${toRender.call(this, prepareRender(this.rendermain))}
        </div>
      </div>
      ` : html``
    ;
  }
}

customElements.define("x-main", XMain);

