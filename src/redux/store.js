// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { initialState } from './reducers';
import { combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history'
import type {AppStore} from "./reducers";

export const history = createBrowserHistory();

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    store: reducers
});

export function configureStore(initState: AppStore) {
    return createStore(
        createRootReducer(history),
        initState ? initState : { store: initialState},
        applyMiddleware(
            routerMiddleware(history),
            thunk,
        ),
    );
}
