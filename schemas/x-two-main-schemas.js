import "../components/x-table.js"
import "../components/x-table-row.js"
import "../components/x-input.js"
import * as R from "ramda/es/index.js";
import { html } from "lit-element";

let ui_ref_header = {
    ui_widget: "x-table-row",
    ui_classnames: "header",
    ui_order: [
        "label",
        "data"
    ],
    label: {
        // ui_widget: "x-table-row-label",
        ui_options:  {
            format: false,
            readonly: true,
            color: 'header',
        },
    },
    data: {
        ui_widget: "x-input",
        ui_options:  {
            format: false,
            readonly: true,
            color: 'none',
        },
    }
}


let ui_ref_rows = {
    ui_widget: "x-table-row",
    ui_classnames: "rows",
    ui_order: [
        "label",
        "data"
    ],
    label: {
        // ui_widget: "x-table-row-label",
        ui_options:  {
            format: true,
            color: 'white',
        },
    },
    data: {
        ui_widget: "x-input",
        ui_options:  {
            format: true,
            color: 'white',
            type: 'decimal'
        },
        ui_actions: {
            changeevent: true,
        }
    }
}

let ui_ref_rows__aggregate = {
    ui_widget: "x-table-row",
    ui_classnames: "aggregaterow",
    ui_order: [
        "label",
        "data",
    ],
    label: {
        ui_widget: "x-table-row-label",
        ui_options:  {
            format: true,
            color: 'white',
        },
    },
    data: {
        ui_widget: "x-input",
        ui_options:  {
            format: true,
            readonly: true,
            color: 'attention',
        },
    }
}


let json_ref_table = {
    type: 'Object',
    properties: {
        header: {
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
            
        },
        rows: {
            type: 'Array',
            items: {
                type: 'Object',
                properties: {
                    label: {
                        type: 'String',
                    },
                    data: {
                        type: 'Array',
                        items: {
                            type: 'Number',
                        },
                    }
                },
            }
        },
    }
}


export function twoMainTablesSchemas() {

    return {
        ui_schema: {
            ui_order: [
                "inputtable",
                "outputtable",
            ],
            inputtable: {
                ui_widget: "x-table",
                ui_classnames: "table",
                ui_order: [
                    "header",
                    "rows",
                ],
                header: ui_ref_header,
                rows: ui_ref_rows,
            },
            outputtable: {
                ui_widget: "x-table",
                ui_classnames: "table",
                ui_order: [
                    "header",
                    "rows",
                ],
                header: ui_ref_header,
                rows: ui_ref_rows__aggregate,
            },
        },
        json_schema: {
            type: 'Object',
            properties: {
                inputtable: json_ref_table,
                outputtable: json_ref_table,
            }
        },
        data_schema: {
            inputtable: {
                header: {
                    label: "Förändrad efterfrågan och volym av lokaler",
                    data: {
                        fn: 'getData',
                        parameter: 'identity'
                    }
                },
                rows: [
                    {
                        label: "Förändrad efterfrågan av lokalyta",
                        data: this.dataArray[0]  
                    },
                    {
                        label: "Förändrad lokalyta, dynamiska lokaler",
                        data: this.dataArray[1]
                    },
                    {
                        label: "Förändrad lokalyta, permanenta lokaler",
                        data: this.dataArray[2]
                    }
                ]
            },
            outputtable: {
                header: {
                    label: "Aggregerad efterfrågan och volym av lokaler",
                    data: {
                        fn: 'getData',
                        parameter: 'identity'
                    }
                },
                rows: [
                    {
                        label: "Aggregerad efterfrågan av lokalyta",
                        data: this.aggregateDataArr[0]
                    },
                    {
                        label: "Aggregerad lokalyta, dynamiska lokaler",
                        data: this.aggregateDataArr[1]
                    },
                    {
                        label: "Aggregerad lokalyta, permanenta lokaler",
                        data: this.aggregateDataArr[2]
                    }
                ]
            }
        }
    }
}