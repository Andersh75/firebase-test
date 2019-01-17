import { html, LitElement} from 'lit-element';

export const propsmixin = (props, superClass) => {
    return class PropsMixin extends superClass {

        static get properties() {
            return props().reduce((acc, prop) => {
                return { ...acc, [prop.propKey]: prop.propValue }
            }, {})
        }
    } 
}