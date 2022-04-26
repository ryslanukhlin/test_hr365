import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import adressReducer from './adress/adressReducer';
import rootSaga from './wather';

const combineReducer = combineReducers({
    adressReducer,
});

const enhancers = [];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension =
        (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || compose;
    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension);
    }
}

const sagaMiddleware = createSagaMiddleware();
const composedEnhancers = compose(applyMiddleware(sagaMiddleware), ...enhancers);

export const store = createStore(combineReducer, composedEnhancers);
sagaMiddleware.run(rootSaga);
