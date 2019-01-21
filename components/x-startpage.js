import { html, LitElement } from 'lit-element';
import { reduxmixin } from "../mixins/reduxmixin.js";

let props = () => ([]);

export class XStartpage extends reduxmixin(props, LitElement) {
    // onBeforeEnter(location, commands, router) {
    //     if (!firebase.auth().currentUser) {
    //         return commands.redirect('/')
    //     }
    //     console.log('GOING INTO USERS')
    // }

    constructor() {
        super();
        firebase.auth().onAuthStateChanged((user) => {
            this.requestUpdate();
          });
        this.amHidden = 'hidden';
    }

    firstUpdated() {
        super.firstUpdated();
        // console.log(Popper)
    }

    clicked(e) {
        // console.log(e)
        var reference = this.shadowRoot.querySelector('.my-button');
        var popper = this.shadowRoot.querySelector('.my-popper');
        // console.log(reference)

        this.amHidden = 'visible'
        var popperInstance = new Popper(reference, popper, {
            placement: 'right'
        });
        this.requestUpdate();
    }

    clicked2(e) {
        this.amHidden = 'hidden'
        this.requestUpdate();
    }
    render() {
       
        return html`
        <style>
            div {
                min-height: 60vh;
                color: var(--color-text);
                font: var(--font-table-rowheader);
            }

            .my-popper {
                visibility: ${this.amHidden};
            }
        </style>

        <div>
        ${firebase.auth().currentUser ? 'PLACEHOLDER TEXT - STARTSIDA INLOGGAD. HÄR LÄGGER VI IN BILDER OCH TEXT OM KALKYLKODELLEN FÖR DEN SOM LOGGAT IN' : 'PLACEHOLDER TEXT - STARTSIDA EJ INLOGGAD. HÄR LÄGGER VI IN BILDER OCH TEXT OM KALKYLKODELLEN FÖR DEN SOM INTE ÄNNU LOGGAT IN'}
            
        </div>`;
    }
}

customElements.define('x-startpage', XStartpage);
{/* <button class="my-button" @mouseover="${e => this.clicked(e)}"  @mouseout="${e => this.clicked2(e)}">reference</button>
<button class="my-popper">popper</button> */}

// ${JSON.stringify(firebase.auth().currentUser)}