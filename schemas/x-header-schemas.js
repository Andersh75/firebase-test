import '../components/x-menulogin';
import '../components/x-menu-button';
import '../components/x-login';
import '../components/x-icon';
import * as R from "ramda/es/index.js";

export function loggedinHeaderSchemas() {

    return {
        ui_schema: {
            ui_order: [
                "header",
            ],
            header: {
                ui_widget: "x-header",
                ui_classnames: "header",
                ui_order: [
                    "menu",
                    "icon"
                ],
                menu: {
                    ui_widget: "x-menulogin",
                    ui_order: [
                        "buttons",
                    ],
                    buttons: {
                        ui_widget: "x-menu-button",
                        ui_options:  {
                            selected: {
                                fn: 'getData',
                                parameter: 'selectedmenu'
                            },
                            // selected: true
                        },
                        ui_order: [
                            "value",
                        ]
                    },
                },
                icon: {
                    ui_widget: "x-icon",
                    ui_order: [
                        "value",
                    ]
                },
            }
        },
        json_schema: {
            type: 'Object',
            properties: {
                header: {
                    type: 'Object',
                    properties: {
                        menu: {
                            type: 'Object',
                            properties: {
                                buttons: {
                                    type: 'Array',
                                    items: {
                                        type: 'Object',
                                        properties: {
                                            value: {
                                                type: 'String',
                                            },
                                        },
                                    }
                                },
                            }
                        },
                        icon: {
                            type: 'Object',
                            properties: {
                                value: {
                                    type: 'String',
                                },
                            },
                        }
                    }
                },
            },

        },
        data_schema: {
            header: {
                menu: {
                    buttons: [
                        {
                            value: "ANTAGANDEN",
                        },
                        {
                            value: "INVESTERINGSPROGRAM",
                        },
                        {
                            value: "KOSTNADER PER ÅR",
                        },
                        {
                            value: "RESULTAT",
                        },
                        {
                            value: "KTH",
                        },
                    ],
                },
                icon: {
                    value: "in",
                }
            }
        }
    }
}


export function loggedoutHeaderSchemas() {

    return {
        ui_schema: {
            ui_order: [
                "header",
            ],
            header: {
                ui_widget: "x-header",
                ui_classnames: "header",
                ui_order: [
                    "menu",
                    "icon"
                ],
                menu: {
                    ui_widget: "x-login",
                    ui_options:  {
                        hidden: this.loginhidden
                    },
                },
                icon: {
                    ui_widget: "x-icon",
                    ui_order: [
                        "value",
                    ]
                }, 
            }
        },
        json_schema: {
            type: 'Object',
            properties: {
                header: {
                    type: 'Object',
                    properties: {
                        menu: {
                            type: 'String',
                        },
                        icon: {
                            type: 'Object',
                            properties: {
                                value: {
                                    type: 'String',
                                },
                            },
                        }
                    }
                },
            },

        },
        data_schema: {
            header: {
                menu: "",
                icon: {
                    value: "out",
                }  
            }
        }
    }
}




// export function loggedinSchemas() {

//     return {
//         ui_schema: {
//             ui_order: [
//                 "header",
//             ],
//             header: {
//                 ui_widget: "x-header",
//                 ui_classnames: "header",
//                 ui_order: [
//                     "menu",
//                     "login",
//                 ],
//                 menu: {
//                     ui_widget: "x-menulogin",
//                     ui_order: [
//                         "buttons",
//                     ],
//                     buttons: {
//                         ui_widget: "x-menu-button",
//                         ui_options:  {
//                             selected: {
//                                 fn: 'getData',
//                                 parameter: 'selectedmenu'
//                             },
//                             // selected: true
//                         },
//                         ui_order: [
//                             "value",
//                         ]
//                     },
//                 },
//                 login: {
//                     ui_widget: "x-login",
//                 } 
//             }
//         },
//         json_schema: {
//             type: 'Object',
//             properties: {
//                 header: {
//                     type: 'Object',
//                     properties: {
//                         menu: {
//                             type: 'Object',
//                             properties: {
//                                 buttons: {
//                                     type: 'Array',
//                                     items: {
//                                         type: 'Object',
//                                         properties: {
//                                             value: {
//                                                 type: 'String',
//                                             },
//                                         },
//                                     }
//                                 },
//                             }
//                         },
//                         login: {
//                             type: 'String',
//                         }
//                     }
//                 },
//             },

//         },
//         data_schema: {
//             header: {
//                 menu: {
//                     buttons: [
//                         {
//                             value: "ANTAGANDEN",
//                         },
//                         {
//                             value: "INVESTERINGSPROGRAM",
//                         },
//                         {
//                             value: "KOSTNADER PER ÅR",
//                         },
//                         {
//                             value: "RESULTAT",
//                         },
//                         {
//                             value: "LOGGA UT",
//                         },
//                         {
//                             value: "TEST",
//                         }
//                     ],
//                 },
//                 login: ""  
//             }
//         }
//     }
// }

