import { html, LitElement } from 'lit-element';
import { reduxmixin } from "../mixins/reduxmixin.js";
import { grid } from "../css/grid.css.js";

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
        ${grid}
        <style>

            .grid {
                /* display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                
                grid-template-areas: "one two three four"
                "five six seven eight"
                "nine ten eleven twelve"; */
                /* grid-template-rows: 72px auto 42px auto auto 42px auto; */
                grid-template-rows: 72px auto auto auto auto auto;
                min-height: 80vh;
                color: var(--color-text);
                font: var(--font-table-rowheader); 
            
  /* background-image: url("../images/bg-masthead.jpg"); */
  /* background-image: url("../images/daghemsbuggnade-blomman-pohja.png"); */

height: 100%; 

background-position: center;
background-repeat: no-repeat;
background-size: cover;
            }



            .my-popper {
                visibility: ${this.amHidden};
            }

            .header {
                font: var(--font-subheader);
                color: var(--color-text);
                /* justify-self: end; */
            }

            .text {
                font: var(--font-menu);
                color: var(--color-text);
                /* justify-self: end; */
            }

            .subheader {
                font: var(--font-subsubheader);
                color: var(--color-text);
             
                /* justify-self: end; */
            }
        </style>

        <div class="grid grid-12">
            <div class="col9span3"></div>
            <div class="col1span7 header">PARMACOMODELLEN</div>
            <div class="col1span5 text"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>
            <!-- <div class="col1span5 text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            <div class="col1span5 text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div> -->

            <!-- <div class="col1span5 subheader">RUBRIK</div>
            <div class="col1span5 text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        -->
        </div>`;
    }
}

customElements.define('x-startpage', XStartpage);
{/* <button class="my-button" @mouseover="${e => this.clicked(e)}"  @mouseout="${e => this.clicked2(e)}">reference</button>
<button class="my-popper">popper</button> */}

// ${JSON.stringify(firebase.auth().currentUser)}

// ${firebase.auth().currentUser ? 'PLACEHOLDER TEXT - STARTSIDA INLOGGAD. HÄR LÄGGER VI IN BILDER OCH TEXT OM KALKYLKODELLEN FÖR DEN SOM LOGGAT IN' : 'PLACEHOLDER TEXT - STARTSIDA EJ INLOGGAD. HÄR LÄGGER VI IN BILDER OCH TEXT OM KALKYLKODELLEN FÖR DEN SOM INTE ÄNNU LOGGAT IN'}


{/* <div class="col1span5 subheader">RUBRIK</div> */}