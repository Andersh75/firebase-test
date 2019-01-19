import "../components/x-main-header.js";
import * as R from "ramda/es/index.js";

let schemaTemplate = {
    ui_schema: {
        ui_order: [
            "header",
        ],
        header: {
            ui_widget: "x-main-header",
            ui_classnames: "header",
            ui_order: [
                "label",
                "data",
                "comment",
            ]
        },
    },
    json_schema: {
        type: 'Object',
        properties: {
            header: {
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
                },
            },
        }
    },
}

export function oneMainHeaderSchemas() {
    return {
        ...schemaTemplate, 
        data_schema: {
            header: {
                label: "Kostnadsslag",
                data: "Scenariodata",
                comment: "Kommentarer",
            }
        }
    }
}

export function twoMainHeaderSchemas() {
    return {
        ...schemaTemplate, 
        data_schema: {
            header: {
                label: "Antal kvadratmeter",
                data: "",
                comment: "",
            }
        }
    }
}

export function threeHeaderSchemas() {
    return {
        ...schemaTemplate, 
        data_schema: {
            header: {
                label: "Antal tkr",
                data: "",
                comment: "",
            }
        }
    }
}

export function fourHeaderSchemas() {
    return {
        ...schemaTemplate, 
        data_schema: {
            header: {
                label: "Grafer och Tabeller",
                data: "",
                comment: "",
            }
        }
    }
}