import React from 'react';
import App from '../App';
import { createMockStoreFactory, mountConnectedComponent, snapshotify } from './utils/test-utils'

describe('Render and test App component',()=>{
  const initialState = {output:10};
  const mockStoreFactory = createMockStoreFactory();
  let store, wrapper;

  beforeEach(()=>{
    store = mockStoreFactory(initialState);
    wrapper = mountConnectedComponent(App, store);
  });

  it('Render App in loading state (snapshot)', () => {
    expect(snapshotify(wrapper)).toMatchSnapshot();
  });

});
