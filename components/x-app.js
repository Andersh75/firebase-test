import { html, LitElement } from "lit-element";
import "./x-header.js";
import "./x-menu-button";
import "./x-footer";
import "./x-one";
import "./x-b";
import "./x-c";
import "./x-d";
import { action } from "../redux/actions.js";
import { loggedinHeaderSchemas } from "../schemas/x-header-schemas.js";
import { loggedoutHeaderSchemas } from "../schemas/x-header-schemas.js";
import { Router } from '@vaadin/router'
import {
  rx,
  toRender,
  getRenderData,
  prepareRender
} from "../utils/whcg-functions.js";

import { connectmixin } from "../mixins/connectmixin.js";
import { reduxmixin } from "../mixins/reduxmixin.js";
import { rxmixin } from "../mixins/rxmixin.js";
import * as R from "ramda/es/index.js";

let props = () => [
  {
    propKey: "selectedmenu",
    propValue: { type: String },
    rx: true,
    path: ["menu", "selected"]
  },
  {
    propKey: "okToRender",
    propValue: { type: Boolean },
    rx: true,
  }
];

class XApp extends reduxmixin(props, rxmixin(props, connectmixin(props, LitElement))) {
  constructor() {
    super();
    this.okToRender = false
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.selectedmenu = 0;
        Router.go("/antaganden");
        this.requestUpdate()
      } else {
        this.requestUpdate()
        Router.go("/");  
      }
    });
  }

  menuchangedHandler(e) {

    if (e.detail.value == 0) {
      Router.go("/antaganden");
    }
    if (e.detail.value == 1) {
      Router.go("/investeringsprogram");
    }
    if (e.detail.value == 2) {
      Router.go("/kostnader");
    }
    if (e.detail.value == 3) {
      Router.go("/resultat");
    }

    this.store.dispatch(
      action.menu_selected(e.detail.value)
    );
  }

  login(e) {
    firebase
      .auth()
      .signInWithEmailAndPassword("ahell@kth.se", "111111")
      .catch(function(error) {});
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
          this.okToRender = true;
          this.requestUpdate();
        });
      });

    getRenderData.call(this, loggedoutHeaderSchemas).then(renderdata => {
      renderdata.forEach(prop => {
        if (prop.name == "header") {
          this.header = prop;
        }
      });
      this.renderloggedoutheader = this.header;
      this.okToRender = true;
      this.requestUpdate();
    });


    rx.latestCombiner([this.okToRender$])
      .pipe(rx.undefinedElementRemover)
      .subscribe(() => {
        if (this.okToRender) {
          const outlet = this.shadowRoot.getElementById("outlet");
          const router = new Router(outlet);
          router.setRoutes([
            { path: '/antaganden', action: this.antagandenAction.bind(this) },
            { path: '/investeringsprogram', component: 'x-b' },
            { path: '/kostnader', component: 'x-c' },
            { path: '/resultat', component: 'x-d' },
            { path: '(.*)', component: 'x-d' }
          ]);
        }

      })

  }

  antagandenAction(context, commands) {
    let el = commands.component('x-one');
  
    el.storeHolder = this
    el.stateChanged(this.store.getState())
    
    return el;  
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
          ${this.user.currentUser ? toRender.call(this, prepareRender(this.renderheader)) : toRender.call(this, prepareRender(this.renderloggedoutheader))}
        </header>

        <!-- <nav>
    
    
  </nav> -->

        <main>
          <div id="outlet"></div>
        
          
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

customElements.define("x-app", XApp);

{/*  */}