import React from "react";
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme';
import thunk from 'redux-thunk';


export const createMockStoreFactory = () => configureStore([thunk]);

export const mountConnectedComponent = (Component, store) => mount( <Provider store={store}><Component /></Provider> );

export const snapshotify = reactWrapper => reactWrapper.html();
