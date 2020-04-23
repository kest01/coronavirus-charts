import React from 'react';
import App from '../../../App';
import { List } from 'immutable';
import { makeStore, mountConnectedComponent } from '../../utils/test-utils'
import { resetIdCounter } from 'react-tabs';

describe('Test Tabs',()=>{
    const initialState = {
        store: {
            initialized: true,
            data: {
                'Russia': [{
                    "date": "2020-1-22",
                    "confirmed": 0,
                    "deaths": 0,
                    "recovered": 0
                }, {
                    "date": "2020-1-23",
                    "confirmed": 0,
                    "deaths": 0,
                    "recovered": 0
                }]
            },
            globalViewByCountries: List(),
            countries: List(['Russia']),
            activeTab: 0,
            selectedCountry: 'Russia',
            comparisonCountries: List(),
        }
    };
    let store, wrapper;

    it('Check first tab selected on loading', () => {
        resetIdCounter();
        store = makeStore(initialState);
        wrapper = mountConnectedComponent(App, store);
        wrapper.update();

        expect(wrapper.find('.react-tabs__tab-list').find('#react-tabs-0 .react-tabs__tab--selected')).toHaveLength(1);

        // Click on second tab
        wrapper.find('.react-tabs__tab-list').find('#tab-link-1').at(0).simulate('click', { button: 0 });
        expect(wrapper.find('.react-tabs__tab-list').find('#react-tabs-0 .react-tabs__tab--selected')).toHaveLength(0);
        expect(wrapper.find('.react-tabs__tab-list').find('#react-tabs-2 .react-tabs__tab--selected')).toHaveLength(1);



        // Click on third tab
        wrapper.find('.react-tabs__tab-list').find('#tab-link-2').at(0).simulate('click', { button: 0 });
        expect(wrapper.find('.react-tabs__tab-list').find('#react-tabs-2 .react-tabs__tab--selected')).toHaveLength(0);
        expect(wrapper.find('.react-tabs__tab-list').find('#react-tabs-4 .react-tabs__tab--selected')).toHaveLength(1);

        // Click on fourth tab
        wrapper.find('.react-tabs__tab-list').find('#tab-link-3').at(0).simulate('click', { button: 0 });
        expect(wrapper.find('.react-tabs__tab-list').find('#react-tabs-4 .react-tabs__tab--selected')).toHaveLength(0);
        expect(wrapper.find('.react-tabs__tab-list').find('#react-tabs-6 .react-tabs__tab--selected')).toHaveLength(1);
    });

});
