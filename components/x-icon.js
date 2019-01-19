import { html, LitElement } from 'lit-element';
import { propsmixin } from "../mixins/propsmixin.js";

let props = () => ([
    { propKey: "props", propValue: { type: Object }, rx: false },
    { propKey: "value", propValue: { type: String }, rx: false },
  ]);

export class XIcon extends propsmixin(props, LitElement) {

    clickHandler() {
        let event = new CustomEvent('loggedout');
        this.dispatchEvent(event);
    }

    updated(changedProperties) {
        super.updated(changedProperties)
        changedProperties.forEach((oldValue, propName) => {
            if (propName === "props") {
                this.value = this.props.data_schema.value;
            };
        });
    }

    render() {
       
        return html`
            <style>
            .in {
                display: flex;
                justify-content: center;
                align-items: center;                    
                /* font: var(--font-menu);
                color: var(--color-menu);  */
                border-bottom: 2px solid var(--color-transparent);
                max-height: 40px;
                max-width: 40px;
                fill: var(--color-menu);
            }

            .out {
                display: flex;
                justify-content: center;
                align-items: center;                    
                /* font: var(--font-menu);
                color: var(--color-menu);  */
                border-bottom: 2px solid var(--color-transparent);
                max-height: 30px;
                max-width: 30px;
                fill: var(--color-menu);
            }

            .selected {
                transition: border-bottom 0.1s ease-in;
                border-bottom: 2px solid var(--color-attention);
            }

            </style>
            <div @click="${e => this.clickHandler(e)}">
${this.value == 'in' ? html`<svg class="in" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 311.541 311.541" style="enable-background:new 0 0 311.541 311.541;" xml:space="preserve">
<g>
<g>
<path d="M155.771,26.331C69.74,26.331,0,96.071,0,182.102c0,37.488,13.25,71.883,35.314,98.761    c3.404-27.256,30.627-50.308,68.8-61.225c13.946,12.994,31.96,20.878,51.656,20.878c19.233,0,36.894-7.487,50.698-19.936    c38.503,11.871,65.141,36.27,66.017,64.63c24.284-27.472,39.056-63.555,39.056-103.108    C311.541,96.071,241.801,26.331,155.771,26.331z M155.771,222.069c-9.944,0-19.314-2.732-27.634-7.464    c-20.05-11.409-33.855-34.756-33.855-61.711c0-38.143,27.583-69.176,61.489-69.176c33.909,0,61.489,31.033,61.489,69.176    c0,27.369-14.237,51.004-34.786,62.215C174.379,219.523,165.346,222.069,155.771,222.069z" fill="#FFFFFF"/>
</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>` : html`<svg class="out" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 95.667 95.667" style="enable-background:new 0 0 95.667 95.667;" xml:space="preserve">
<g>
<g>
<path d="M39.173,72.344l39.447-22.777c0.619-0.356,1-1.018,1-1.731s-0.381-1.375-1-1.732L39.173,23.324    c-0.619-0.357-1.381-0.357-2,0c-0.619,0.357-1,1.018-1,1.732v10.605H2.121c-1.104,0-2,0.896-2,2v20.344c0,1.104,0.896,2,2,2    h34.053v10.604c0,0.716,0.381,1.375,1,1.732c0.31,0.18,0.655,0.268,1,0.268C38.519,72.609,38.864,72.521,39.173,72.344z" fill="#FFFFFF"/>
<path d="M80.775,0H40.026c-1.104,0-2,0.896-2,2v6c0,1.104,0.896,2,2,2h40.749c2.632,0,4.771,2.141,4.771,4.771v66.125    c0,2.631-2.141,4.771-4.771,4.771H40.026c-1.104,0-2,0.896-2,2v6c0,1.104,0.896,2,2,2h40.749c8.146,0,14.771-6.627,14.771-14.771    V14.772C95.546,6.627,88.92,0,80.775,0z" fill="#FFFFFF"/>
</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>`}

</div>
           

          
            
              
        `;
    }
}

customElements.define('x-icon', XIcon);

// <div class="button" @click="${() => this.clickHandler()}">${this.value}</div> 


{/* <div @click="${e => this.clickHandler(e)}">
${this.value == 'in' ? html`<svg class="in" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 311.541 311.541" style="enable-background:new 0 0 311.541 311.541;" xml:space="preserve">
<g>
<g>
<path d="M155.771,26.331C69.74,26.331,0,96.071,0,182.102c0,37.488,13.25,71.883,35.314,98.761    c3.404-27.256,30.627-50.308,68.8-61.225c13.946,12.994,31.96,20.878,51.656,20.878c19.233,0,36.894-7.487,50.698-19.936    c38.503,11.871,65.141,36.27,66.017,64.63c24.284-27.472,39.056-63.555,39.056-103.108    C311.541,96.071,241.801,26.331,155.771,26.331z M155.771,222.069c-9.944,0-19.314-2.732-27.634-7.464    c-20.05-11.409-33.855-34.756-33.855-61.711c0-38.143,27.583-69.176,61.489-69.176c33.909,0,61.489,31.033,61.489,69.176    c0,27.369-14.237,51.004-34.786,62.215C174.379,219.523,165.346,222.069,155.771,222.069z" fill="#FFFFFF"/>
</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>` : html`<svg class="out" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 95.667 95.667" style="enable-background:new 0 0 95.667 95.667;" xml:space="preserve">
<g>
<g>
<path d="M39.173,72.344l39.447-22.777c0.619-0.356,1-1.018,1-1.731s-0.381-1.375-1-1.732L39.173,23.324    c-0.619-0.357-1.381-0.357-2,0c-0.619,0.357-1,1.018-1,1.732v10.605H2.121c-1.104,0-2,0.896-2,2v20.344c0,1.104,0.896,2,2,2    h34.053v10.604c0,0.716,0.381,1.375,1,1.732c0.31,0.18,0.655,0.268,1,0.268C38.519,72.609,38.864,72.521,39.173,72.344z" fill="#FFFFFF"/>
<path d="M80.775,0H40.026c-1.104,0-2,0.896-2,2v6c0,1.104,0.896,2,2,2h40.749c2.632,0,4.771,2.141,4.771,4.771v66.125    c0,2.631-2.141,4.771-4.771,4.771H40.026c-1.104,0-2,0.896-2,2v6c0,1.104,0.896,2,2,2h40.749c8.146,0,14.771-6.627,14.771-14.771    V14.772C95.546,6.627,88.92,0,80.775,0z" fill="#FFFFFF"/>
</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>`}

</div> */}