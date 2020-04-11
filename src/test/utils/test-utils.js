import React from "react";
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import rootReducer from "../../redux/reducers";
import fs from 'fs';


const middlewares = compose(applyMiddleware(thunk));

export const createStoreWithMiddleWare = compose(middlewares)(createStore);

export const makeStore = (initialState) => createStoreWithMiddleWare(rootReducer, initialState);

export const mountConnectedComponent = (Component, store) => mount( <Provider store={store}><Component /></Provider> );

export const snapshotify = reactWrapper => reactWrapper.html();

export const readTestData = (testDataFilePath) => {
    const jsonString = fs.readFileSync(testDataFilePath);
    return JSON.parse(jsonString);
};