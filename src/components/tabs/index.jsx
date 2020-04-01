import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import GlobalViewTable from '../global-view';
import { DetailCharts } from '../detail-charts';
import { filterFavorite } from '../../processing/processDataUtils'

export default (props) => (
    <Tabs>
        <TabList>
            <Tab>Global view</Tab>
            <Tab>Favorite countries</Tab>
            <Tab>Details</Tab>
        </TabList>

        <TabPanel>
            <GlobalViewTable data={props.globalViewByCountries}/>
        </TabPanel>
        <TabPanel>
            <GlobalViewTable data={filterFavorite(props.globalViewByCountries)}/>
        </TabPanel>
        <TabPanel>
            <DetailCharts countries={props.countries} country={'Russia'} data={props.data} />
        </TabPanel>
    </Tabs>
);