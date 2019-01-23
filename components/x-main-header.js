import { html, LitElement } from 'lit-element';
import { rxmixin } from "../mixins/rxmixin.js";
import { rx, toRender, prepareRender } from "../utils/whcg-functions.js";
import * as R from "ramda/es/index.js";
;

let props = () => ([
    { propKey: "props", propValue: { type: Object }, rx: false },
    { propKey: "data", propValue: { type: Object }, rx: true },
    { propKey: "comment", propValue: { type: String }, rx: true },
    { propKey: "label", propValue: { type: String }, rx: true },
    { propKey: "okToRender", propValue: { type: Boolean }, rx: false },
    { propKey: "page", propValue: { type: Boolean }, rx: false },
  ]);

export class XMainHeader extends rxmixin(props, LitElement) {
    constructor() {
        super()
        this.renderdata = false
        this.rendercomment = false
        this.renderlabel = false
        this.okToRender = false;
        this.page = false;
    }

    leftHandler(e) {
        // console.log(e)
        if(page > 0) {
            page = +page - 1
        }

        let event = new CustomEvent('tablepagingchanged');
        this.dispatchEvent(event);
        
    }

    rightHandler(e) {
        console.log(rowlength)

        if (+rowlength / (+page + 1) > 10) {
            page = +page + 1
        }
        

        let event = new CustomEvent('tablepagingchanged');
        this.dispatchEvent(event);
    }

    firstUpdated() {
        super.firstUpdated();
        rx.latestCombiner([this.data$, this.comment$, this.label$])
        .pipe(rx.undefinedElementRemover)
        .subscribe(() => {
            this.renderdata = this.data;
            this.rendercomment = this.comment;
            this.renderlabel = this.label;
            this.okToRender = true;
            this.requestUpdate();
        })
    }

      updated(changedProperties){
        super.updated(changedProperties)
        changedProperties.forEach((oldValue, propName) => {
          if (propName === "props") {
            this.props.forEach(prop => {
                if (prop.name == 'label') {
                    this.label = prop;
                }
                if (prop.name == 'data') {
                    this.data = prop;
                }
                if (prop.name == 'comment') {
                    this.comment = prop;
                }
            })
          };
        }); 
    }

    render() {
        
        return this.okToRender ? html`
              <style>
        
            .row {
                display: grid;
                grid-template-columns: repeat(10, 1fr);
                grid-column-gap: 20px;
                grid-template-areas: 
                    "label      label       label    .        data        comment         comment         comment         left         right";
                border-bottom: 2px solid var(--color-text);
                align-items: center;
                font: var(--font-main-header);
                color: var(--color-text); 
            }

            .label {
                grid-area: label; 

            }

            .data {
                grid-area: data; 
            }

            .comment {
                grid-area: comment;
            }

            .left {
                grid-area: left;
            }

            .right {
                grid-area: right;
                justify-self: end;
                display: grid;
                grid-gap: 20px;
                grid-template-columns: auto auto;
            }

            .arrow {
                max-height: 1.0em;
                max-width: 1.0em;
                margin-bottom: -2px;
            } 
    </style>
    <div class="row">
        <div class="label">${toRender.call(this, prepareRender(this.renderlabel))}</div>
        <div class="data">${toRender.call(this, prepareRender(this.renderdata))}</div>
        <div class="comment">${toRender.call(this, prepareRender(this.rendercomment))}</div>
        ${this.page ? html`<div class="right"><div @click="${e => this.leftHandler(e)}"><svg class="arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 492 492" style="enable-background:new 0 0 492 492;" xml:space="preserve" width="512px" height="512px">
<g>
	<g>
		<path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12    C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084    c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864    l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z" fill="#FFFFFF"/>
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
</svg></div><div @click="${e => this.rightHandler(e)}"><svg class="arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 492.004 492.004" style="enable-background:new 0 0 492.004 492.004;" xml:space="preserve" width="512px" height="512px">
<g>
	<g>
		<path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z" fill="#FFFFFF"/>
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
</svg>
</div></div>
` : ``}
    </div>
        ` : html``
    }
}

customElements.define('x-main-header', XMainHeader);


// <div class="left">Tidigare</div>