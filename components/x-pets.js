import { html, LitElement } from "lit-element";
import "./x-header.js";
import "./x-menu-button";
import "./x-footer";
import * as R from "ramda/es/index.js";
import { action } from "../redux/actions.js";
import { loggedinHeaderSchemas } from "../schemas/x-header-schemas.js";
import {
  rx,
  toRender,
  getRenderData,
  prepareRender
} from "../utils/whcg-functions.js";

import { connectmixin } from "../mixins/connectmixin.js";
import { reduxmixin } from "../mixins/reduxmixin.js";
import { rxmixin } from "../mixins/rxmixin.js";

let props = () => [
  {
    propKey: "selectedmenu",
    propValue: { type: String },
    rx: true,
    path: ["menu", "selected"]
  }
];

class XPets extends reduxmixin(
  props,
  rxmixin(props, connectmixin(props, LitElement))
) {
    constructor() {
        super();
        this.renderblock = true
    }

    onBeforeEnter(location, commands, router) {
      if (!firebase.auth().currentUser) {
          return commands.redirect('/')
      }
      
  }


    menuchangedHandler(e) {

      if (e.detail.value == 0) {
        window.dispatchEvent(
          new CustomEvent('vaadin-router-go', {detail: {pathname: '/antaganden'}}));
      }
      if (e.detail.value == 1) {
        window.dispatchEvent(
          new CustomEvent('vaadin-router-go', {detail: {pathname: '/investeringsprogram'}}));
      }
      if (e.detail.value == 2) {
        window.dispatchEvent(
          new CustomEvent('vaadin-router-go', {detail: {pathname: '/kostnader'}}));
      }
      if (e.detail.value == 3) {
        window.dispatchEvent(
          new CustomEvent('vaadin-router-go', {detail: {pathname: '/resultat'}}));
      }

        console.log('MC', e)
        this.store.dispatch(
          action.menu_selected(e.detail.value)
        );
      }

      loggedoutHandler(e) {
        firebase
        .auth()
        .signOut()
        .then(
          function() {
            console.log("Signed Out");
          },
          function(error) {
            console.error("Sign Out Error", error);
          }
        );
      }

    getData(value, index) {
        switch (value) {
          case "selectedmenu":
            return +this.selectedmenu == index ? true : false;
        }
      }
    
      firstUpdated() {
        super.firstUpdated();
        // getRenderData.call(this, loggedinHeaderSchemas).then(renderdata => {
        //   renderdata.forEach(prop => {
        //     if (prop.name == "header") {
        //       this.header = prop;
        //     }
        //   });
        //   this.renderheader = this.header;
        //   this.okToRender = true;
        //   this.requestUpdate();
        // });
    
        rx.latestCombiner([this.selectedmenu$])
          .pipe(rx.undefinedElementRemover)
          .subscribe(() => {
            getRenderData.call(this, loggedinHeaderSchemas).then(renderdata => {
              renderdata.forEach(prop => {
                if (prop.name == "header") {
                  this.header = prop;
                }
              });
              this.renderheader = this.header;
              this.okToRender = this.renderblock;
              this.requestUpdate();
            });
          });
      }
    
      // updated(changedProperties) {
      //   super.updated(changedProperties);
      //   changedProperties.forEach((oldValue, propName) => {
      //     if (propName === "selectedmenu") {
      //       if (this.selectedmenu == 0 && this.location.pathname != '/antaganden') {
      //         console.log(this.location.pathname)
      //         this.renderblock = false
      //         window.dispatchEvent(
      //           new CustomEvent('vaadin-router-go', {detail: {pathname: '/antaganden'}}));
      //       }
      //       if (this.selectedmenu == 1 && this.location.pathname != '/investeringsprogram') {
      //         console.log(this.location.pathname)
      //         this.renderblock = false
      //         window.dispatchEvent(
      //           new CustomEvent('vaadin-router-go', {detail: {pathname: '/investeringsprogram'}}));
      //       }
      //       if (this.selectedmenu == 2 && this.location.pathname != '/kostnader') {
      //         this.renderblock = false
      //         window.dispatchEvent(
      //           new CustomEvent('vaadin-router-go', {detail: {pathname: '/kostnader'}}));
      //       }
      //       if (this.selectedmenu == 3 && this.location.pathname != '/resultat') {
      //         this.renderblock = false
      //         window.dispatchEvent(
      //           new CustomEvent('vaadin-router-go', {detail: {pathname: '/resultat'}}));
      //       }
      //   };
      //   });
      // }

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
            
            </aside>

            <footer><x-footer></x-footer></footer>
          </div>
        `
      : html``;
    }
}


customElements.define('x-pets', XPets);
