import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'

import sagas from './sagas';
import { IUserStore, userReducer } from './UserInfo';

export interface IStore {
    user: IUserStore
};

const rootReducer = combineReducers({
    user: userReducer
});

const windowIfDefined = typeof window === 'undefined' ? null : window as any;
const composeEnhancers = windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
    const store = createStore(
        rootReducer,
        {},
        composeEnhancers(applyMiddleware(sagaMiddleware))
    );

    if (process.env.NODE_ENV !== "production") {
        if (module.hot) {
            module.hot.accept('.', () => {
                store.replaceReducer(rootReducer);
            })
        }
    }

    return store;
}

const store = configureStore();

sagas.forEach(saga => sagaMiddleware.run(saga.dispatchAsync));

export default store;