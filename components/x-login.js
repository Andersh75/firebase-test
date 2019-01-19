import { html, LitElement } from "lit-element";
import { usermixin } from "../mixins/usermixin.js";
import * as R from "ramda/es/index.js";
;

let props = () => ([
  { propKey: "props", propValue: { type: Object }, rx: false },
  { propKey: "hidden", propValue: { type: Boolean }, rx: false },
]);

export class XLogin extends usermixin(props, LitElement) {
  keyHandler(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.logintest(e, true);
    }
  }

  logintest(e, clean = false) {
    const redo = e => {
      this.shadowRoot.querySelector("#name").value = "";
      this.shadowRoot.querySelector("#password").value = "";
      e.target.blur();
      this.requestUpdate();
    };

    let name = this.shadowRoot.querySelector("#name").value;
    let password = this.shadowRoot.querySelector("#password").value;

    if (name != "" && password != "") {
      this.user.signInWithEmailAndPassword(name, password).catch(error => {
        redo(e);
      });
    } else {
      if (clean) {
        redo(e);
      }
    }
  }

  blurHandler(e) {
    this.style.setProperty("--focus-line-color", "var(--color-text)");
    this.style.setProperty("--focus-placeholder-opacity", "1");
    this.logintest(e);
  }

  focusHandler(e) {
    this.style.setProperty("--focus-line-color", "var(--color-attention)");
    this.style.setProperty("--focus-placeholder-opacity", "0.2");
    this.logintest(e);
  }

  firstUpdated() {
    super.firstUpdated();
    if (!this.user.currentUser) {
      this.shadowRoot.querySelector("#name").value = "";
      this.shadowRoot.querySelector("#password").value = "";
    }
    this.user.onAuthStateChanged(user => {
      if (user) {
        this.requestUpdate();
      } else {
        this.shadowRoot.querySelector("#name").value = "";
        this.shadowRoot.querySelector("#password").value = "";
        this.requestUpdate();
      }
    });
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    changedProperties.forEach((oldValue, propName) => {
      
      if (propName === "props") {
        console.log('THEPROPS', this.props)
        this.hidden = this.props.ui_schema.ui_options.hidden
      }
    });
  }

  render() {
    return html`
      <style>
        :host {
          --focus-line-color: var(--color-text);
          --focus-placeholder-opacity: 1;
        }

        @media only screen and (min-width : 660px) { 
        .menu {
          display: grid;
          grid-template-columns: repeat(2, max-content);
          grid-column-gap: 10px;
          grid-template-areas: "zero one";
        }

        }

        @media only screen and (max-width : 659px) { 
        .menu {
          display: grid;
          grid-template-columns: repeat(2, max-content);
          grid-column-gap: 10px;
          grid-template-areas: "zero one";
          visibility: hidden;
        }

        }

        .item-0 {
          grid-area: zero;
        }
        .item-1 {
          grid-area: one;
        }

        .input {
          width: 100%;
          display: flex;
          border: 0px;
          box-sizing: border-box;
          text-align: left;
          padding: 0px;
          padding-right: 9px;
          background-color: var(--color-bg);

          height: 30px;
          justify-content: center;
          align-items: center;
          font: var(--font-menu);
          color: var(--color-menu);
          border-bottom: 2px solid var(--focus-line-color);
          outline: none !important;
          border-radius: 0px;
        }

        ::placeholder {
          /* Chrome, Firefox, Opera, Safari 10.1+ */
          color: var(--color-text);
          opacity: var(--focus-placeholder-opacity); /* Firefox */
        }

        .hidden {
          visibility: hidden;
        }

      </style>

    <div class="menu ${this.hidden ? 'hidden' : ''}">
            <input class="input item-0" type="textfield" id="name" placeholder="ANVÄNDARE" @keydown="${event =>
              this.keyHandler(event)}" @blur="${event =>
      this.blurHandler(event)}" @focus="${event =>
      this.focusHandler(event)}"></input>
            <input class="input item-1" type="textfield" id="password" placeholder="LÖSENORD" @keydown="${event =>
              this.keyHandler(event)}" @blur="${event =>
      this.blurHandler(event)}" @focus="${event =>
      this.focusHandler(event)}"></input>
        </div>
    `;
  }
}

customElements.define("x-login", XLogin);
