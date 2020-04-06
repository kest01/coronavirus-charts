import React from 'react';
import App from '../../../App';
import { List } from 'immutable';
import { createMockStoreFactory, mountConnectedComponent, snapshotify } from '../../utils/test-utils'

describe('Test Tabs',()=>{
    const initialState = {
        initialized: true,
        data: {'Russia': [{
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
        selectedCountry: 'Russia',
        comparisonCountries: List(),
    };
    const mockStoreFactory = createMockStoreFactory();
    let store, wrapper;

    beforeEach(()=>{
    });

    it('Check first tab selected on loading', () => {
        store = mockStoreFactory(initialState);
        wrapper = mountConnectedComponent(App, store);

        expect(wrapper.find('.react-tabs__tab-list').find('#react-tabs-0 .react-tabs__tab--selected')).toHaveLength(1);

        // Click on second tab
        wrapper.find('.react-tabs__tab-list').find('#react-tabs-2').at(0).simulate('click');
        expect(wrapper.find('.react-tabs__tab-list').find('#react-tabs-0 .react-tabs__tab--selected')).toHaveLength(0);
        expect(wrapper.find('.react-tabs__tab-list').find('#react-tabs-2 .react-tabs__tab--selected')).toHaveLength(1);



        // Click on third tab
        wrapper.find('.react-tabs__tab-list').find('#react-tabs-4').at(0).simulate('click');
        expect(wrapper.find('.react-tabs__tab-list').find('#react-tabs-2 .react-tabs__tab--selected')).toHaveLength(0);
        expect(wrapper.find('.react-tabs__tab-list').find('#react-tabs-4 .react-tabs__tab--selected')).toHaveLength(1);

        // Click on fourth tab
        wrapper.find('.react-tabs__tab-list').find('#react-tabs-6').at(0).simulate('click');
        expect(wrapper.find('.react-tabs__tab-list').find('#react-tabs-4 .react-tabs__tab--selected')).toHaveLength(0);
        expect(wrapper.find('.react-tabs__tab-list').find('#react-tabs-6 .react-tabs__tab--selected')).toHaveLength(1);
    });

});
