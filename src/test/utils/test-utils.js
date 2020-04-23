import React from "react";
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { mount } from 'enzyme';
import { configureStore, history } from "../../redux/store";
import fs from 'fs';


export const makeStore = (initialState) => configureStore(initialState);

export const mountConnectedComponent = (Component, store) => mount( <Provider store={store}><ConnectedRouter history={history}><Component /></ConnectedRouter></Provider> );

export const snapshotify = reactWrapper => reactWrapper.html();

export const readTestData = (testDataFilePath) => {
    const jsonString = fs.readFileSync(testDataFilePath);
    return JSON.parse(jsonString);
};