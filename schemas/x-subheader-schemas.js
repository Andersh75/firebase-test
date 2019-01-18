import'../components/x-subheader.js';
import'../components/x-button.js';
import * as R from "ramda/es/index.js";

let schemaTemplate = {
    ui_schema: {
        ui_order: [
            "subheader",
        ],
        subheader: {
            ui_widget: "x-subheader",
            ui_classnames: "subheader",
            ui_order: [
                "buttons",
                "title"
            ],
            buttons: {
                ui_widget: "x-button",
                ui_options:  {
                    color: {
                        fn: 'getData',
                        parameter: 'color'
                    },
                    selected: {
                        fn: 'getData',
                        parameter: 'selected'
                    }
                },
                ui_order: [
                    "value",
                ]
            },
        }
        
    },
    json_schema: {
        type: 'Object',
        properties: {
            subheader: {
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
                    title: {
                        type: 'String',
                    },
                }
            }
            
        }
    },
    data_schema: {
        subheader: {
            buttons: [
                {
                    value: "Scenario 1",
                },
                {
                    value: "Scenario 2",
                },
                {
                    value: "Scenario 3",
                }
            ],
            title: 'Antaganden'
        }  
    }
}


export function oneSubheaderSchemas() {
    return {
        ...schemaTemplate,
        data_schema: {
            subheader: {
                buttons: [
                    {
                        value: "Scenario 1",
                    },
                    {
                        value: "Scenario 2",
                    },
                    {
                        value: "Scenario 3",
                    }
                ],
                title: 'Antaganden'
            }  
        }
    }
}

export function twoSubheaderSchemas() {
    return {
        ...schemaTemplate,
        data_schema: {
            subheader: {
                buttons: [
                    {
                        value: "Scenario 1",
                    },
                    {
                        value: "Scenario 2",
                    },
                    {
                        value: "Scenario 3",
                    }
                ],
                title: 'Investeringsprogram'
            }  
        }
    }
}

export function threeSubheaderSchemas() {
    return {
        ...schemaTemplate,
        data_schema: {
            subheader: {
                buttons: [
                    {
                        value: "Scenario 1",
                    },
                    {
                        value: "Scenario 2",
                    },
                    {
                        value: "Scenario 3",
                    }
                ],
                title: 'Kostnader per år'
            }  
        }
    }
}

export function fourSubheaderSchemas() {
    return {
        ...schemaTemplate,
        data_schema: {
            subheader: {
                buttons: [
                    {
                        value: "Scenario 1",
                    },
                    {
                        value: "Scenario 2",
                    },
                    {
                        value: "Scenario 3",
                    }
                ],
                title: 'Resultat'
            }  
        }
    }
}