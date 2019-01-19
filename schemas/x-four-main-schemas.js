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
                "tablechart",
                "table",
            ],
            tablechart: {
                ui_widget: "x-chart",
                ui_classnames: "table",
                ui_order: [
                    "header",
                    "rows",
                    // "sumrow",
                ],
                header: ui_ref_header,
                rows: ui_ref_rows,
                sumrow: ui_ref_sumrow,
            },
            table: {
                ui_widget: "x-table",
                ui_classnames: "table",
                ui_order: [
                    "header",
                    "rows",
                    // "sumrow",
                ],
                header: ui_ref_header,
                rows: ui_ref_rows,
                sumrow: ui_ref_sumrow,
            },
        },
        json_schema: {
            type: 'Object',
            properties: {
                table: {
                    type: 'Array',
                    items: json_ref_table__sum
                },
                tablechart: {
                    type: 'Array',
                    items: json_ref_table__sum
                }
            }
        },
        data_schema: {
            tablechart: [
                {
                    header: {
                        label: "Aggregerade diskonterade kostnader",
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
                {
                    header: {
                        label: "Aggregerad efterfrågan och volym av lokaler",
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
                            label: "Dynamiska lokaler",
                            data: this.aggregateDataArr[1]
                        },
                        {
                            label: "Permanenta lokaler",
                            data: this.aggregateDataArr[2]
                        }
                    ],
                },
            ],
            table: [
                {
                    header: {
                        label: "Aggregerade diskonterade kostnader",
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
                {
                    header: {
                        label: "Aggregerad efterfrågan och volym av lokaler",
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
                            label: "Dynamiska lokaler",
                            data: this.aggregateDataArr[1]
                        },
                        {
                            label: "Permanenta lokaler",
                            data: this.aggregateDataArr[2]
                        }
                    ],
                },
            ]
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

// let ui_ref_sumrow = {
//     ui_widget: "x-table-row",
//     ui_order: [
//         "label",
//         "data"
//     ],
//     label: {
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

// export function schemas() {

//     return {
//         ui_schema: {
//             ui_order: [
//                 "tableone",
//                 "tabletwo",
//                 "tablethree",
//                 "tablefour",
//                 "tablefive",
//                 "tablesix",
//             ],
//             tableone: {
//                 ui_widget: "x-table",
//                 ui_classnames: "table",
//                 ui_order: [
//                     "header",
//                     "rows",
//                     "sumrow",
//                 ],
//                 header: ui_ref_header,
//                 rows: ui_ref_rows,
//                 sumrow: ui_ref_sumrow,
//             },
//             tabletwo: {
//                 ui_widget: "x-table",
//                 ui_classnames: "table",
//                 ui_order: [
//                     "header",
//                     "rows",
//                     "sumrow",
//                 ],
//                 header: ui_ref_header,
//                 rows: ui_ref_rows,
//                 sumrow: ui_ref_sumrow,
//             },
//             tablethree: {
//                 ui_widget: "x-table",
//                 ui_classnames: "table",
//                 ui_order: [
//                     "header",
//                     "rows",
//                     "sumrow",
//                 ],
//                 header: ui_ref_header,
//                 rows: ui_ref_rows,
//                 sumrow: ui_ref_sumrow,
//             },
//             tablefour: {
//                 ui_widget: "x-table",
//                 ui_classnames: "table",
//                 ui_order: [
//                     "header",
//                     "rows",
//                     "sumrow",
//                 ],
//                 header: ui_ref_header,
//                 rows: ui_ref_rows,
//                 sumrow: ui_ref_sumrow,
//             },
//             tablefive: {
//                 ui_widget: "x-table",
//                 ui_classnames: "table",
//                 ui_order: [
//                     "header",
//                     "rows",
//                     "sumrow",
//                 ],
//                 header: ui_ref_header,
//                 rows: ui_ref_rows,
//                 sumrow: ui_ref_sumrow,
//             },
//             tablesix: {
//                 ui_widget: "x-table",
//                 ui_classnames: "table",
//                 ui_order: [
//                     "header",
//                     "rows",
//                     "sumrow",
//                 ],
//                 header: ui_ref_header,
//                 rows: ui_ref_rows,
//                 sumrow: ui_ref_sumrow,
//             },
//         },
//         json_schema: {
//             type: 'Object',
//             properties: {
//                 tableone: json_ref_table__sum,
//                 tabletwo: json_ref_table__sum,
//                 tablethree: json_ref_table__sum,
//                 tablefour: json_ref_table__sum,
//                 tablefive: json_ref_table__sum,
//                 tablesix: json_ref_table__sum,
//             }
//         },
//         data_schema: {
//             tableone: {
//                 header: {
//                     label: "Kostnader av permanenta lokaler",
//                     data: {
//                       fn: 'getData',
//                       parameter: 'identity'
//                   }
//                 },
//                 rows: [
//                     {
//                         label: "Investering i nya lokaler",
//                         data: this.permanentSingleCost[0]
//                     },
//                     {
//                         label: "Underhållskostnad av egna lokaler",
//                         data: this.permanentAnnualCost[0]
//                     },
//                     {
//                         label: "Minskning av tekniskt värde",
//                         data: this.permanentPercentageCost[0]
//                     },
//                 ],
//                 sumrow: {
//                     label: "Summa kostander permanenta lokaler",
//                     data: this.sippedpermanentCost
//                 },
//             },
//             tabletwo: {
//                 header: {
//                     label: "Kostnader av dynamiska lokaler",
//                     data: {
//                       fn: 'getData',
//                       parameter: 'identity'
//                   }
//                 },
//                 rows: [
//                     {
//                         label: "Underhållskostnad av dynamiska lokaler",
//                         data: this.dynamicAnnualCost[0]
//                     },
//                     {
//                         label: "Hyreskostnader av dynamiska lokaler",
//                         data: this.dynamicAnnualCost[1]
//                     },
//                 ],
//                 sumrow: {
//                     label: "Summa kostander dynamiska lokaler",
//                     data: this.sippeddynamicCost
//                 }
//             },
//             tablethree: {
//                 header: {
//                     label: "Diskonterade kostnader av permanenta lokaler",
//                     data: {
//                       fn: 'getData',
//                       parameter: 'identity'
//                   }
//                 },
//                 rows: [
//                     {
//                         label: "Investering i nya lokaler",
//                         data: this.discountedpermanentSingleCost[0]
//                     },
//                     {
//                         label: "Underhållskostnad av egna lokaler",
//                         data: this.discountedpermanentAnnualCost[0]
//                     },
//                     {
//                         label: "Minskning av tekniskt värde",
//                         data: this.discountedpermanentPercentageCost[0]
//                     },
//                 ],
//                 sumrow: {
//                     label: "Summa kostander permanenta lokaler",
//                     data: this.sippeddiscountedpermanentCost
//                 },
//             },
//             tablefour: {
//                 header: {
//                     label: "Diskonterade kostnader av dynamiska lokaler",
//                     data: {
//                       fn: 'getData',
//                       parameter: 'identity'
//                   }
//                 },
//                 rows: [
//                     {
//                         label: "Underhållskostnad av dynamiska lokaler",
//                         data: this.discounteddynamicAnnualCost[0]
//                     },
//                     {
//                         label: "Hyreskostnader av dynamiska lokaler",
//                         data: this.discounteddynamicAnnualCost[1]
//                     },
//                 ],
//                 sumrow: {
//                     label: "Summa kostander dynamiska lokaler",
//                     data: this.sippeddiscounteddynamicCost
//                 }
//             },
//             tablefive: {
//                 header: {
//                     label: "Aggregerade diskonterade kostnader av permanenta lokaler",
//                     data: {
//                       fn: 'getData',
//                       parameter: 'identity'
//                   }
//                 },
//                 rows: [
//                     {
//                         label: "Investering i nya lokaler",
//                         data: this.aggregateddiscountedpermanentSingleCost[0]
//                     },
//                     {
//                         label: "Underhållskostnad av egna lokaler",
//                         data: this.aggregateddiscountedpermanentAnnualCost[0]
//                     },
//                     {
//                         label: "Minskning av tekniskt värde",
//                         data: this.aggregateddiscountedpermanentPercentageCost[0]
//                     },
//                 ],
//                 sumrow: {
//                     label: "Summa kostander permanenta lokaler",
//                     data: this.sippedaggregateddiscountedpermanentCost
//                 },
//             },
//             tablesix: {
//                 header: {
//                     label: "Aggregerade diskonterade kostnader av dynamiska lokaler",
//                     data: {
//                       fn: 'getData',
//                       parameter: 'identity'
//                   }
//                 },
//                 rows: [
//                     {
//                         label: "Underhållskostnad av dynamiska lokaler",
//                         data: this.aggregateddiscounteddynamicAnnualCost[0]
//                     },
//                     {
//                         label: "Hyreskostnader av dynamiska lokaler",
//                         data: this.aggregateddiscounteddynamicAnnualCost[1]
//                     },
//                 ],
//                 sumrow: {
//                     label: "Summa kostander dynamiska lokaler",
//                     data: this.sippedaggregateddiscounteddynamicCost
//                 }
//             },
//         }
//     }
// }