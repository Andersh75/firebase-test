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

export function threeMainSchemas() {

    return {
        ui_schema: {
            ui_order: [
                "table",
            ],
            table: {
                ui_widget: "x-table",
                ui_classnames: "table",
                ui_order: [
                    "header",
                    "rows",
                    "sumrow",
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
                }
            }
        },
        data_schema: {
            table: [
                {
                    header: {
                        label: "Kostnader av permanenta lokaler",
                        data: {
                            fn: 'getData',
                            parameter: 'identity'
                        }
                    },
                    rows: [
                        {
                            label: "Investering i nya lokaler",
                            data: this.permanentInvestmentCosts
                        },
                        {
                            label: "Underhåll av egna lokaler",
                            data: this.permanentMaintenanceCosts
                        },
                        {
                            label: "Minskning av tekniskt värde",
                            data: this.permanentReinvestmentCosts
                        },
                    ],
                    sumrow: {
                        label: "Summa kostnader",
                        data: this.sippedpermanentCost
                    },
                },
                {
                    header: {
                        label: "Kostnader av dynamiska lokaler",
                        data: {
                            fn: 'getData',
                            parameter: 'identity'
                        }
                    },
                    rows: [
                        {
                            label: "Underhålls av dynamiska lokaler",
                            data: this.dynamicMaintenanceCosts
                        },
                        {
                            label: "Hyra av dynamiska lokaler",
                            data: this.dynamicRentCosts
                        },
                    ],
                    sumrow: {
                        label: "Summa kostnader",
                        data: this.sippeddynamicCost
                    }
                },
                {
                    header: {
                        label: "Diskonterade kostnader av permanenta lokaler",
                        data: {
                            fn: 'getData',
                            parameter: 'identity'
                        }
                    },
                    rows: [
                        {
                            label: "Investering i nya lokaler",
                            data: this.discountedPermanentInvestmentCosts
                        },
                        {
                            label: "Underhåll av egna lokaler",
                            data: this.discountedPermanentMaintenanceCosts
                        },
                        {
                            label: "Minskning av tekniskt värde",
                            data: this.discountedPermanentReinvestmentCosts
                        },
                    ],
                    sumrow: {
                        label: "Summa kostnader",
                        data: this.sippeddiscountedpermanentCost
                    },
                },
                {
                    header: {
                        label: "Diskonterade kostnader av dynamiska lokaler",
                        data: {
                            fn: 'getData',
                            parameter: 'identity'
                        }
                    },
                    rows: [
                        {
                            label: "Underhålls av dynamiska lokaler",
                            data: this.discountedDynamicMaintenanceCosts
                        },
                        {
                            label: "Hyra av dynamiska lokaler",
                            data: this.discountedDynamicRentCosts
                        },
                    ],
                    sumrow: {
                        label: "Summa kostnader",
                        data: this.sippeddiscounteddynamicCost
                    }
                },
                {
                    header: {
                        label: "Aggregerade diskonterade kostnader av permanenta lokaler",
                        data: {
                            fn: 'getData',
                            parameter: 'identity'
                        }
                    },
                    rows: [
                        {
                            label: "Investering i nya lokaler",
                            data: this.aggregatedDiscountedPermanentInvestmentCosts
                        },
                        {
                            label: "Underhåll av egna lokaler",
                            data: this.aggregatedDiscountedPermanentMaintenanceCosts
                        },
                        {
                            label: "Minskning av tekniskt värde",
                            data: this.aggregatedDiscountedPermanentReinvestmentCosts
                        },
                    ],
                    sumrow: {
                        label: "Summa kostnader",
                        data: this.sippedaggregateddiscountedpermanentCost
                    },
                },
                {
                    header: {
                        label: "Aggregerade diskonterade kostnader av dynamiska lokaler",
                        data: {
                            fn: 'getData',
                            parameter: 'identity'
                        }
                    },
                    rows: [
                        {
                            label: "Underhåll av dynamiska lokaler",
                            data: this.aggregatedDiscountedDynamicMaintenanceCosts
                        },
                        {
                            label: "Hyra av dynamiska lokaler",
                            data: this.aggregatedDiscountedDynamicRentCosts
                        },
                    ],
                    sumrow: {
                        label: "Summa kostnader",
                        data: this.sippedaggregateddiscounteddynamicCost
                    }
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
//                     label: "Summa kostnader permanenta lokaler",
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
//                     label: "Summa kostnader dynamiska lokaler",
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
//                     label: "Summa kostnader permanenta lokaler",
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
//                     label: "Summa kostnader dynamiska lokaler",
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
//                     label: "Summa kostnader permanenta lokaler",
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
//                     label: "Summa kostnader dynamiska lokaler",
//                     data: this.sippedaggregateddiscounteddynamicCost
//                 }
//             },
//         }
//     }
// }