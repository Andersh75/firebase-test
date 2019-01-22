import { html, LitElement } from "lit-element";
import "./x-main-header.js";
import { action } from "../redux/actions.js";
import { rx, getRenderData, toRender, getData, arrayAdder, prepareRender } from "../utils/whcg-functions.js";
import { rxmixin } from "../mixins/rxmixin.js";
import { reduxmixin } from "../mixins/reduxmixin.js";
import { oneMainTablesschemas } from "../schemas/x-one-table-schemas.js";
import { oneMainHeaderSchemas } from "../schemas/x-main-header-schemas.js";
import { oneSubheaderSchemas } from "../schemas/x-subheader-schemas.js";
import '../components/x-main.js';
import * as R from "ramda/es/index.js";


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
            subheader: oneSubheaderSchemas.call(this).ui_schema,
            header: oneMainHeaderSchemas.call(this).ui_schema,
            main: oneMainTablesschemas.call(this).ui_schema,
          }
          
      },
      json_schema: {
          type: 'Object',
          properties: {
              xmain: {
                  type: 'Object',
                  properties: {
                      subheader: oneSubheaderSchemas.call(this).json_schema,
                      header: oneMainHeaderSchemas.call(this).json_schema,
                      main: oneMainTablesschemas.call(this).json_schema,
                  }
              }
          }
      },
      data_schema: {
        xmain: {
          subheader: oneSubheaderSchemas.call(this).data_schema,
          header: oneMainHeaderSchemas.call(this).data_schema,
          main: oneMainTablesschemas.call(this).data_schema,
        }
        
      }
  }
}

let props = () => [
  {
    propKey: "startyear",
    propValue: { type: String },
    rx: true,
    path: ["assumptions", "startyear"]
  },
  {
    propKey: "scenario",
    propValue: { type: String },
    rx: true,
  },
  {
    propKey: "investment",
    propValue: { type: Array },
    rx: true,
    path: ["assumptions", "investments", "scenario" + chosenScenario, "initial"]
  },
  {
    propKey: "reinvestment",
    propValue: { type: Array },
    rx: true,
    path: ["assumptions", "investments", "scenario" + chosenScenario, "future"]
  },
  {
    propKey: "inflation",
    propValue: { type: Array },
    rx: true,
    path: ["assumptions", "rates", "scenario" + chosenScenario, "inflation"]
  },
  {
    propKey: "discount",
    propValue: { type: Array },
    rx: true,
    path: ["assumptions", "rates", "scenario" + chosenScenario, "discount"]
  },
  {
    propKey: "rentamount",
    propValue: { type: Array },
    rx: true,
    path: ["assumptions", "rent", "scenario" + chosenScenario, "amount"]
  },
  {
    propKey: "rentperiod",
    propValue: { type: Array },
    rx: true,
    path: ["assumptions", "rent", "scenario" + chosenScenario, "period"]
  },
  {
    propKey: "maintenanceown",
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
    propKey: "maintenancerent",
    propValue: { type: Array },
    rx: true,
    path: ["assumptions", "maintenance", "scenario" + chosenScenario, "dynamic"]
  },
  {
    propKey: "maintenancenotused",
    propValue: { type: Array },
    rx: true,
    path: ["assumptions", "maintenance", "scenario" + chosenScenario, "notused"]
  },
  { propKey: "okToRender", propValue: { type: Boolean }, rx: false },
  { propKey: "periods", propValue: { type: Array }, rx: false },
  { propKey: "amounts", propValue: { type: Array }, rx: false }
];

export class XOne extends reduxmixin(props, rxmixin(props, LitElement)) {
  constructor() {
    super();
    this.renderxmain = false
    this.okToRender = false;
    this.prevState = {};
    this.amounts = [];
    this.periods = [];
    this.scenario = chosenScenario;
  }

  getData(value, index) {
    return getData.call(this, value, index)
  }

  scenarioChangedHandler(e) {
    // console.log(e)
    chosenScenario = +e.detail.index + 1;
    this.scenario = chosenScenario;
    // console.log(chosenScenario)
    this.stateChanged(this.storeHolder.store.getState(), props);
  }

  addRowChangedHandler(e) {
    this.storeHolder.store.dispatch(
      action.assumptions_rent_add({
        index: e.detail.row,
        scenario: chosenScenario
      })
    );
  }

  removeRowChangedHandler(e) {
    this.storeHolder.store.dispatch(
      action.assumptions_rent_remove({
        index: e.detail.row,
        scenario: chosenScenario
      })
    );
  }

  rowChangedHandler(e, index) {
    let group = e.detail.table;

    if (group == 0) {
      if (e.detail.row == 0) {
        this.storeHolder.store.dispatch(
          action.assumptions_investments_future({
            value: e.detail.value,
            scenario: chosenScenario
          })
        );
      }
      if (e.detail.row == 1) {
        this.storeHolder.store.dispatch(
          action.assumptions_investments_initial({
            value: e.detail.value,
            scenario: chosenScenario
          })
        );
      }
    }

    if (group == 1) {
      if (e.detail.row % 2 === 0) {
        this.storeHolder.store.dispatch(
          action.assumptions_rent_amount({
            value: e.detail.value,
            index: chosenScenario,
            scenario: chosenScenario,
            item: math.floor(Number(e.detail.row) / 2),
            order: math.floor(Number(e.detail.row) / 2)
          })
        );
      }
      if (e.detail.row % 2 === 1) {
        this.storeHolder.store.dispatch(
          action.assumptions_rent_period({
            value: e.detail.value,
            index: chosenScenario,
            scenario: chosenScenario,
            item: math.floor(Number(e.detail.row) / 2),
            order: math.floor(Number(e.detail.row) / 2)
          })
        );
      }
    }

    if (group == 2) {
      if (e.detail.row == 0) {
        this.storeHolder.store.dispatch(
          action.assumptions_maintenance_permanent({
            value: e.detail.value,
            scenario: chosenScenario
          })
        );
      }
      if (e.detail.row == 1) {
        this.storeHolder.store.dispatch(
          action.assumptions_maintenance_dynamic({
            value: e.detail.value,
            scenario: chosenScenario
          })
        );
      }
      if (e.detail.row == 2) {
        this.storeHolder.store.dispatch(
          action.assumptions_maintenance_notused({
            value: e.detail.value,
            scenario: chosenScenario
          })
        );
      }
    }

    if (group == 3) {
      if (e.detail.row == 0) {
        this.storeHolder.store.dispatch(
          action.assumptions_rates_inflation({ value: e.detail.value })
        );
      }
      if (e.detail.row == 1) {
        this.storeHolder.store.dispatch(
          action.assumptions_rates_discount({ value: e.detail.value })
        );
      }
    }
  }



  firstUpdated() {
    super.firstUpdated();

    rx.latestCombiner([
      this.rentamount$,
      this.rentperiod$,
      this.maintenanceown$,
      this.maintenancerent$,
      this.maintenancenotused$,
      this.inflation$,
      this.discount$,
      this.investment$,
      this.reinvestment$,
      this.scenario$
    ])
      .pipe(rx.undefinedElementRemover)
      .subscribe(() => {
        this.amounts = this.rentamount.map(item => {
          return {
            label: "Hyreskostnader SEK / kvm / år",
            data: item,
            button: false,
            comment:
              "Hyreskostnad per kvadratmeter per år av dynamiska lokaler. Informationen ska baseras på prisnivån av startåret."
          };
        });

        this.periods = this.rentperiod.map(item => {
          return {
            label: "Avtalslängd, antal år",
            data: item,
            button: false,
            comment: ""
          };
        });

        this.storeHolder.store.dispatch(
          action.assumptions_endyear({
            endyear: (
              arrayAdder(this.rentperiod) +
              +this.startyear -
              1
            ).toString(),
            startyear: this.startyear,
            scenario: chosenScenario
          })
        );

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
        })
      });
  }

  render() {
    return this.okToRender ? html`
      ${toRender.call(this, prepareRender(this.renderxmain))}
        ` : html``
  }
}

customElements.define("x-one", XOne);