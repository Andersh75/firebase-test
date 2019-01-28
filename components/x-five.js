import { html, LitElement } from "lit-element";
import * as R from "ramda/es/index.js";
import { action } from "../redux/actions.js";
import {
  rx,
  getData,
  toRender,
  prepareRender,
  getRenderData,
  getPeriodArray,
  arrayAggregator,
  addArraysAndSip,
  getRealCostArray,
  getDiscountedRealCostArray,
  createNominalAggregatedCostArray,
  createPositiveOnlyNominalCostArray,
  createDepreciationArray,
  createDiscountedNominalAggregatedCostArray,
  createDiscountedPositiveOnlyNominalCostArray,
  createDiscountedDepreciationArray,
} from "../utils/whcg-functions.js";
import { rxmixin } from "../mixins/rxmixin.js";
import { reduxmixin } from "../mixins/reduxmixin.js";
import { fourMainSchemas } from "../schemas/x-four-main-schemas.js";
import { fiveMainSchemas } from "../schemas/x-five-main-schemas.js";
import { fourHeaderSchemas } from "../schemas/x-main-header-schemas.js";
import { fourSubheaderSchemas } from "../schemas/x-subheader-schemas.js";
import '../components/x-main.js';
import '../components/x-chart.js';
import '@vaadin/vaadin-select';
import PouchDB from 'pouchdb/dist/pouchdb.js';
import Auth from 'pouchdb-authentication/dist/pouchdb.authentication.js';
import '@vaadin/vaadin-button';
import * as d3 from "d3"


function mergeSchemas() {
  return {
      ui_schema: {
          ui_order: [
            "xmain"
          ],
          xmain: {
            ui_widget: 'x-main',
            ui_order: [
              "subheader",
              "header",
              "main",
            ],
            ui_merged: true,
            subheader: fourSubheaderSchemas.call(this).ui_schema,
      header: fourHeaderSchemas.call(this).ui_schema,
      main: fiveMainSchemas.call(this).ui_schema
          }
          
      },
      json_schema: {
          type: 'Object',
          properties: {
              xmain: {
                  type: 'Object',
                  properties: {
                    subheader: fourSubheaderSchemas.call(this).json_schema,
        header: fourHeaderSchemas.call(this).json_schema,
        main: fiveMainSchemas.call(this).json_schema
                  }
              }
          }
      },
      data_schema: {
        xmain: {
          subheader: fourSubheaderSchemas.call(this).data_schema,
      header: fourHeaderSchemas.call(this).data_schema,
      main: fiveMainSchemas.call(this).data_schema
        }
        
      }
  }
}



let props = () => [
  { propKey: "comment", propValue: { type: String }, rx: false },
  {
    propKey: "startyear",
    propValue: { type: String },
    rx: true,
    path: ["assumptions", "startyear"]
  },
  {
    propKey: "scenario",
    rx: true,
    propValue: { type: String }
  },
  {
    propKey: "endyear",
    propValue: { type: String },
    rx: true,
    path: ["assumptions", "scenario" + chosenScenario, "endyear"]
  },
  {
    propKey: "demandrow",
    propValue: { type: Object },
    rx: false,
    path: ["investmentprogram", "demand", "scenario" + chosenScenario]
  },
  {
    propKey: "volumedynamicrow",
    propValue: { type: Object },
    rx: false,
    path: ["investmentprogram", "volumedynamic", "scenario" + chosenScenario]
  },
  {
    propKey: "volumepermanentrow",
    propValue: { type: Object },
    rx: false,
    path: ["investmentprogram", "volumepermanent", "scenario" + chosenScenario]
  },
  {
    propKey: "scenariodynamicrentamounts",
    propValue: { type: Array },
    rx: true,
    path: ["assumptions", "rent", "scenario" + chosenScenario, "amount"]
  },
  {
    propKey: "scenariodynamicrentperiods",
    propValue: { type: Array },
    rx: true,
    path: ["assumptions", "rent", "scenario" + chosenScenario, "period"]
  },
  {
    propKey: "scenarioinvestment",
    propValue: { type: Array },
    rx: true,
    path: ["assumptions", "investments", "scenario" + chosenScenario, "initial"]
  },
  {
    propKey: "scenarioreinvestment",
    propValue: { type: Array },
    rx: true,
    path: ["assumptions", "investments", "scenario" + chosenScenario, "future"]
  },
  {
    propKey: "scenarioinflation",
    propValue: { type: Array },
    rx: true,
    path: ["assumptions", "rates", "scenario" + chosenScenario, "inflation"]
  },
  {
    propKey: "scenariodiscountrate",
    propValue: { type: Array },
    rx: true,
    path: ["assumptions", "rates", "scenario" + chosenScenario, "discount"]
  },
  {
    propKey: "scenariorent",
    propValue: { type: Array },
    rx: true,
    path: ["assumptions", "rent", "scenario" + chosenScenario, "amount"]
  },
  {
    propKey: "scenariorentperiod",
    propValue: { type: Array },
    rx: true,
    path: ["assumptions", "rent", "scenario" + chosenScenario, "period"]
  },
  {
    propKey: "scenariomaintenanceown",
    propValue: { type: Array },
    rx: true,
    path: [
      "assumptions",
      "maintenance",
      "scenario" + chosenScenario,
      "permanent"
    ]
  },
  {
    propKey: "scenariomaintenancerent",
    propValue: { type: Array },
    rx: true,
    path: ["assumptions", "maintenance", "scenario" + chosenScenario, "dynamic"]
  },
  {
    propKey: "scenariomaintenancenotused",
    propValue: { type: Array },
    rx: true,
    path: ["assumptions", "maintenance", "scenario" + chosenScenario, "notused"]
  },
  {
    propKey: "selectedpremises",
    propValue: { type: String },
    rx: true,
    path: ["menu", "selected"]
  },
  { propKey: "selected", propValue: { type: Number }, rx: true },
  { propKey: "renderdata", propValue: { type: Array }, rx: false },
  { 
    propKey: "newtable", 
    propValue: { type: Boolean }, 
    rx: true 
  },
  { propKey: "county", propValue: { type: Array }, rx: true, path: ["kth", "county"] },
  { propKey: "date", propValue: { type: Array }, rx: true, path: ["kth", "date"] },
  { propKey: "runrx", propValue: { type: Boolean }, rx: true },

];



export class XFive extends reduxmixin(props, rxmixin(props, LitElement)) {
  constructor() {
    super();
    this.renderxmain = false
    this.okToRender = false;
    this.scenario = chosenScenario;
    this.newtable = true;
    this.county = [];
    this.date = [];
    this.runrx = true;
    this.testdb = new PouchDB('http://plex:1111111111@localhost:5984/sample');
  }

  tablePagingChangedHandler() {
    // console.log('HERE')
    this.newtable = !this.newtable
  }

  gridChangedHandler(e) {
    console.log(e)
    if (e.detail.table == 0) {
      this.storeHolder.store.dispatch(
        action.kth_county_selected(e.detail.selected)
      );
    }

    if (e.detail.table == 1) {
      this.storeHolder.store.dispatch(
        action.kth_municipality_selected(e.detail.selected)
      );
    }

    if (e.detail.table == 2) {
      this.storeHolder.store.dispatch(
        action.kth_lkf_selected(e.detail.selected)
      );
    }

  }

  getCounty() {
    return !R.isEmpty(this.county) ? this.county : this.testdb.query('my_index3/by_county_count', {
      startkey: 'A',
      group_level: 1,
    }).then(res => {
      let items = res.rows.map(row => {
        return row.key
      })
      let result = items.map((item, index) => {
        return { data: item[0], id:  index,
          selected: false,
        county: item[0],
      header: item[0]}
      })
      this.storeHolder.store.dispatch(
        action.kth_county(result)
      );

      return result

    }).catch(function (err) {
      console.log(err)
    })
  }

  getDate() {
    return this.date
  }

  firstUpdated() {
    super.firstUpdated();

    // this.getCounty()
    
    
    rx.latestCombiner([
      this.county$,
    ])
      .pipe(rx.undefinedElementRemover)
      .subscribe(() => {
        getRenderData.call(this, mergeSchemas)
          .then(renderdata => {
            renderdata.forEach(prop => {
              if (prop.name == 'xmain') {
                this.xmain = prop;
              }
            })

            this.renderxmain = this.xmain
            console.log('T', this.xmain)
            this.okToRender = true;
            this.requestUpdate();
          })
      })

}

searchHandler(e) {
  console.log(e);
  let dateids;
  let countyids;
  this.testdb.query('my_index4/by_county_year', {
      // keys: ['BLEKINGE', 'GOTLAND'],
      key: ['GOTLAND', '2016'],
      // endkey: ['STOCKHOLM', '2017', {}],
      // include_docs: true,
      limit: 1000000,
      // group_level: 2,
  }).then(res => {
    dateids = res.rows.map(row => {
      return {id: row.id, rev: row.value}
    })
    console.log('DID', res.rows)

    this.testdb.bulkGet({
      docs: res.rows.map(item => {
          return {id: item.id, rev: item.value}
      }).filter((item, index) => {
          return index <= 60000
      })
  }).then(function (result) {
      // result.results.forEach(item => {
      //     console.log(item.docs)
      // })

      console.log()
      // console.log(result)


      let newres = result.results.map(item => {
        return item.docs[0].ok
      })

      let conv = d3.csvFormat(newres)

      console.log('conv', conv)
      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(conv);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'data.csv';
      hiddenElement.click();

  
    }).catch(function (err) {
      console.log(err);
    });

  //   this.testdb.query('my_index/by_municipality', {
  //     // keys: ['BLEKINGE', 'GOTLAND'],
  //     startkey: ['STOCKHOLM'],
  //     endkey: ['STOCKHOLM', {}],
  //     // include_docs: true,
  //     limit: 1000000,
  //     // group_level: 2,
  // }).then(res => {
  //   countyids = res.rows.map(row => {
  //     return {id: row.id, rev: row.value}
  //   })

  //   console.log('CID', countyids)
  //   // console.log('IID', R.intersection(dateids.map(item => item.id), countyids.map(item => item.id)))
  // })


    
    










    // let result = items.map((item, index) => {
    //   return { data: item[0], id:  index,
    //     selected: false,
    //   county: item[0],
    // header: item[0]}
    // })
    // this.storeHolder.store.dispatch(
    //   action.kth_county(result)
    // );

    // return result
   

  }).catch(function (err) {
    console.log(err)
  })
}

tableChangedHandler(e) {
    //console.log(e)
}

  scenarioChangedHandler(e) {
    chosenScenario = +e.detail.index + 1;
    page = 0
    this.scenario = chosenScenario;
    this.stateChanged(this.storeHolder.store.getState(), props);
  }

  getData(value, index) {
    return getData.call(this, value, index)
  }

  render() {
    return this.okToRender ? html`
      ${toRender.call(this, prepareRender(this.renderxmain))}
      <vaadin-button @click="${e => this.searchHandler(e)}">SÖK</vaadin-button>
        ` : html``
  }


}

customElements.define("x-five", XFive);


{/* <x-chart .props="${this.testchart}" .label="${this.label}" type="bar" class="tabletwo"></x-chart> */}



// render() {
//   return this.okToRender ? html`
//        <style>
    
//     .main {
//         display: grid;
//         grid-template-columns: repeat(12, 1fr);
//         grid-template-rows: auto 50px auto;
//         grid-column-gap: 20px;
//         grid-template-areas: 
//             ".      label    label      label    label      label    label      label    label      label    label      . "
//             ".      .          .          .         .          .        .          .        .          .        .       ."
//             ".      tableone       tableone           tableone       tableone           tableone   tabletwo      tabletwo    tabletwo      tabletwo      tabletwo         ."
            
//             ;
            
//         /* background-color: var(--color-bg); */

//         height: 100%
//     }

//     .label {
//         grid-area: label;
//         /* background-color: var(--color-bg); */
      
//         font: var(--font-mainheader);
//         color: var(--color-text, white);
//         border-bottom: 2px solid #FFFFFF; 

//         display: flex;
//         align-items: center;
//         height: 50px;                                                                                        
//     } 

//     .tabletwo {
//         grid-area: tabletwo;
//         justify-self: end;

//     }

//     .tableone {
//         grid-area: tableone;
//         justify-self: start;
        
//     }

//     .tablethree {
//         grid-area: tablethree;
//     }

//     .comment {
//         grid-area: comment;
//         justify-self: end;
//         align-self: center;
//         /* background-color: var(--colro-bg, blue); */
//         color: var(--color-text, white);
//         font: var(--font-rowcomment);
//     }   


// </style>
//     <div class="main">
//         <div class="label">Result</div>
        
//             <x-chart .props="${this.testchart}" .test=${this.renderxmain} .years=${this.period} type="bar" class="tableone"></x-chart>
            

//         <div class="comment">
//         </div>
//     </div>
//       ` : html``
// }