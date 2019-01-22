import * as Redux from 'redux/es/redux';
import { persistentStore } from 'redux-pouchdb';
import { persistentReducer } from 'redux-pouchdb';
import { reducer } from './reducer.js';
import logger from 'redux-logger'

export function storeCreator(username, state, db) {   
    
    const applyMiddlewares = Redux.applyMiddleware(
        logger
      );
    
    const createStoreWithMiddleware = Redux.compose(
        applyMiddlewares,
        persistentStore(db)
    )(Redux.createStore);

    const store = createStoreWithMiddleware(persistentReducer(reducer, username), state);

    return store;
}


