import * as rxjs from 'rxjs';
import { html, LitElement} from 'lit-element';

export const rxmixin = (props, superClass) => {
    return class RxMixin extends superClass {
        firstUpdated() {
            super.firstUpdated();
            props().forEach(prop => {
                if(prop.rx) {
                    this[`${prop.propKey}$`] = new rxjs.BehaviorSubject();
                }
            })
        }

        updated(changedProps) {
            super.updated(changedProps);
            changedProps.forEach((value, key) => {
                console.log(key)
                if (this[`${key}$`] !== undefined && this[`${key}$`] !== null) {
                    this[`${key}$`].next(this[key])
                }
            });
        }

        static get properties() {
            return props().reduce((acc, prop) => {
                return { ...acc, [prop.propKey]: prop.propValue }
            }, {})
        }
    } 
}
