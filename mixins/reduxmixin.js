import { action } from "../redux/actions.js";
import { html, LitElement} from 'lit-element';
import * as R from "ramda/es/index.js";

export const reduxmixin = (props, superClass) => {
    return class ReduxMixin extends superClass {

        static get properties() {
            return props().reduce((acc, prop) => {
                return { ...acc, [prop.propKey]: prop.propValue }
            }, {})
        }
        
        valueChanged(e) {
          this.storeHolder.store.dispatch(action[`${e.path[0].id}Value`](e.detail.value));
        }

        stateChanged(state) {
            this.scenario = chosenScenario;
            props().forEach(prop => {
                console.log('IN STORE UPDATED', prop)
  
                if (prop.path) {
                   
                    if(R.is(Array, prop.path.reduce((acc, item) => {
                      
                            return acc[item]
                        }, state))) 
                    {
                        if (!R.equals(this[prop.propKey], prop.path.reduce((acc, item) => {
                            return acc[item]
                        }, state))) {
                            this[prop.propKey] = [...prop.path.reduce((acc, item) => {
                               
                                return acc[item]
                            }, state)]
                        }
                    } else if(R.is(Object, prop.path.reduce((acc, item) => {
                            return acc[item]
                        }, state))) 
                    {
                    
                        this[prop.propKey] = {...prop.path.reduce((acc, item) => {
                        
                            return acc[item]
                        }, state)}
                    } else {
                        
                        if (!R.equals(this[prop.propKey], prop.path.reduce((acc, item) => {
                            return acc[item]
                        }, state))) {
              
                            this[prop.propKey] = prop.path.reduce((acc, item) => {
                               
                                return acc[item]
                            }, state)
                        }
                    }
                }
            });
        }

        
        // stateChanged(state) {
        //   props.forEach(prop => {
        //       if (this[prop.propKey] !== state[prop.propKey] && state[prop.propKey] != undefined) {
        //           this[prop.propKey] = state[prop.propKey];
        //       }
        //   });
        // }
    } 
}
