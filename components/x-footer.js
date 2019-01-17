import { html, LitElement} from 'lit-element';
import { rxmixin } from "../mixins/rxmixin.js";
import { rx, toRender, prepareRender, getData } from "../utils/whcg-functions.js";
import { grid } from "../css/grid.css.js";


let props = () => ([
  ]);


class XFooter extends rxmixin(props, LitElement) {
    constructor() {
        super()
        this.okToRender = true;
    }

    render() {
        return this.okToRender ? html`
        ${grid}
        <style>
            
                .footer-rows {
                    grid-template-rows: 30px auto;
                }

                .footer-headline {
                    font: var(--font-footer-headline);
                    color: var(--color-footer-headline); 
                    align-self: start;
                    white-space: nowrap;
                }

                .footer-body {
                    align-self: start;
                }

                .footer-body-section {
                    padding-bottom: 16px;
                }

                
                .footer-subhedline {
                    font: var(--font-footer-subheadline);
                    color: var(--color-footer-subheadline); 
                    padding-bottom: 5px;
                }


                .footer-subexplain {
                    font: var(--font-footer-subexplain);
                    color: var(--color-footer-subheadline); 
                }
            
        </style>



    
            <div class="grid-12">
                <div class="col1span4 grid-4 footer-rows">
                    <div class="col1span4 footer-headline">
                        OM MODELLEN
                    </div>
                    <div class="col1span4 footer-body">
                        <div class="footer-body-section">
                            <div class="footer-subhedline">
                                Information
                            </div>
                            <div class="footer-subexplain">
                            Med vårt kalkylprogram är det lätt att jämföra kostnadseffektiviteten i olika byggnadsalternativ. Kalkylprogrammet är utvecklat i samarbete med KTH och Sitemakr som är ett expertföretag specialiserat på webblösningar för den offentliga fastighetssektorn.</div>
                        </div>
                    </div>
                </div>
                <div class="col8span2 grid-2 footer-rows">
                    <div class="col1span2 footer-headline">
                        KONTAKTA OSS
                    </div>

                    <div class="col1span2 footer-body">
                        <div class="footer-body-section">
                            <div class="footer-subhedline">
                                Information
                            </div>
                            <div class="footer-subexplain">
                                08-783 24 12
                                info@parmaco.se
                            </div>
                        </div>
                        <div class="footer-body-section">
                            <div class="footer-subhedline">
                                Webbsupport
                            </div>
                            <div class="footer-subexplain">
                                073-312 69 89
                                info@sitemakr.se
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col10span3 grid-3 footer-rows">

                        <div class="col1span3 footer-headline">
                                TA DEL AV VÅRAT NYHETSBREV
                        </div>

                        <div class="col1span3 footer-body">
                            <div class="footer-body-section">
                                <div class="footer-subhedline">
                                    Information
                                </div>
                                <div class="footer-subexplain">
                                    Få den senaste informationen om utvecklingen på marknaden för hyrda skollokaler
                                </div>
                            </div>
                            <div class="footer-body-section">
                                <whcg-search-box>
                                </whcg-search-box>
                            </div>
                        </div>       
                </div>
            </div>
        
            ` : html``
    }

}

window.customElements.define('x-footer', XFooter);