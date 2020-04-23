import React from 'react';
import App from '../App';
import { makeStore, mountConnectedComponent, snapshotify, readTestData } from './utils/test-utils'
import { resetIdCounter } from 'react-tabs';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);
mock.onGet("https://pomber.github.io/covid19/timeseries.json")
    .reply(200, readTestData('./src/test/test-data.json'));

describe('Render and test App component',()=>{
  let store, wrapper;

  beforeEach(()=>{
    resetIdCounter();
    store = makeStore();
    wrapper = mountConnectedComponent(App, store);
  });

  it('Render App in loading state (snapshot)', () => {
    expect(snapshotify(wrapper)).toMatchSnapshot();
  });

  it('Render App with data (first two tabs)', () => {
    wrapper.update();
    expect(snapshotify(wrapper)).toMatchSnapshot();

    wrapper.find('#tab-link-1').at(0).simulate('click', { button: 0 });
    wrapper.update();
    expect(snapshotify(wrapper)).toMatchSnapshot();
  });

  it('Open country link', () => {
    wrapper.update();
    wrapper.find('.open-country-button').at(0).simulate('click', { button: 0 });
    wrapper.update();

    expect(wrapper.find('.react-tabs__tab-list').find('#react-tabs-4 .react-tabs__tab--selected')).toHaveLength(1);
  });

  it('Open comparison tab AND remove country', () => {
    wrapper.update();
    wrapper.find('#tab-link-0').at(0).simulate('click', { button: 0 });
    wrapper.update();
    wrapper.find('.add-button').at(0).simulate('click');
    wrapper.find('.add-button').at(1).simulate('click');
    wrapper.find('#tab-link-3').at(0).simulate('click', { button: 0 });
    wrapper.update();

    expect(wrapper.find('.react-tabs__tab-list').find('#react-tabs-6 .react-tabs__tab--selected')).toHaveLength(1);
    expect(wrapper.find('.comparison-county-label')).toHaveLength(2);

    wrapper.find('.remove-county-button').at(0).simulate('click');
    wrapper.update();
    expect(wrapper.find('.comparison-county-label')).toHaveLength(1);
  });

});
