import { html, LitElement } from "lit-element";
import { Router } from "@vaadin/router";
import "./x-home.js";
import "./x-pets.js";
import "./x-root.js";
import "./x-a.js";
import "./x-b.js";
import "./x-c.js";
import "./x-d.js";
import { connectmixin } from "../mixins/connectmixin.js";
import { reduxmixin } from "../mixins/reduxmixin.js";

let props = () => [
  {
    propKey: "selectedmenu",
    propValue: { type: String },
    rx: true,
    path: ["menu", "selected"]
  }
];

class XApp extends reduxmixin(props, connectmixin(props, LitElement)) {
  constructor() {
    super();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('signing in')
        console.log(this.selectedmenu)
        Router.go("/pets");
      } else {
        console.log('signing out')
        // Router.go("/");
      }
    });
  }

  firstUpdated() {
    super.firstUpdated();

    const outlet = this.shadowRoot.getElementById("outlet");
    const router = new Router(outlet);
    // router.setRoutes([
    //   {
    //     path: '/', component: 'x-root', children: [
    //       {
    //         path: '/antaganden', component: 'x-pets', children: [
    //           { path: '/', component: 'x-a' },
    //         ]
    //       },
    //       {
    //         path: '/investeringsprogram', component: 'x-pets', children: [
    //           { path: '/', component: 'x-b' },
    //         ]
    //       },
    //       {
    //         path: '/kostnader', component: 'x-pets', children: [
    //           { path: '/', component: 'x-c' },
    //         ]
    //       },
    //       {
    //         path: '/resultat', component: 'x-pets', children: [
    //           { path: '/', component: 'x-d' },
    //         ]
    //       },
    //       {
    //         path: '/', component: 'x-home', children: [
    //           { path: '/', component: 'x-a' },
    //           {path: '(.*)', component: 'x-a'},
    //         ]
    //       },
    //     ]
    //   },
    // ]);

    router.setRoutes([
      {path: '/pets',
        component: 'x-pets',
        children: [
          {path: '/', component: 'x-a'},
          {path: '/b', component: 'x-b'},
        ]
      }
    ]);
  
  }

  render() {
    return html`
      <div id="outlet"></div>
    `
  }
}

customElements.define("x-app", XApp);
