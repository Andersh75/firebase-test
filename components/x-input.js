import { html, LitElement } from "lit-element";
import { decimalFormat, percentFormat } from "../utils/formatting.js";
import { propsmixin } from "../mixins/propsmixin.js";
import * as R from "ramda/es/index.js";
;

function test(item) {
  return item != " ";
}

function removeSpaces(item) {
  return R.pipe(
    R.split(""),
    R.filter(test)
  )(item).join("");
}

function isAnInteger(item) {
  let itemWithoutSpace = removeSpaces(item);
  if (
    !isNaN(itemWithoutSpace) &&
    typeof itemWithoutSpace !== "boolean" &&
    !R.startsWith("0", itemWithoutSpace) &&
    !R.startsWith(".", itemWithoutSpace) &&
    !R.startsWith(",", itemWithoutSpace)
  ) {
    return Number.isInteger(Number(itemWithoutSpace));
  } else {
    return false || item === "0";
  }
}

function isAPercent(item) {
  let itemWithoutSpace = removeSpaces(item);
  if (item == "0") {
    return true;
  }

  if (
    !isNaN(itemWithoutSpace) &&
    typeof itemWithoutSpace !== "boolean" &&
    !R.startsWith(".", itemWithoutSpace) &&
    !R.startsWith(",", itemWithoutSpace)
  ) {
    return Number(itemWithoutSpace) % 1 != 0 && Number(itemWithoutSpace) <= 1;
  } else {
    return false;
  }
}

let props = () => [
  { propKey: "celltext", propValue: { type: String }, rx: false },
  { propKey: "color", propValue: { type: String }, rx: false },
  { propKey: "type", propValue: { type: String }, rx: false },
  { propKey: "readonly", propValue: { type: Boolean }, rx: false },
  { propKey: "format", propValue: { type: Boolean }, rx: false },
  { propKey: "changeevent", propValue: { type: Object }, rx: false },
  { propKey: "props", propValue: { type: Object }, rx: false }
];

export class XInput extends propsmixin(props, LitElement) {
  constructor() {
    super();
    this.readonly = false;
    this.format = false;
    this.changeevent = true;
  }

  blurHandler(e) {

    let value;
    if(e.path) {
      value = e.path[0].value
    } else if(e.originalTarget) {
      value = e.originalTarget.value
    } else {
      value = e.srcElement.value
    }

    if (this.format && this.type) {
      if (this.type === "decimal") {
        
        if (isAnInteger(value)) {
          if (removeSpaces(value) != this.celltext) {
            let event = new CustomEvent("cellchanged", {
              detail: { value: removeSpaces(value) }
            });
            this.changeevent ? this.dispatchEvent(event) : "";
          } else {
            this.shadowRoot.querySelector(
              "#edcell"
            ).value = decimalFormat.format(this.celltext);
          }
        } else {
          this.shadowRoot.querySelector("#edcell").value = decimalFormat.format(
            this.celltext
          );
        }
      }

      if (this.type === "percent") {
        if (isAPercent(value)) {
          if (removeSpaces(value) != this.celltext) {
            let event = new CustomEvent("cellchanged", {
              detail: { value: removeSpaces(value) }
            });
            this.changeevent ? this.dispatchEvent(event) : "";
          } else {
            this.shadowRoot.querySelector(
              "#edcell"
            ).value = percentFormat.format(this.celltext);
          }
        } else {
          this.shadowRoot.querySelector("#edcell").value = percentFormat.format(
            this.celltext
          );
        }
      }
    } else {
      if (value != this.celltext) {
        let event = new CustomEvent("cellchanged", {
          detail: { value: removeSpaces(value) }
        });
        this.changeevent ? this.dispatchEvent(event) : "";
      } else {
        this.shadowRoot.querySelector("#edcell").value = this.celltext;
      }
    }
  }

  keydownHandler(e) {
    let validKeys = [
      "Delete",
      "Backspace",
      "Tab",
      "ArrowRight",
      "ArrowLeft",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "-"
    ];

    if (this.type === "percent") {
      validKeys.push(".");
    }

    if (e.key === "Enter") {
      e.preventDefault();
      this.shadowRoot.querySelector("#edcell").blur();
    } else if (e.metaKey) {
      switch (e.key) {
        case "c":
          break;
        case "v":
          break;
      }
    } else if (R.contains(e.key, validKeys)) {
    } else {
      if (this.format) {
        e.preventDefault();
      }
    }
  }

  focusHandler(e) {
    if (!this.readonly) {
      this.shadowRoot.querySelector("#edcell").value = this.celltext;
      this.shadowRoot.querySelector("#edcell").select();
    } else {
      e.preventDefault();
      this.shadowRoot.querySelector("#edcell").blur();
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    changedProperties.forEach((oldValue, propName) => {
      if (propName == "celltext") {
        if (this.format) {
          if (this.type !== "percent") {
            this.shadowRoot.querySelector(
              "#edcell"
            ).value = decimalFormat.format(this.celltext);
          } else {
            this.shadowRoot.querySelector(
              "#edcell"
            ).value = percentFormat.format(this.celltext);
          }
        } else {
          this.shadowRoot.querySelector("#edcell").value = this.celltext;
        }
      }
      
      if (propName === "props") {


        // console.log('PROPS IN INPUT', this.props)
        if (this.props.ui_schema.ui_options) {
          this.color = this.props.ui_schema.ui_options.color;
          this.type = this.props.ui_schema.ui_options.type;
          this.readonly = this.props.ui_schema.ui_options.readonly;
          this.format = this.props.ui_schema.ui_options.format;
          this.type = this.props.ui_schema.ui_options.type
            ? this.props.ui_schema.ui_options.type
            : this.type;
        }

        if (this.props.ui_schema.ui_actions) {
          this.changeevent = this.props.ui_schema.ui_actions.changeevent;
        }

        this.celltext = this.props.data_schema;
      }
    });
  }

  render() {
    return html`
            <style>
            :host {
              align-self: end
            }

            .input {
                height: 3em;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font: var(--font-cell);
                border: 0px;
                box-sizing: border-box;
                text-align: right;
                padding: 0px;
                padding-right: 9px;
                border-radius: 0px;
            }
             .input:focus {
                outline: none !important;
                border:2px solid #FFC107;
                padding-right: 7px;
            }
            ::selection {
                background: #FFC107;
            }

            ::-moz-selection {
                background: #FFC107;
            } 
            
            .input--attention {
                background-color: var(--color-attention);
                color: var(--color-celltext);
            }

            .input--white {
                background-color: var(--color-text);
                color: var(--color-celltext);
                box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
            } 

            .input--none {
                background-color: var(--color-transparent);
                color: var(--color-text);
                font-weight: bold;
                text-align: center;
                padding-right: 0px;
            }

            .input--header {
                background-color: var(--color-transparent);
                color: var(--color-text);
                font: var(--font-table-rowheader);
                text-align: center;
                padding-right: 0px;
            }

            .input--sum {
                font: var(--font-cell-sum);
                background-color: #e6ac00;
            }
  
            </style>
            <input id="edcell" class="input ${
              this.type ? "input--" + this.type : ""
            } input--${this.color}" tabindex=${
      this.readonly ? "-1" : "0"
    } ?readonly=${this.readonly} @keydown="${event =>
      this.keydownHandler(event)}" @focus="${e =>
      this.focusHandler(e)}" @blur="${event =>
      this.blurHandler(event)}"></input>   
        `;
  }
}

customElements.define("x-input", XInput);
