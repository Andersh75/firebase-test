import { html, LitElement } from "lit-element";
import { action } from "../redux/actions.js";
import {
  rx,
  getData,
  toRender,
  prepareRender,
  getRenderData,
} from "../utils/whcg-functions.js";
import { rxmixin } from "../mixins/rxmixin.js";
import { reduxmixin } from "../mixins/reduxmixin.js";
import { fiveMainSchemas } from "../schemas/x-five-main-schemas.js";
import { fourHeaderSchemas } from "../schemas/x-main-header-schemas.js";
import { fourSubheaderSchemas } from "../schemas/x-subheader-schemas.js";
import '../components/x-main.js';
import '../components/x-chart.js';
import '@vaadin/vaadin-select';
import PouchDB from 'pouchdb/dist/pouchdb.js';
import Auth from 'pouchdb-authentication/dist/pouchdb.authentication.js';

// // import PouchDB from 'pouchdb/dist/pouchdb.js';
// import Find from 'pouchdb/dist/pouchdb.find.js';
// PouchDB.plugin(Find)

;


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
  { propKey: "runrx", propValue: { type: Boolean }, rx: true },
  { propKey: "county", propValue: { type: Array }, rx: true, path: ["kth", "county"] },
  { propKey: "municipality", propValue: { type: Array }, rx: true, path: ["kth", "municipality"] },
  { propKey: "lkf", propValue: { type: Array }, rx: true, path: ["kth", "lkf"] }
];


export class XFive extends reduxmixin(props, rxmixin(props, LitElement)) {
  constructor() {
    super();
    this.renderxmain = false
    this.okToRender = false;
    this.runrx = true;
    // this.county = [];
    // this.municipality = [];
    this.testdb = new PouchDB('http://plex:1111111111@localhost:5984/sample');
  }

//   updated(changedProperties) {
//     super.updated(changedProperties)
//     changedProperties.forEach((oldValue, propName) => {
//         console.log(propName)
//         if (propName === "county") {
//           console.log('UPDATED', this.county)
//         };
//     });
// }

  firstUpdated() {
    super.firstUpdated();
    
    
    rx.latestCombiner([
      this.county$,
      this.municipality$,
      this.lkf$
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

tableChangedHandler(e) {
    //console.log(e)
}

  scenarioChangedHandler(e) {
    chosenScenario = +e.detail.index + 1;
    this.scenario = chosenScenario;
    this.stateChanged(this.storeHolder.store.getState(), props);
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

  getData(value, index) {
    return getData.call(this, value, index)
  }

  // getCounty() {
  //   return !R.isEmpty(this.county) ? this.county : this.testdb.query('my_index/by_municipality', {
  //     startkey: 'A',
  //     group_level: 1,
  //   }).then(res => {
  //     let items = res.rows.map(row => {
  //       return row.key
  //     })
  //     let result = items.map((item, index) => {
  //       return { data: item[0], id:  index,
  //         selected: false,
  //       county: item[0],
  //     header: item[0]}
  //     })
  //     this.storeHolder.store.dispatch(
  //       action.kth_county(result)
  //     );

  //     return result

  //   }).catch(function (err) {
  //     console.log(err)
  //   })
  // }

  // getMunicipality() {
  //   // if (!R.isEmpty(this.municipality)) {
  //     console.log('MUNI', this.municipality)
  //     console.log('COUNT', this.county)

  //     let countyArray = this.county.filter(item => {
  //       return item.selected
  //     }).map(item => {
  //       return item.county
  //     })
  //     console.log(countyArray)
  //   if (!true) {
  //     return this.municipality
  //   } else {
  //     return Promise.all(this.county.filter(item => {
  //       return item.selected == true
  //     }).map((item, outerindex) => {
  //       return this.testdb.query('my_index/by_municipality', {
  //         startkey: [item.data],
  //         endkey: [item.data, {}],
  //         group_level: 2,
  //       }).then(res => {
  //         let items = res.rows.map(row => {
  //           return row.key
  //         })
  //         let result = items.map((element, index) => {
  //           let selected = false;
  //           this.municipality.forEach(muni => {
  //             if (muni.id == item.id + '-' +index) {
  //               selected = muni.selected
  //             }
  //           })

  //           return { data: item.data + ' - ' + element[1],
  //             id:  item.id + '-' +index,
  //             selected: selected,
  //             county: item.data,
  //             municipality: element[1] }
  //         })
  //         return result
    
  //       }).catch(function (err) {
  //         console.log(err)
  //       })
  //     }) 
  //     ).then(result => {
  //       this.storeHolder.store.dispatch(
  //         action.kth_municipality(R.flatten(result))
  //       );

  //       console.log('RRR', result)


  //       return result.map(item => {
  //         return {
  //           rows: item
  //         }
  //       })
  //       // return R.flatten(result);

  //     })}
  // }

  // getLKF() {
  //   // if (!R.isEmpty(this.municipality)) {
  //     console.log('LKF', this.lkf)
  //   if (!true) {
  //     return this.lkf
  //   } else {
  //     console.log('INSIDE', this.municipality)
  //     return Promise.all(this.municipality.filter(item => {
  //       return item.selected == true
  //     }).map((item, outerindex) => {
  //       return this.testdb.query('my_index/by_lkf', {
  //         startkey: [item.municipality],
  //         endkey: [item.municipality, {}],
  //         group_level: 2,
  //       }).then(res => {
          
  //         let items = res.rows.map(row => {
  //           return row.key
  //         })

          
  //         let result = items.map((element, index) => {
  //           let selected = false;
  //           this.lkf.forEach(lkf => {
  //             if (lkf.id == item.id + '-' +index) {
  //               selected = lkf.selected
  //             }
  //           })

  //           return { data: item.municipality + ' - ' + element[1],
  //             id:  item.id + '-' +index,
  //             selected: selected,
  //             municipality: item.municipality }
  //         })
  //         return result
    
  //       }).catch(function (err) {
  //         console.log(err)
  //       })
  //     }) 
  //     ).then(result => {
  //       this.storeHolder.store.dispatch(
  //         action.kth_lkf(R.flatten(result))
  //       );
  //       return R.flatten(result);
  //     })}
  // }



  // getStreet() {
  //   return this.testdb.query('my_index/by_municipality', {
  //     startkey: 'A',
  //     group_level: 4,
  //   }).then(res => {
  //     let items = res.rows.map(row => {
  //       return row.key
  //     })
  //     return items.map((item, index) => {
  //       return { data: item[3],
  //         id:  index,
  //         selected: true }
  //     })

  //   }).catch(function (err) {
  //     console.log(err)
  //   })
  // }

  render() {
    return this.okToRender ? html`
      ${toRender.call(this, prepareRender(this.renderxmain))}
        ` : html``
  }


}

customElements.define("x-five", XFive);