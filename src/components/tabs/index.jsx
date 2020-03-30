import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import GlobalViewTable from '../global-view';

export default (props) => (
    <Tabs>
        <TabList>
            <Tab>Global view</Tab>
            <Tab>Favorite countries</Tab>
            <Tab>Comparison</Tab>
        </TabList>

        <TabPanel>
            <GlobalViewTable data={props.globalViewByCountries}/>
        </TabPanel>
        <TabPanel>
            <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
            <h2>Any content 3</h2>
        </TabPanel>
    </Tabs>
);