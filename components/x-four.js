import { html, LitElement } from "lit-element";
import * as R from "ramda/es/index.js";
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
import { fourHeaderSchemas } from "../schemas/x-main-header-schemas.js";
import { fourSubheaderSchemas } from "../schemas/x-subheader-schemas.js";
import '../components/x-main.js';
import '../components/x-chart.js';
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
      main: fourMainSchemas.call(this).ui_schema
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
        main: fourMainSchemas.call(this).json_schema
                  }
              }
          }
      },
      data_schema: {
        xmain: {
          subheader: fourSubheaderSchemas.call(this).data_schema,
      header: fourHeaderSchemas.call(this).data_schema,
      main: fourMainSchemas.call(this).data_schema
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
];



export class XFour extends reduxmixin(props, rxmixin(props, LitElement)) {
  constructor() {
    super();
    this.renderxmain = false
    this.okToRender = false;
    this.scenario = chosenScenario;
    this.newtable = true
  }

  tablePagingChangedHandler() {
    console.log('HERE')
    this.newtable = !this.newtable
  }

  firstUpdated() {
    super.firstUpdated();
    
    
    rx.latestCombiner([
      this.startyear$,
      this.endyear$,
      this.scenario$,
      this.newtable$
    ])
      .pipe(rx.undefinedElementRemover)
      .subscribe(() => {

          function rangeFromPeriod(period) {
              return R.range(0, +period);
            }
          
            let rentRealPriceArray = R.flatten([
              ...this.scenariodynamicrentperiods
                .map(rangeFromPeriod)
                .map((arr, index) => {
                  return arr.map(year => {
                    return this.scenariodynamicrentamounts[index];
                  });
                })
            ]);


          this.dataArray = ["demandrow", "volumedynamicrow", "volumepermanentrow"]
            .map(item => this[item])
            .map(item => Object.values(item));
  
          this.aggregateDataArr = this.dataArray.map(arrayAggregator);
        
          

          this.period = getPeriodArray(this.startyear, this.endyear)

          this.dynamicRentCosts = getRealCostArray.call(this, 
              {
                name: "dynamicrentcosts",
                type: "dynamic",
                method: "annual",
                space: "volumedynamicrow",
                discountRate: "scenariodiscountrate",
              }, rentRealPriceArray
            )

            this.discountedDynamicRentCosts = getDiscountedRealCostArray.call(this, 
              {
                name: "dynamicrentcosts",
                type: "dynamic",
                method: "annual",
                space: "volumedynamicrow",
                discountRate: "scenariodiscountrate",
              }, rentRealPriceArray
            )
            this.aggregatedDiscountedDynamicRentCosts = arrayAggregator(this.discountedDynamicRentCosts);
    



          this.dynamicMaintenanceCosts = createNominalAggregatedCostArray.call(this, 
              {
                name: "scenariomaintenancerent",
                type: "dynamic",
                method: "annual",
                space: "volumedynamicrow",
                growthRate: "scenarioinflation",
                discountRate: "scenariodiscountrate",
                period: "period"
              }
            )

            this.discountedDynamicMaintenanceCosts = createDiscountedNominalAggregatedCostArray.call(this,
              {
                name: "scenariomaintenancerent",
                type: "dynamic",
                method: "annual",
                space: "volumedynamicrow",
                growthRate: "scenarioinflation",
                discountRate: "scenariodiscountrate",
                period: "period"
              }
            )

            this.aggregatedDiscountedDynamicMaintenanceCosts = arrayAggregator(this.discountedDynamicMaintenanceCosts);




            this.permanentMaintenanceCosts = createNominalAggregatedCostArray.call(this, 
              {
                name: "scenariomaintenanceown",
                type: "permanent",
                method: "annual",
                space: "volumepermanentrow",
                growthRate: "scenarioinflation",
                discountRate: "scenariodiscountrate",
                period: "period"
              }
            )
          this.discountedPermanentMaintenanceCosts = createDiscountedNominalAggregatedCostArray.call(this,
            {
              name: "scenariomaintenanceown",
              type: "permanent",
              method: "annual",
              space: "volumepermanentrow",
              growthRate: "scenarioinflation",
              discountRate: "scenariodiscountrate",
              period: "period"
            }
          )
          this.aggregatedDiscountedPermanentMaintenanceCosts = arrayAggregator(this.discountedPermanentMaintenanceCosts);
  



          this.permanentInvestmentCosts = 
          createPositiveOnlyNominalCostArray.call(this, 
            {
              name: "scenarioinvestment",
              type: "permanent",
              method: "single",
              space: "volumepermanentrow",
              growthRate: "scenarioinflation",
              discountRate: "scenariodiscountrate",
              period: "period"
            }
          )
          this.discountedPermanentInvestmentCosts = createDiscountedPositiveOnlyNominalCostArray.call(this, 
            {
              name: "scenarioinvestment",
              type: "permanent",
              method: "single",
              space: "volumepermanentrow",
              growthRate: "scenarioinflation",
              discountRate: "scenariodiscountrate",
              period: "period"
            }
          )
          this.aggregatedDiscountedPermanentInvestmentCosts = arrayAggregator(this.discountedPermanentInvestmentCosts);

          


          this.permanentReinvestmentCosts = 
          createDepreciationArray.call(this, 
            {
              name: "scenarioreinvestment",
              investment: "scenarioinvestment",
              type: "permanent",
              method: "percentage",
              space: "volumepermanentrow",
              growthRate: "scenarioinflation",
              discountRate: "scenariodiscountrate",
              period: "period"
            }
          )
        this.discountedPermanentReinvestmentCosts = createDiscountedDepreciationArray.call(this, 
          {
            name: "scenarioreinvestment",
            investment: "scenarioinvestment",
            type: "permanent",
            method: "percentage",
            space: "volumepermanentrow",
            growthRate: "scenarioinflation",
            discountRate: "scenariodiscountrate",
            period: "period"
          }
        )
        this.aggregatedDiscountedPermanentReinvestmentCosts = arrayAggregator(this.discountedPermanentReinvestmentCosts);

        

        this.sippedpermanentCost = addArraysAndSip(
          [
            this.permanentMaintenanceCosts,
            this.permanentInvestmentCosts,
            this.permanentReinvestmentCosts
          ]
        );

        this.sippeddynamicCost = addArraysAndSip(
          [
            this.dynamicMaintenanceCosts,
            this.dynamicRentCosts
          ]
        );
        
        this.sippeddiscountedpermanentCost = addArraysAndSip(
          [
            this.discountedPermanentMaintenanceCosts,
            this.discountedPermanentInvestmentCosts,
            this.discountedPermanentReinvestmentCosts
          ]
        );

        this.sippeddiscounteddynamicCost = addArraysAndSip(
          [
            this.discountedDynamicMaintenanceCosts,
            this.discountedDynamicRentCosts
          ]
        );


        this.sippedaggregateddiscountedpermanentCost = addArraysAndSip(
          [
            this.aggregatedDiscountedPermanentMaintenanceCosts,
            this.aggregatedDiscountedPermanentInvestmentCosts,
            this.aggregatedDiscountedPermanentReinvestmentCosts
          ]
        );
        

        this.sippedaggregateddiscounteddynamicCost = addArraysAndSip(
          [
            this.aggregatedDiscountedDynamicMaintenanceCosts,
            this.aggregatedDiscountedDynamicRentCosts,
          ]
        );


        this.sippedaggregateddiscountedDiffCost = R.zip(this.sippedaggregateddiscountedpermanentCost, this.sippedaggregateddiscounteddynamicCost).map(item => {
          return +item[0] - +item[1]
        })

        getRenderData.call(this, mergeSchemas)
          .then(renderdata => {
            renderdata.forEach(prop => {
              if (prop.name == 'xmain') {
                this.xmain = prop;
              }
            })

            this.renderxmain = this.xmain



            let years = this.period;
            this.label = years;

            this.chartdemand = this.sippedaggregateddiscounteddynamicCost

            this.chartvaldynamic = this.sippedaggregateddiscountedpermanentCost

            this.chartvalpermanent = this.sippeddiscounteddynamicCost

            this.costChartArrays = [this.sippeddiscountedpermanentCost, this.sippedaggregateddiscountedpermanentCost]

            // this.areaChartArrays = this.aggregateDataArr.map(item => {
            //     return item.map(item => {
            //         return item[result[2]]
            //     })
            // })


            this.testchart = this.chartvalpermanent




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

  getData(value, index) {
    return getData.call(this, value, index)
  }

  render() {
    return this.okToRender ? html`
      ${toRender.call(this, prepareRender(this.renderxmain))}
        ` : html``
  }


}

customElements.define("x-four", XFour);


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