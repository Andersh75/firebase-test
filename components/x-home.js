import { html, LitElement } from "lit-element";
import "./x-header.js";
import "./x-menu-button";
import "./x-footer";
import "./x-a";
import "./x-b";
import { loggedoutHeaderSchemas } from "../schemas/x-header-schemas.js";
import {
  toRender,
  getRenderData,
  prepareRender
} from "../utils/whcg-functions.js";

import { connectmixin } from "../mixins/connectmixin.js";
import { reduxmixin } from "../mixins/reduxmixin.js";
import { rxmixin } from "../mixins/rxmixin.js";

let props = () => [];

class XHome extends reduxmixin(
  props,
  connectmixin(props, LitElement)) {
    constructor() {
        super();
    }

    
      login(e) {
        firebase
          .auth()
          .signInWithEmailAndPassword("ahell@kth.se", "111111")
          .catch(function(error) {});
      }
    
      firstUpdated() {
        super.firstUpdated();
    
        getRenderData.call(this, loggedoutHeaderSchemas).then(renderdata => {
            renderdata.forEach(prop => {
              if (prop.name == "header") {
                this.header = prop;
              }
            });
            this.renderheader = this.header;
            this.okToRender = true;
            this.requestUpdate();
          });
      }


    render() {
        return this.okToRender
      ? html`
          <style>
            .container {
              display: grid;

              grid-template-areas:
                "header header header"
                "content content side"
                "footer footer footer";

              grid-template-columns: 200px 1fr 200px;
              grid-template-rows: auto 1fr auto;
              grid-gap: 10px;

              height: 100vh;
              margin-left: 50px;
              margin-right: 50px;
            }

            header {
              grid-area: header;
              margin-left: 0.5rem;
              margin-right: 0.5rem;
            }

            nav {
              grid-area: nav;
              margin-left: 0.5rem;
              background-color: firebrick;
            }

            main {
              grid-area: content;
              background-color: darkblue;
            }

            aside {
              grid-area: side;
              margin-right: 0.5rem;
              background-color: saddlebrown;
            }

            footer {
              grid-area: footer;
            }

            @media (max-width: 768px) {
              .container {
                grid-template-areas:
                  "header"
                  "nav"
                  "content"
                  "side"
                  "footer";

                grid-template-columns: 1fr;
                grid-template-rows:
                  auto /* Header */
                  minmax(75px, auto) /* Nav */
                  1fr /* Content */
                  minmax(75px, auto) /* Sidebar */
                  auto; /* Footer */
              }

              nav,
              aside {
                margin: 0;
              }
            }
          </style>

          <div class="container">
            <header>
              ${toRender.call(this, prepareRender(this.renderheader))}
            </header>

            <!-- <nav>
        
        
      </nav> -->

            <main>
              <slot></slot>
              
              <!-- Main content -->
            </main>

            <aside>
              <!-- Sidebar / Ads -->
              <button @click=${e => this.login(e)}>LOGIN</button>
            </aside>

            <footer><x-footer></x-footer></footer>
          </div>
        `
      : html``;
    }
}


customElements.define('x-home', XHome);
