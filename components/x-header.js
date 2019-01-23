import { html, LitElement} from 'lit-element';
import { rxmixin } from "../mixins/rxmixin.js";
import { rx, toRender, prepareRender } from "../utils/whcg-functions.js";
import * as R from "ramda/es/index.js";

let props = () => ([
    { propKey: 'menu', propValue: {type: Object}, rx: true },
    { propKey: 'icon', propValue: {type: Object}, rx: true },
    { propKey: 'props', propValue: {type: Object}, rx: false },
    { propKey: "okToRender", propValue: { type: Boolean }, rx: false },
  ]);

export class XHeader extends rxmixin(props, LitElement) {

    constructor() {
        super()
        this.renderthis = false
        this.okToRender = false;
    }

    menuchangedHandler(e) {
        let event = new CustomEvent('menuchanged', { detail: {value: e.detail.value} });
        this.dispatchEvent(event);        
    }

    loggedoutHandler(e) {
        let event = new CustomEvent('loggedout');
        this.dispatchEvent(event);  
    }

    loggedinHandler(e) {
        let event = new CustomEvent('loggedin');
        this.dispatchEvent(event);  
    }
    
      firstUpdated() {
        super.firstUpdated();
        rx.latestCombiner([this.menu$])
        .pipe(rx.undefinedElementRemover)
        .subscribe(() => {
            this.rendermenu = this.menu;
            this.rendericon = this.icon;
            // this.render = this.rendermenu
            this.okToRender = true;
            this.requestUpdate();
        })
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        changedProperties.forEach((oldValue, propName) => {
            if (propName === "props") {
                this.props.forEach(prop => {
                    if (prop.name == 'menu') {
                        this.menu = prop;
                    }
                    if (prop.name == 'icon') {
                        this.icon = prop;
                    }
                })
            };
        });

    }


    render() {
        return this.okToRender ? html`
            <style>
                .header {
                    display: grid;
         
                    padding-top: 10px;
                    grid-template-columns: repeat(12, 1fr);
                    grid-template-rows: repeat(1, 1fr);
                    grid-column-gap: 20px;
                    grid-template-areas: 
                        "logo    logo     logo     .    .     .    .     menu     menu     menu     menu     icon";                    
                }

                .logo {
                    grid-area: logo;
                    justify-self: start;
                }

                .img {
                    height: 5em;
                    width: 15.764705882352941em
                } 

                .menu {
                    grid-area: menu;
                    justify-self: end;
                    align-self: center;
                }

                .icon {
                    grid-area: icon;
                    justify-self: end;
                    align-self: center;
                }
            
            </style>
            <div class="header">
                <!-- <div class="logo"> <img src="./images/Crop.svg" alt="logo"></div> -->
                <div class="logo"><a href="http://www.parmaco.se"><svg class="img" viewBox="0 0 268 85" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 85H268V0H0V85Z" fill="#005F9A"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M256.047 33.5951C252.849 33.5951 251.251 36.4139 251.251 42.051C251.251 47.7011 252.849 50.5261 256.047 50.5261C259.143 50.5261 260.691 47.7073 260.691 42.0703C260.691 36.4202 259.143 33.5951 256.047 33.5951ZM264.22 51.6169C262.316 54.2186 259.534 55.5191 255.875 55.5191C252.37 55.5191 249.657 54.1993 247.74 51.5595C245.822 48.9192 244.863 45.7241 244.863 41.9742C244.863 38.1607 245.834 34.9792 247.778 32.4276C249.721 29.8771 252.49 28.6016 256.085 28.6016C259.718 28.6016 262.458 29.9629 264.307 32.6857C266.155 35.4095 267.079 38.5245 267.079 42.0322C267.079 45.8202 266.126 49.0153 264.22 51.6169ZM230.929 33.5951C227.743 33.5951 226.152 36.4333 226.152 42.1084C226.152 45.3865 226.584 47.6084 227.45 48.776C228.317 49.9424 229.527 50.5261 231.082 50.5261C233.603 50.5261 235.145 48.8811 235.706 45.59L241.617 45.9538C241.236 49.0789 240.075 51.4538 238.137 53.08C236.198 54.7069 233.823 55.5191 231.014 55.5191C227.569 55.5191 224.769 54.3272 222.614 51.9421C220.459 49.557 219.382 46.2601 219.382 42.051C219.382 38.1095 220.424 34.8832 222.508 32.3702C224.594 29.8578 227.441 28.6016 231.052 28.6016C237.307 28.6016 240.829 31.9757 241.617 38.7223L235.228 39.1242C235.139 35.438 233.706 33.5951 230.929 33.5951ZM205.371 35.7568L202.589 44.9204H208.104L205.371 35.7568ZM211.146 55.1178L209.542 49.7417H201.126L199.494 55.1178H194.148L202.491 29.0034H209.551L217.699 55.1178H211.146ZM184.457 55.1178V33.8248L177.909 55.1178H173.735L167.312 33.8248V55.1178H162.201V29.0034H171.697L176.266 44.6339L181.073 29.0034H190.597V55.1178H184.457ZM149.574 34.915C149.141 34.3409 148.671 33.9873 148.162 33.8532C147.654 33.7191 146.7 33.652 145.302 33.652H141.697V40.3105H145.435C146.656 40.3105 147.542 40.2241 148.096 40.0513C148.648 39.879 149.141 39.4971 149.574 38.9042C150.005 38.3108 150.222 37.6315 150.222 36.8664C150.222 36.1394 150.005 35.4891 149.574 34.915ZM151.995 43.5721L156.801 55.1178H150.063L146.066 44.768H141.697V55.1178H135.557V29.0034H146.999C149.11 29.0034 150.803 29.2484 152.081 29.7395C153.359 30.2307 154.418 31.1322 155.257 32.4447C156.096 33.7577 156.516 35.2174 156.516 36.8232C156.516 39.958 155.008 42.2084 151.995 43.5721ZM119.449 35.7568L116.666 44.9204H122.183L119.449 35.7568ZM125.224 55.1178L123.62 49.7417H115.204L113.572 55.1178H108.226L116.569 29.0034H123.629L131.777 55.1178H125.224ZM100.89 34.6854C100.209 34.0607 99.1767 33.7475 97.7914 33.7475H93.8433V40.6731H97.8101C99.3229 40.6731 100.385 40.3224 100.995 39.621C101.605 38.9201 101.91 38.1164 101.91 37.2109C101.91 36.1525 101.569 35.3106 100.89 34.6854ZM107.288 40.7885C106.779 42.0129 106.06 42.9758 105.133 43.6767C104.205 44.3792 103.305 44.8442 102.435 45.0738C101.564 45.3035 100.2 45.4183 98.3437 45.4183H94.0529V55.1178H87.8555V29.0034H98.1148C100.403 29.0034 102.155 29.249 103.369 29.7401C104.583 30.2312 105.666 31.1077 106.621 32.3702C107.574 33.6332 108.05 35.1827 108.05 37.0193C108.05 38.3079 107.796 39.5641 107.288 40.7885V40.7885Z" fill="#FFFFFE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M58.1634 27.6981C58.9271 28.3859 59.3102 29.2033 59.3102 30.1514L59.2971 44.5654H38.4175L27.6777 55.2313L79.0804 55.2364V22.8978C79.0804 21.0499 78.3155 19.4384 76.7868 18.0622C75.257 16.6878 73.4654 16 71.4098 16H0V69.427H19.7702V26.667H55.4352C56.4891 26.667 57.3985 27.0115 58.1634 27.6981" fill="#FFFFFE"/>
</svg></a></div>
                
                <div class="menu">
                    ${toRender.call(this, prepareRender(this.rendermenu))}
                </div>
                <div class="icon">
                    ${toRender.call(this, prepareRender(this.rendericon))}
                </div>
            </div>
            ` : html``
    }
}

customElements.define('x-header', XHeader);





