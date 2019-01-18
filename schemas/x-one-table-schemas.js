import "../components/x-rowsandlabel.js";
import "../components/x-assumption-row.js";
import "../components/x-input.js";
import * as R from "ramda/es/index.js";

let json_ref_array = {
    type: 'Object',
    properties: {
        rows: {
            type: 'Array',
            items: {
                type: 'Object',
                properties: {
                    label: {
                        type: 'String',
                    },
                    data: {
                        type: 'String',
                    },
                    comment: {
                        type: 'String',
                    },
                    button: {
                        type: 'Boolean',
                    }
                }
            }
        },
        label: {
            type: 'Object',
            properties: {
                label: {
                    type: 'String',
                }
            }
        },
        button: {
            type: 'Boolean',
        }, 
    },
}

let json_ref_obj = {
    type: 'Object',
    properties: {
        1: {
            type: 'Object',
            properties: {
                label: {
                    type: 'String',
                },
                data: {
                    type: 'String',
                },
                comment: {
                    type: 'String',
                },
                button: {
                    type: 'Boolean',
                }
            }

        },
        2: {
            type: 'Object',
            properties: {
                label: {
                    type: 'String',
                },
                data: {
                    type: 'String',
                },
                comment: {
                    type: 'String',
                },
                button: {
                    type: 'Boolean',
                }
            }
        },
        3: {
            type: 'Object',
            properties: {
                label: {
                    type: 'String',
                },
                data: {
                    type: 'String',
                },
                comment: {
                    type: 'String',
                },
                button: {
                    type: 'Boolean',
                }
            }
        },
        label: {
            type: 'Object',
            properties: {
                label: {
                    type: 'String',
                }
            }
        },
        button: {
            type: 'Boolean',
        }, 
    },
}



let ui_ref__obj = {
    ui_widget: "x-rowsandlabel",
    ui_classnames: "table",
    ui_order: [
        "1",
        "label",
        "button"
    ],
    1: {
        ui_widget: "x-assumption-row",
        ui_order: [
            "label",
            "data",
            "comment",
            "button"
        ],
        label: {
            ui_widget: "x-assumption-row-label",
        },
        data: {
            ui_widget: "x-input",
            ui_options:  {
                format: true,
                readonly: false,
                color: 'white',
                type: 'percent',
            },
            ui_actions: {
                changeevent: true,
            }
        },
        comment: {
            ui_widget: "x-assumption-row-comment",
        },
    },
    label: {
        ui_widget: "x-assumption-row",
        ui_classnames: "header",
        ui_order: [
            "label",
        ],
        label: {
            // ui_classnames: "header",
            ui_options: {
                color: 'header'
            }
        },
    },

}


let ui_ref__rates = {
    ...ui_ref__obj,
    ui_order: [
        "1",
        "2",
        "label",
        "button"
    ],
    1: {
        ...ui_ref__obj[1], data: {
            ui_widget: "x-input",
            ui_options: {
                format: true,
                readonly: false,
                color: 'white',
                type: 'percent',
            },
            ui_actions: {
                changeevent: true,
            }
        }
    },
    2: {
        ...ui_ref__obj[1], data: {
            ui_widget: "x-input",
            ui_options: {
                format: true,
                readonly: false,
                color: 'white',
                type: 'percent',
            },
            ui_actions: {
                changeevent: true,
            }
        }
    },
}

let ui_ref_invest = {
    ...ui_ref__obj,
    ui_order: [
        "1",
        "2",
        "label",
        "button"
    ],
    1: {
        ...ui_ref__obj[1], data: {
            ui_widget: "x-input",
            ui_options:  {
                format: true,
                readonly: false,
                color: 'white',
                type: 'percent',
            },
            ui_actions: {
                changeevent: true,
            }
        }
    },
    2: {
        ...ui_ref__obj[1], data: {
            ui_widget: "x-input",
            ui_options:  {
                format: true,
                readonly: false,
                color: 'white',
                type: 'decimal',
            },
            ui_actions: {
                changeevent: true,
            }
        }
    },
}

let ui_ref_maint = {
    ...ui_ref__obj,
    ui_order: [
        "1",
        "2",
        "3",
        "label",
        "button"
    ],
    1: {
        ...ui_ref__obj[1], data: {
            ui_widget: "x-input",
            ui_options:  {
                format: true,
                readonly: false,
                color: 'white',
                type: 'decimal'
            },
            ui_actions: {
                changeevent: true,
            }
        }
    },
    2: {
        ...ui_ref__obj[1], data: {
            ui_widget: "x-input",
            ui_options:  {
                format: true,
                readonly: false,
                color: 'white',
                type: 'decimal'
            },
            ui_actions: {
                changeevent: true,
            }
        }
    },
    3: {
        ...ui_ref__obj[1], data: {
            ui_widget: "x-input",
            ui_options:  {
                format: true,
                readonly: false,
                color: 'white',
                type: 'decimal'
            },
            ui_actions: {
                changeevent: true,
            }
        }
    },
}



let ui_ref_rent = {
    ui_widget: "x-rowsandlabel",
    ui_classnames: "table",
    ui_order: [
        "rows",
        "label",
        "button"
    ],
    rows: {
        ui_widget: "x-assumption-row",
        ui_order: [
            "label",
            "data",
            "comment",
            "button"
        ],
        label: {
            ui_widget: "x-assumption-row-label",
        },
        data: {
            ui_widget: "x-input",
            ui_options:  {
                format: true,
                readonly: false,
                color: 'white',
                type: 'decimal'
            },
            ui_actions: {
                changeevent: true,
            }
        },
        comment: {
            ui_widget: "x-assumption-row-comment",
        },
    },
    label: {
        ui_widget: "x-assumption-row",
        ui_classnames: "header",
        ui_order: [
            "label",
        ],
        label: {
            // ui_classnames: "header",
            ui_options: {
                color: 'header'
            }
        },
    },
}


export function oneMainTablesschemas() {
    return {
        ui_schema: {
            ui_order: [
                "investment",
                "rent",
                "maintenance",
                "rates",
            ],
            investment: ui_ref_invest,
            rent: ui_ref_rent,
            maintenance: ui_ref_maint,
            rates: ui_ref__rates,
        },
        json_schema: {
            type: 'Object',
            properties: {
                maintenance: json_ref_obj,
                rates: json_ref_obj,
                investment: json_ref_obj,
                rent: json_ref_array,
            }
        },
        data_schema: {
            maintenance: {
                1: {
                    label: "Kostnad för underhåll, permanenta lokaler",
                    data: this['maintenanceown'],
                    button: false,
                    comment:
                        "Eventuella underhållskostnader av egna lokaler samt oanvända lokaler. Underhållskostnader ska meddelas i prisnivå av startår. "
                }, 
                2: {
                    label: "Kostnad för underhåll, dynamiska lokaler",
                    data: this['maintenancerent'],
                    button: false,
                    comment: ""
                }, 
                3: {
                    label: "Kostnad för underhåll, oanvända lokaler",
                    data: this['maintenancenotused'],
                    button: false,
                    comment: ""
                },
                label: {
                    label: "Kostnad för underhåll SEK / kvm",
                },
                button: false
            },
            rates: {
                1: {
                    label: "Inflation per år",
                    data: this['inflation'],
                    button: false,
                    comment: "Inflation per år."
                }, 
                2: {
                    label: "Diskonteringsränta",
                    data: this['discount'],
                    button: false,
                    comment: "Diskonteringsränta för nuvärdeskalkyl."
                },
                label: {
                    label: "Inflation samt diskonteringsränta",
                },
                button: false
            },
            investment: {
                1: {
                    label: "Reservation för kommande renoveringar",
                    data: this['reinvestment'],
                    button: false,
                    comment:
                        "Reservation av kommande renoveringar reflekterar försämring av teknisk kondition av fastighetsinnehav. Underhållsinvesteringar görs för att minska denna minskning av tekniskt värde."
                },
                2: {
                    label: "Investering SEK / kvm, nya lokaler",
                    data: this['investment'],
                    button: false,
                    comment:
                        "Pris per kvadratmeter av nya permanenta lokaler. Pris inkluderar en byggnad med samma funktionella och tekniska egenskaper som en dynamisk lokal. Investeringskostnader skal meddelas på prisnivå av startår."
                },
                label: {
                    label: "Reservation av kommande renoveringar samt investeringar",
                },
         
                button: false
            },
            rent: {
                rows: R.pipe(R.zip, R.flatten)(this.amounts, this.periods),
                label: {
                    label: "Hyreskostnader av dynamiska lokaler SEK / kvm / år",
                },
               
                button: true
            }   
        }
    }
}