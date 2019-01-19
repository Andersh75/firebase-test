import { html, LitElement } from "lit-element";
import { action } from "../redux/actions.js";
import * as R from "ramda/es/index.js";
import {
  rx,
  getRenderData,
  getPeriodArray,
  arrayAggregator,
  getData,
  toRender,
  prepareRender,
  arrayAdder
} from "../utils/whcg-functions.js";
import { rxmixin } from "../mixins/rxmixin.js";
import { reduxmixin } from "../mixins/reduxmixin.js";
import { twoMainTablesSchemas } from "../schemas/x-two-main-schemas.js";
import { twoMainHeaderSchemas } from "../schemas/x-main-header-schemas.js";
import { twoSubheaderSchemas } from "../schemas/x-subheader-schemas.js";
import '../components/x-main.js';
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
            subheader: twoSubheaderSchemas.call(this).ui_schema,
          header: twoMainHeaderSchemas.call(this).ui_schema,
          main: twoMainTablesSchemas.call(this).ui_schema,
          }
          
      },
      json_schema: {
          type: 'Object',
          properties: {
              xmain: {
                  type: 'Object',
                  properties: {
                    subheader: twoSubheaderSchemas.call(this).json_schema,
                    header: twoMainHeaderSchemas.call(this).json_schema,
                    main: twoMainTablesSchemas.call(this).json_schema,
                  }
              }
          }
      },
      data_schema: {
        xmain: {
          subheader: twoSubheaderSchemas.call(this).data_schema,
        header: twoMainHeaderSchemas.call(this).data_schema,
        main: twoMainTablesSchemas.call(this).data_schema,
        }
        
      }
  }
}


let props = () => [
  { 
    propKey: "data", 
    propValue: { type: Array }, 
    rx: false 
  },
  {
    propKey: "scenario",
    propValue: { type: String },
    rx: true,
  },
  {
    propKey: "startyear",
    propValue: { type: String },
    rx: true,
    path: ["assumptions", "startyear"]
  },
  {
    propKey: "endyear",
    propValue: { type: Array },
    rx: true,
    path: ["assumptions", "scenario" + chosenScenario, "endyear"]
  },
  {
    propKey: "demandrow",
    propValue: { type: Object },
    rx: true,
    path: ["investmentprogram", "demand", "scenario" + chosenScenario]
  },
  {
    propKey: "volumedynamicrow",
    propValue: { type: Object },
    rx: true,
    path: ["investmentprogram", "volumedynamic", "scenario" + chosenScenario]
  },
  {
    propKey: "volumepermanentrow",
    propValue: { type: Object },
    rx: true,
    path: ["investmentprogram", "volumepermanent", "scenario" + chosenScenario]
  },
  { 
    propKey: "renderdata", 
    propValue: { type: Array }, 
    rx: false 
  },
];



export class XTwo extends reduxmixin(props, rxmixin(props, LitElement)) {
  constructor() {
    super();
    this.renderxmain = false
    this.okToRender = false;
    this.scenario = chosenScenario;
  }

  getData(value, index) {
    return getData.call(this, value, index)
  }

  scenarioChangedHandler(e) {
    chosenScenario = +e.detail.index + 1;
    this.scenario = chosenScenario;
    this.stateChanged(this.storeHolder.store.getState(), props);
  }



  tableChangedHandler(e) {
    let column = e.detail.column;
    let row = e.detail.row;
    let value = e.detail.value;
    let year = +this.startyear + +column;

    if (row == 0) {
      this.storeHolder.store.dispatch(
        action.investmentprogram_demand({
          key: year,
          value: value,
          years: getPeriodArray(this.startyear, this.endyear)
        })
      );
    }

    if (row == 1) {
      this.storeHolder.store.dispatch(
        action.investmentprogram_volumedynamic({
          key: year,
          value: value,
          years: getPeriodArray(this.startyear, this.endyear)
        })
      );
    }

    if (row == 2) {
      this.storeHolder.store.dispatch(
        action.investmentprogram_volumepermanent({
          key: year,
          value: value,
          years: getPeriodArray(this.startyear, this.endyear)
        })
      );
    }
  }

  firstUpdated() {
    super.firstUpdated();
    rx.latestCombiner([
      this.startyear$,
      this.endyear$,
      this.demandrow$,
      this.volumepermanentrow$,
      this.volumedynamicrow$,
      this.scenario$,
      // this.rentperiod$
    ])
      .pipe(rx.undefinedElementRemover)
      .subscribe(() => {
        this.period = getPeriodArray(this.startyear, this.endyear)
        // this.period = this.rentperiod

        // this.storeHolder.store.dispatch(
        //   action.assumptions_endyear({
        //     endyear: (
        //       arrayAdder(this.rentperiod) +
        //       +this.startyear -
        //       1
        //     ).toString(),
        //     startyear: this.startyear,
        //     scenario: chosenScenario
        //   })
        // );

        this.dataArray = ["demandrow", "volumedynamicrow", "volumepermanentrow"]
          .map(item => this[item])
          .map(item => Object.values(item));

        this.aggregateDataArr = this.dataArray.map(arrayAggregator);

        getRenderData.call(this, mergeSchemas)
          .then(renderdata => {
            renderdata.forEach(prop => {
              if (prop.name == 'xmain') {
                this.xmain = prop;
              }
            })

            this.renderxmain = this.xmain
            this.okToRender = true;
            this.requestUpdate();
          });
      })
  }

  render() {
    return this.okToRender ? html`
      ${toRender.call(this, prepareRender(this.renderxmain))}
        ` : html``
  }
}

customElements.define("x-two", XTwo);