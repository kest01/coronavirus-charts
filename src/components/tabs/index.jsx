// @flow
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import GlobalViewTable from '../global-view';
import { DetailCharts } from '../detail-charts';
import { CountryComparison } from '../comparison';
import { filterFavorite } from '../../processing/processDataUtils'

import type { AppStore } from '../../redux/reducers'
import type { Actions } from '../../redux/actions'

export default (props: AppStore & Actions) => (
    <Tabs selectedIndex={props.activeTab} onSelect={tabIndex => props.changeActiveTab(tabIndex)}>
        <TabList>
            <Tab>Global view</Tab>
            <Tab>Favorite countries</Tab>
            <Tab>Details</Tab>
            <Tab>Comparison</Tab>
        </TabList>

        <TabPanel>
            <GlobalViewTable data={props.globalViewByCountries}
                             openCountryDetailAction={props.openCountryDetailAction}
                             addCountryToComparisonAction={props.addCountryToComparisonAction} />
        </TabPanel>
        <TabPanel>
            <GlobalViewTable data={filterFavorite(props.globalViewByCountries)}
                             openCountryDetailAction={props.openCountryDetailAction}
                             addCountryToComparisonAction={props.addCountryToComparisonAction} />
        </TabPanel>
        <TabPanel>
            <DetailCharts countries={props.countries} country={props.selectedCountry} data={props.data} />
        </TabPanel>
        <TabPanel>
            <CountryComparison countries={props.comparisonCountries}
                               data={props.data}
                               removeCountryFromComparisonAction={props.removeCountryFromComparisonAction}
                               chartThreshold={props.chartThreshold}
                               updateChartThresholdAction={props.updateChartThresholdAction}
            />
        </TabPanel>
    </Tabs>
);