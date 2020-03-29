// @flow
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import GlobalViewTable from '../global-view';

export default () => (
    <Tabs>
        <TabList>
            <Tab>Global view</Tab>
            <Tab>Favorite countries</Tab>
            <Tab>Comparison</Tab>
        </TabList>

        <TabPanel>
            <GlobalViewTable data={[{
                age: 12,
                visits: 100,
                status: 'Done',
                progress: 'false'
            }, {
                age: 18,
                visits: 500,
                status: 'None',
                progress: 'true'
            }]}/>
        </TabPanel>
        <TabPanel>
            <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
            <h2>Any content 3</h2>
        </TabPanel>
    </Tabs>
);