// @flow
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom'
import 'react-tabs/style/react-tabs.css';
import GlobalViewTable from '../global-view';
import { DetailCharts } from '../detail-charts';
import { CountryComparison } from '../comparison';
import { filterFavorite } from '../../processing/processDataUtils'

import type { AppStore } from '../../redux/reducers'
import type { Actions } from '../../redux/actions'

export default (props: { store: AppStore} & Actions) => (
    <Tabs selectedIndex={props.store.activeTab} onSelect={() => {}}>
        <TabList>
            <Tab><Link to={'/'} id='tab-link-0'>Global view</Link></Tab>
            <Tab><Link to={'/favorite'} id='tab-link-1'>Favorite countries</Link></Tab>
            <Tab><Link to={'/details'} id='tab-link-2'>Details</Link></Tab>
            <Tab><Link to={'/comparison'} id='tab-link-3'>Comparison</Link></Tab>
        </TabList>

        <TabPanel>
            <GlobalViewTable data={props.store.globalViewByCountries}
                             addCountryToComparisonAction={props.addCountryToComparisonAction} />
        </TabPanel>
        <TabPanel>
            <GlobalViewTable data={filterFavorite(props.store.globalViewByCountries)}
                             addCountryToComparisonAction={props.addCountryToComparisonAction} />
        </TabPanel>
        <TabPanel>
            <DetailCharts countries={props.store.countries} country={props.store.selectedCountry} data={props.store.data} />
        </TabPanel>
        <TabPanel>
            <CountryComparison countries={props.store.comparisonCountries}
                               data={props.store.data}
                               removeCountryFromComparisonAction={props.removeCountryFromComparisonAction}
                               chartThreshold={props.store.chartThreshold}
                               updateChartThresholdAction={props.updateChartThresholdAction}
            />
        </TabPanel>
    </Tabs>
);