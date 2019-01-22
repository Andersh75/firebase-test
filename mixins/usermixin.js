import { html, LitElement} from 'lit-element';

export const usermixin = (props, superClass) => {
    return class UserMixedin extends superClass {

        static get properties() {
            return {...props().reduce((acc, prop) => {
                return { ...acc, [prop.propKey]: prop.propValue }
            }, {}), user: {type: Object}}
        }


        constructor() {
            super();
            this.user = firebase.auth();
        }
    } 
}
