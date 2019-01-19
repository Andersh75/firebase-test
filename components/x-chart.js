 import {html, LitElement} from 'lit-element';
import { rxmixin } from "../mixins/rxmixin.js";
import * as R from "ramda/es/index.js";




let props = () => [
    { propKey: "value", propValue: { type: Array }, rx: false },
    { propKey: "valuedyn", propValue: { type: Array }, rx: false },
    { propKey: "valueperm", propValue: { type: Array }, rx: false },
    { propKey: "type", propValue: { type: String }, rx: false },
    { propKey: "label", propValue: { type: Array }, rx: false },
    { propKey: "props", propValue: { type: Array }, rx: false },
    { propKey: "test", propValue: { type: Array }, rx: false },
    { propKey: "years", propValue: { type: Array }, rx: false }
    
    // { propKey: "selected", propValue: { type: String }, rx: false },
    // { propKey: "label", propValue: { type: Array }, rx: false },
    // { propKey: "data", propValue: { type: String }, rx: false },
    // { propKey: "type", propValue: { type: String }, rx: false },
    // { propKey: "format", propValue: { type: Boolean }, rx: false },
    // { propKey: "readonly", propValue: { type: Boolean }, rx: false },
    // { propKey: "props", propValue: { type: Object }, rx: false }
  ];


export class XChart extends rxmixin(props, LitElement) {


    render() {
        let canvas;

        if (this.test) {
            canvas = html`<canvas id="myChart"></canvas>`;
          } else {
            canvas = html``;
          }

        return html`
        <style>
            .thediv {
                font-size: var(--parmaco-font-size-m);
                border: 1px solid var(--whcg-shade-20pct);
                border-radius: 5px 5px 4px 4px;
                background-color: var(--whcg-shade-10pct);
                ;
                ;
            }
        </style>
        <div class="thediv" style="width: ${this.offsetWidth}px; height: 400px">
            ${canvas}
        </div>
        `;
    }
    // static get properties() {
    //     return {
            // type: {
            //     type: String
            // },
            // value: {
            //     type: Object
            // },
            // width: {
            //     type: String
            // },
            // height: {
            //     type: String
            // },
            // legendposition: {
            //     type: String 
            // },

            // legendfontsize: {
            //     type: Number
            // },

            // legendfontfamily: {
            //     type: String
            // },

            // stacked: {
            //     type: Boolean
            // }
    //     }
    // }


    constructor() {
        super();
        // this.width = '200px';
        // this.height = '200px';
        this.legendposition = 'bottom';
        this.legendfontsize = 14;
        this.legendfontfamily = 'Arial';
        this.stacked = false;

    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('resize', (event) => {
            this.shadowRoot.querySelector('.thediv').style.width = `${this.offsetWidth}px`;
            this.test = [...this.test];
          });
    }

    updated(changedProps) {
        super.updated(changedProps);
        // if (changedProps.has('value')) {
        //     //console.log('Chart updated: value!!!!')
        //     //console.log(this.value)
        //     this._chartJs(this.value);
        // }
        // if (changedProps.has('valuedyn')) {
        //     //console.log('Chart updated: valuedynam!!!!')
        //     //console.log(this.valuedyn)
        //     this._chartJs(this.valuedyn);
        // }
        // if (changedProps.has('valueperm')) {
        //     //console.log('Chart updated: valueperm!!!!')
        //     //console.log(this.valueperm)
        //     this._chartJs(this.valueperm);
        // }
        if (changedProps.has('props')) {
            this._chartJs(this.props);
        }

        if (changedProps.has('value')) {
            //console.log('Chart updated: valueperm!!!!')
            //console.log(this.valueperm)
            this._chartJs(this.value);
        }

        if (changedProps.has('test')) {
            let years = this.test[0].json_schema[1].data_schema
            let title = this.test[0].json_schema[0].data_schema
            let data = [];
            data = this.test[1].json_schema.map(schema => {
                return {data: schema.json_schema[1].data_schema,
                label: schema.json_schema[0].data_schema}
            })
            this._chartJs({years: years, data: data, title: title});
        }
        
    }



    _chartJs(data) {
        var ctx = this.shadowRoot.querySelector('#myChart');
        var fill = true;

        if (this.thechart != null) {
            this.thechart.destroy();
        }
        if (this.type == 'line') {
            fill = false;
        }

    
        // let areadata = {
        //     // labels: this.label,
        //     labels: ["Passed"],
        //     datasets: [{
        //         label: 'Utv av efterfrågan',
        //         data: this.props[0],
        //         borderColor: [
        //             'hsla(360, 100%, 100%, 1)'
        //         ],
        //         borderWidth: 2,
        //         type: 'line',
        //         fill: false,
        //         showLine: true,
        //         spanGaps: false
        //     },
        //     {
        //         label: 'Hyrda lokaler',
        //         data: this.props[1],
        //         backgroundColor: 'hsla(75, 30%, 33%, 1)',
        //         borderColor: 'hsla(360, 100%, 100%, 1)',
               
        //         borderWidth: 1,
        //         fill: fill
        //     },
        //     {
        //         label: 'Egna lokaler',
        //         data: this.props[2],
        //         backgroundColor: 'hsla(275, 30%, 33%, 1)',
        //         borderColor: 'hsla(360, 100%, 100%, 1)',
               
        //         borderWidth: 1,
        //         fill: fill
        //     }
        //     ]
        // }

        // let costdata = {
        //     // labels: this.label,
        //     labels: ["Passed"],
        //     datasets: [{
        //         label: 'Aggregerade diskonterade kostnader för hyrda lokaler',
        //         data: this.props[0],
        //         backgroundColor: 'hsla(275, 30%, 33%, 1)',
        //         borderColor: 'hsla(360, 100%, 100%, 1)',
        //         borderWidth: 1,
        //         fill: fill,
        //         // showLine: true,
        //         // spanGaps: false
        //     },
        //     {
        //         label: 'Aggregerade diskonterade kostnader för ägda lokaler',
        //         data: this.props[1],
        //         backgroundColor: 'hsla(75, 30%, 33%, 1)',
        //         borderColor: 'hsla(360, 100%, 100%, 1)',
        //         borderWidth: 1,
        //         fill: fill
        //     },
        //     ]
        // }
        
        this.thechart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.years,
                datasets: data.data.map((data, index) => {
                    return {
                        label: data.label,
                        data: data.data,
                        fill: false,
                        showLine: true,
                        spanGaps: false,
                        backgroundColor: [
                            `rgba(${255 * 1 / (+index + 1)}, 99, 132, ${0.2 * (+index + 1)})`,
                            // `rgba(54, 162, 235, ${0.2 * (+index + 1)})`,
                            // `rgba(255, 206, 86, ${0.2 * (+index + 1)})`,
                            // `rgba(75, 192, 192, ${0.2 * (+index + 1)})`,
                            // `rgba(153, 102, 255, ${0.2 * (+index + 1)})`,
                            // `rgba(255, 159, 64, ${0.2 * (+index + 1)})`
                        ],
                        borderColor: [
                            `rgba(${255}, ${50 * (+index * 2 + 1)}, ${0 * 2 / (+index + 1)}, 1)`,
                            // `rgba(54, 162, 235, 1)`,
                            // `rgba(255, 206, 86, 1)`,
                            // `rgba(75, 192, 192, 1)`,
                            // `rgba(153, 102, 255, 1)`,
                            // `rgba(255, 159, 64, 1)`
                        ],
                        borderWidth: 2
                    }
                })
            },
            options: {
                title: {
                    display: true,
                    text: data.title,
                    fontFamily: "'Exo 2', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    fontColor: '#FFFFFF',
                    fontSize: this.offsetWidth / 45,
                    fontStyle: 'normal',
                    padding: 30
                },
                layout: {
                    padding: {
                        left: 20,
                        right: 30,
                        top: 0,
                        bottom: 10
                    },
                },
                legend: {
                    position: this.legendposition,
                    labels: {
                        fontFamily: "'Exo 2', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                        fontColor: '#FFFFFF',
                        fontSize: this.offsetWidth / 60,
                        boxWidth: this.offsetWidth / 50
                    }
                },
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                fontFamily: "'Exo 2', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                                fontColor: '#FFFFFF',
                                fontSize: this.offsetWidth / 60
                            },
                            gridLines: {
                            }
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                fontFamily: "'Exo 2', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                                fontColor: '#FFFFFF',
                                fontSize: this.offsetWidth / 60,
                            },
                            gridLines: {
                            }
                        }
                    ]
                }
            }
        });

        // this.thechart = new Chart(ctx, {
        //     type: this.type,
        //     data: data,

        //     options: {
        //         legend: {
        //             position: this.legendposition,
        //             labels: {
        //                 fontFamily: "'Exo 2', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        //                 fontColor: '#FFFFFF',
        //                 fontSize: 14,
        //                 boxWidth: 14
        //             }
        //         },
        //         scales: {
        //             yAxes: [{
        //                 ticks: {
        //                     beginAtZero:true
        //                 }
        //             }],
        //             yAxes: [{
        //                 ticks: {
        //                     fontFamily: "'Exo 2', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        //                     fontColor: '#FFFFFF',
        //                     fontSize: 14
        //                 },
        //                 gridLines: {
        //                 }
        //             }],
        //             xAxes: [{
        //                 ticks: {
        //                     fontFamily: "'Exo 2', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        //                     fontColor: '#FFFFFF',
        //                     fontSize: 14
        //                 },
        //                 gridLines: {
        //                 }
        //             }]
        //         },
        //         responsive: true,
        //         maintainAspectRatio: false,
        //         layout: {
        //             padding: {
        //                 left: 15,
        //                 right: 15,
        //                 top: 50,
        //                 bottom: 20
        //             }
        //         }
        //     }
        // });



    }


}

window.customElements.define('x-chart', XChart);


// canvas = html`<canvas id="myChart" height="300" width="750"></canvas>`;


{/* <div class="thediv">
${canvas}
</div> */}