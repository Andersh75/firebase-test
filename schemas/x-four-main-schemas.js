import "../components/x-table.js";
import "../components/x-table-row.js";
import "../components/x-input.js";
import * as R from "ramda/es/index.js";

let ui_ref_header = {
    ui_widget: "x-table-row",
    ui_order: [
        "label",
        "data"
    ],
    label: {
        // ui_widget: "x-table-row-label",
        ui_options:  {
            format: false,
            readonly: true,
            nottabable: true,
            color: 'header',
        },
    },
    data: {
        ui_widget: "x-input",
        ui_options:  {
            format: false,
            readonly: true,
            nottabable: true,
            color: 'none',
        },
    }
}


let ui_ref_rows = {
    ui_widget: "x-table-row",
    ui_order: [
        "label",
        "data"
    ],
    label: {
        // ui_widget: "x-table-row-label",
        ui_options:  {
            format: true,
            readonly: true,
            nottabable: true,
            color: 'white',
        },
    },
    data: {
        ui_widget: "x-input",
        ui_options:  {
            format: true,
            readonly: true,
            nottabable: true,
            color: 'attention'
        },
    }
}

let ui_ref_tableone_rows = {
    ui_widget: "x-table-row",
    ui_order: [
        "label",
        "data"
    ],
    label: {
        // ui_widget: "x-table-row-label",
        ui_options:  {
            format: true,
            readonly: true,
            nottabable: true,
            color: 'white',
        },
    },
    data: {
        ui_widget: "x-input",
        ui_options:  {
            format: true,
            readonly: true,
            nottabable: true,
            color: 'attention'
        },
    }
}

let ui_ref_tabletwo_rows = {
    ui_widget: "x-table-row",
    ui_order: [
        "label",
        "data"
    ],
    label: {
        // ui_widget: "x-table-row-label",
        ui_options:  {
            format: true,
            readonly: true,
            nottabable: true,
            color: 'white',
        },
    },
    data: {
        ui_widget: "x-input",
        ui_options:  {
            format: true,
            readonly: true,
            nottabable: true,
            amount: 'tkr',
            color: 'attention'
        },
    }
}

let ui_ref_tablechartone_rows = {
    ui_widget: "x-table-row",
    ui_order: [
        "label",
        "data"
    ],
    label: {
        // ui_widget: "x-table-row-label",
        ui_options:  {
            format: true,
            readonly: true,
            nottabable: true,
            color: 'white',
        },
    },
    data: {
        ui_widget: "x-input",
        ui_options:  {
            format: true,
            readonly: true,
            nottabable: true,
            color: 'attention'
        },
    }
}

let ui_ref_tablecharttwo_rows = {
    ui_widget: "x-table-row",
    ui_order: [
        "label",
        "data"
    ],
    label: {
        // ui_widget: "x-table-row-label",
        ui_options:  {
            format: true,
            readonly: true,
            nottabable: true,
            color: 'white',
        },
    },
    data: {
        ui_widget: "x-input",
        ui_options:  {
            format: true,
            readonly: true,
            nottabable: true,
            amount: 'tkr',
            color: 'attention'
        },
    }
}

let ui_ref_sumrow = {
    ui_widget: "x-table-row",
    ui_order: [
        "label",
        "data"
    ],
    label: {
        // ui_widget: "x-table-row-label",
        ui_options:  {
            format: true,
            readonly: true,
            nottabable: true,
            color: 'white',
            type: 'sum',
        },
    },
    data: {
        ui_widget: "x-input",
        ui_options:  {
            format: true,
            readonly: true,
            nottabable: true,
            color: 'attention',
            type: 'sum',
        },
    }
}

let json_ref_row = {
    type: 'Object',
    properties: {
        label: {
            type: 'String',
        },
        data: {
            type: 'Array',
            items: {
                type: 'Number',
            }
        }
    },
}

let json_ref_table__sum = {
    type: 'Object',
    properties: {
        header: json_ref_row,
        rows: {
            type: 'Array',
            items: json_ref_row
        },
        sumrow: json_ref_row,
    }
}

export function fourMainSchemas() {

    return {
        ui_schema: {
            ui_order: [
                "tablechartone",
                "tablecharttwo",
                "tableone",
                "tabletwo",
            ],
            tablechartone: {
                ui_widget: "x-chart",
                ui_classnames: "table",
                ui_order: [
                    "header",
                    "rows",
                    // "sumrow",
                ],
                header: ui_ref_header,
                rows: ui_ref_tablechartone_rows,
                sumrow: ui_ref_sumrow,
            },
            tablecharttwo: {
                ui_widget: "x-chart",
                ui_classnames: "table",
                ui_order: [
                    "header",
                    "rows",
                    // "sumrow",
                ],
                header: ui_ref_header,
                rows: ui_ref_tablecharttwo_rows,
                sumrow: ui_ref_sumrow,
            },
            tableone: {
                ui_widget: "x-table",
                ui_classnames: "tableone",
                ui_order: [
                    "header",
                    "rows",
                    // "sumrow",
                ],
                header: ui_ref_header,
                rows: ui_ref_tableone_rows,
                sumrow: ui_ref_sumrow,
            },
            tabletwo: {
                ui_widget: "x-table",
                ui_classnames: "tabletwo",
                ui_order: [
                    "header",
                    "rows",
                    "sumrow",
                ],
                header: ui_ref_header,
                rows: ui_ref_tabletwo_rows,
                sumrow: ui_ref_sumrow,
            },
        },
        json_schema: {
            type: 'Object',
            properties: {
                tableone: {
                    type: 'Object',
                    properties: {
                        header: json_ref_row,
                        rows: {
                            type: 'Array',
                            items: json_ref_row
                        },
                        sumrow: json_ref_row,
                    }
                },
                tabletwo: {
                    type: 'Object',
                    properties: {
                        header: json_ref_row,
                        rows: {
                            type: 'Array',
                            items: json_ref_row
                        },
                        sumrow: json_ref_row,
                    }
                },
                tablechartone: {
                    type: 'Object',
                    properties: {
                        header: json_ref_row,
                        rows: {
                            type: 'Array',
                            items: json_ref_row
                        },
                        sumrow: json_ref_row,
                    }
                },
                tablecharttwo: {
                    type: 'Object',
                    properties: {
                        header: json_ref_row,
                        rows: {
                            type: 'Array',
                            items: json_ref_row
                        },
                        sumrow: json_ref_row,
                    }
                },
                // tablechart: {
                //     type: 'Array',
                //     items: json_ref_table__sum
                // }
            }
        },
        data_schema: {
            tablechartone: {
                header: {
                    label: "Aggregerad efterfrågan och volym av lokaler (kvm)",
                    data: {
                        fn: 'getData',
                        parameter: 'identity'
                    }
                },
                rows: [
                    {
                        label: "Permanenta lokaler",
                        data: this.aggregateDataArr[2]
                    },
                    {
                        label: "Dynamiska lokaler",
                        data: this.aggregateDataArr[1]
                    },
                    {
                        label: "Efterfrågan av lokaler",
                        data: this.aggregateDataArr[0]
                    },
                ],
            },
            tablecharttwo: {
                header: {
                    label: "Aggregerade diskonterade kostnader (tkr)",
                    data: {
                        fn: 'getData',
                        parameter: 'identity'
                    }
                },
                rows: [
                    {
                        label: "Permanenta lokaler",
                        data: this.sippedaggregateddiscountedpermanentCost
                    },
                    {
                        label: "Dynamiska lokaler",
                        data: this.sippedaggregateddiscounteddynamicCost
                    },
                ],
            }, 
            tableone: {
                header: {
                    label: "Aggregerad efterfrågan och volym av lokaler (kvm)",
                    data: {
                        fn: 'getData',
                        parameter: 'identity'
                    }
                },
                rows: [
                    {
                        label: "Efterfrågan av lokaler",
                        data: this.aggregateDataArr[0]
                    },
                    {
                        label: "Volym av dynamiska lokaler",
                        data: this.aggregateDataArr[1]
                    },
                    {
                        label: "Volym av permanenta lokaler",
                        data: this.aggregateDataArr[2]
                    }
                ],
            },
            tabletwo: {
                header: {
                    label: "Aggregerade diskonterade kostnader (tkr)",
                    data: {
                        fn: 'getData',
                        parameter: 'identity'
                    }
                },
                rows: [
                    {
                        label: "Permanenta lokaler",
                        data: this.sippedaggregateddiscountedpermanentCost
                    },
                    {
                        label: "Dynamiska lokaler",
                        data: this.sippedaggregateddiscounteddynamicCost
                    },
                ],
                sumrow: {
                    label: "Besparingspotential",
                    data: this.sippedaggregateddiscountedDiffCost
                }
            },
        }
    }
}






// let ui_ref_header = {
//     ui_widget: "x-table-row",
//     ui_order: [
//         "label",
//         "data"
//     ],
//     label: {
//         // ui_widget: "x-table-row-label",
//         ui_options:  {
//             format: false,
//             readonly: true,
//             nottabable: true,
//             color: 'header',
//         },
//     },
//     data: {
//         ui_widget: "x-input",
//         ui_options:  {
//             format: false,
//             readonly: true,
//             nottabable: true,
//             color: 'none',
//         },
//     }
// }


// let ui_ref_rows = {
//     ui_widget: "x-table-row",
//     ui_order: [
//         "label",
//         "data"
//     ],
//     label: {
//         // ui_widget: "x-table-row-label",
//         ui_options:  {
//             format: true,
//             readonly: true,
//             nottabable: true,
//             color: 'white',
//         },
//     },
//     data: {
//         ui_widget: "x-input",
//         ui_options:  {
//             format: true,
//             readonly: true,
//             nottabable: true,
//             color: 'attention'
//         },
//     }
// }

// let ui_ref_tableone_rows = {
//     ui_widget: "x-table-row",
//     ui_order: [
//         "label",
//         "data"
//     ],
//     label: {
//         // ui_widget: "x-table-row-label",
//         ui_options:  {
//             format: true,
//             readonly: true,
//             nottabable: true,
//             color: 'white',
//         },
//     },
//     data: {
//         ui_widget: "x-input",
//         ui_options:  {
//             format: true,
//             readonly: true,
//             nottabable: true,
//             color: 'attention'
//         },
//     }
// }

// let ui_ref_tabletwo_rows = {
//     ui_widget: "x-table-row",
//     ui_order: [
//         "label",
//         "data"
//     ],
//     label: {
//         // ui_widget: "x-table-row-label",
//         ui_options:  {
//             format: true,
//             readonly: true,
//             nottabable: true,
//             color: 'white',
//         },
//     },
//     data: {
//         ui_widget: "x-input",
//         ui_options:  {
//             format: true,
//             readonly: true,
//             nottabable: true,
//             amount: 'tkr',
//             color: 'attention'
//         },
//     }
// }

// let ui_ref_sumrow = {
//     ui_widget: "x-table-row",
//     ui_order: [
//         "label",
//         "data"
//     ],
//     label: {
//         // ui_widget: "x-table-row-label",
//         ui_options:  {
//             format: true,
//             readonly: true,
//             nottabable: true,
//             color: 'white',
//             type: 'sum',
//         },
//     },
//     data: {
//         ui_widget: "x-input",
//         ui_options:  {
//             format: true,
//             readonly: true,
//             nottabable: true,
//             color: 'attention',
//             type: 'sum',
//         },
//     }
// }

// let json_ref_row = {
//     type: 'Object',
//     properties: {
//         label: {
//             type: 'String',
//         },
//         data: {
//             type: 'Array',
//             items: {
//                 type: 'Number',
//             }
//         }
//     },
// }

// let json_ref_table__sum = {
//     type: 'Object',
//     properties: {
//         header: json_ref_row,
//         rows: {
//             type: 'Array',
//             items: json_ref_row
//         },
//         sumrow: json_ref_row,
//     }
// }

// export function fourMainSchemas() {

//     return {
//         ui_schema: {
//             ui_order: [
//                 "tablechart",
//                 "tableone",
//                 "tabletwo",
//             ],
//             tablechart: {
//                 ui_widget: "x-chart",
//                 ui_classnames: "table",
//                 ui_order: [
//                     "header",
//                     "rows",
//                     // "sumrow",
//                 ],
//                 header: ui_ref_header,
//                 rows: ui_ref_rows,
//                 sumrow: ui_ref_sumrow,
//             },
//             tableone: {
//                 ui_widget: "x-table",
//                 ui_classnames: "tableone",
//                 ui_order: [
//                     "header",
//                     "rows",
//                     // "sumrow",
//                 ],
//                 header: ui_ref_header,
//                 rows: ui_ref_tableone_rows,
//                 sumrow: ui_ref_sumrow,
//             },
//             tabletwo: {
//                 ui_widget: "x-table",
//                 ui_classnames: "tabletwo",
//                 ui_order: [
//                     "header",
//                     "rows",
//                     // "sumrow",
//                 ],
//                 header: ui_ref_header,
//                 rows: ui_ref_tabletwo_rows,
//                 sumrow: ui_ref_sumrow,
//             },
//         },
//         json_schema: {
//             type: 'Object',
//             properties: {
//                 tableone: {
//                     type: 'Object',
//                     properties: {
//                         header: json_ref_row,
//                         rows: {
//                             type: 'Array',
//                             items: json_ref_row
//                         },
//                         sumrow: json_ref_row,
//                     }
//                 },
//                 tabletwo: {
//                     type: 'Object',
//                     properties: {
//                         header: json_ref_row,
//                         rows: {
//                             type: 'Array',
//                             items: json_ref_row
//                         },
//                         sumrow: json_ref_row,
//                     }
//                 },
//                 tablechart: {
//                     type: 'Array',
//                     items: json_ref_table__sum
//                 }
//             }
//         },
//         data_schema: {
//             tablechart: [
//                 {
//                     header: {
//                         label: "Aggregerade diskonterade kostnader (tkr)",
//                         data: {
//                             fn: 'getData',
//                             parameter: 'identity'
//                         }
//                     },
//                     rows: [
//                         {
//                             label: "Permanenta lokaler",
//                             data: this.sippedaggregateddiscountedpermanentCost
//                         },
//                         {
//                             label: "Dynamiska lokaler",
//                             data: this.sippedaggregateddiscounteddynamicCost
//                         },
//                     ],
//                 },
//                 {
//                     header: {
//                         label: "Aggregerad efterfrågan och volym av lokaler (kvm)",
//                         data: {
//                             fn: 'getData',
//                             parameter: 'identity'
//                         }
//                     },
//                     rows: [
//                         {
//                             label: "Permanenta lokaler",
//                             data: this.aggregateDataArr[2]
//                         },
//                         {
//                             label: "Dynamiska lokaler",
//                             data: this.aggregateDataArr[1]
//                         },
//                         {
//                             label: "Efterfrågan av lokaler",
//                             data: this.aggregateDataArr[0]
//                         },
//                     ],
//                 },
//             ],
//             tableone: {
//                 header: {
//                     label: "Aggregerad efterfrågan och volym av lokaler (kvm)",
//                     data: {
//                         fn: 'getData',
//                         parameter: 'identity'
//                     }
//                 },
//                 rows: [
//                     {
//                         label: "Efterfrågan av lokaler",
//                         data: this.aggregateDataArr[0]
//                     },
//                     {
//                         label: "Volym av dynamiska lokaler",
//                         data: this.aggregateDataArr[1]
//                     },
//                     {
//                         label: "Volym av permanenta lokaler",
//                         data: this.aggregateDataArr[2]
//                     }
//                 ],
//             },
//             tabletwo: {
//                 header: {
//                     label: "Aggregerade diskonterade kostnader (tkr)",
//                     data: {
//                         fn: 'getData',
//                         parameter: 'identity'
//                     }
//                 },
//                 rows: [
//                     {
//                         label: "Permanenta lokaler",
//                         data: this.sippedaggregateddiscountedpermanentCost
//                     },
//                     {
//                         label: "Dynamiska lokaler",
//                         data: this.sippedaggregateddiscounteddynamicCost
//                     },
//                 ],
//             },
//         }
//     }
// }





