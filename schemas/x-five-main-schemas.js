import "../components/x-grid.js";
import "../components/x-table-row.js";
import "../components/x-input.js";
import "../components/x-gridbox.js";





export function fiveMainSchemas() {

    return {
        ui_schema: {
            ui_order: [
                "boxs"
            ],
            boxs: {
                ui_widget: "x-gridbox",
                ui_classnames: "gridbox",
                ui_order: [
                    "grids",
                ],
                grids: {
                    ui_widget: "x-grid",
                    ui_classnames: "grid",
                    ui_order: [
                        "rows",
                    ],
                    rows: {
                        ui_order: [
                            "data",
                            "id",
                            "selected"
                        ],
                    },
                },
            }

        },
        json_schema: {
            type: 'Object',
            properties: {
                boxs: {
                    type: 'Array',
                    items: {
                        type: 'Object',
                        properties: {
                            grids: {
                                type: 'Array',
                                items: {
                                    type: 'Object',
                                    properties: {
                                        rows: {
                                            type: 'Array',
                                            items: {
                                                type: 'Object',
                                                properties: {
                                                    data: {
                                                        type: 'String',
                                                    },
                                                    id: {
                                                        type: 'String',
                                                    },
                                                    selected: {
                                                        type: 'Boolean',
                                                    }
                                                },
                                            }
                                        },
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
        },
        data_schema:
        {
            boxs: [
                {
                    grids: [
                        {
                            rows: {
                                fn: 'getCounty',
                                parameter: 'identity'
                            }
                        },
                    ],
                },
                // {
                //     grids: {
                //         fn: 'getMunicipality',
                //         parameter: 'identity'
                //     },
                // },
                // // {
                // //     grids: [
                // //         {
                // //             rows: {
                // //                 fn: 'getMunicipality',
                // //                 parameter: 'identity'
                // //             },
                // //         },
                // //     ],
                // // },
                // {
                //     grids: [
                //         {
                //             rows: {
                //                 fn: 'getLKF',
                //                 parameter: 'identity'
                //             },
                //         },
                //     ],
                // }
            ]
        }
    }
}



// export function fiveMainSchemas() {

//     return {
//         ui_schema: {
//             ui_order: [
//                 "grids",
//             ],
//             grids: {
//                 ui_widget: "x-grid",
//                 ui_classnames: "grid",
//                 ui_order: [
//                     "rows",
//                 ],
//                 rows: {
//                     ui_order: [
//                         "data",
//                         "id",
//                         "selected"
//                     ],
//                 },
//             },
//         },
//         json_schema: {
//             type: 'Object',
//             properties: {
//                 grids: {
//                     type: 'Array',
//                     items: {
//                         type: 'Object',
//                         properties: {
//                             rows: {
//                                 type: 'Array',
//                                 items: {
//                                     type: 'Object',
//                                     properties: {
//                                         data: {
//                                             type: 'Number',
//                                         },
//                                         id: {
//                                             type: 'String',
//                                         },
//                                         selected: {
//                                             type: 'Boolean',
//                                         }
//                                     },
//                                 }
//                             },
//                         }
//                     }
//                 }
//             }
//         },
//         data_schema: {
//             grids: [
//                 {
//                     rows: {
//                         fn: 'getCounty',
//                         parameter: 'identity'
//                     }
//                 },
//                 {
//                     rows: {
//                         fn: 'getMunicipality',
//                         parameter: 'identity'
//                     },
//                 },
//                 {
//                     rows: {
//                         fn: 'getLKF',
//                         parameter: 'identity'
//                     },
//                 },
//             ],
//         }
//     }
// }