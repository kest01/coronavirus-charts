// @flow
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as proc from '../../processing/processDataUtils.js'

import type { Data } from '../../processing/processDataUtils.js'


type Props = {
    data: Data,
    countries: Array<string>,
    removeCountryFromComparisonAction: (string) => void,
}

export class CountryComparison extends React.Component<Props> {

    render() {
        let key = 0;

        const chartOptions = [
            {
                title: { text: 'Total Cases (after reaching 100 cases)' },
                xAxis: {
                    title: { text: 'Days after reaching 100 cases' },
                    tickInterval: 5
                },
                series: this.props.countries.map(country => {
                    return {
                        name: country,
                        data: proc.getChartDataRelative(this.props.data[country], item => item.confirmed, 100)
                    }
                })
            },
            {
                title: { text: 'Daily Cases (after reaching 100 cases)' },
                xAxis: {
                    title: { text: 'Days after reaching 100 cases' },
                    tickInterval: 5
                },
                series: this.props.countries.map(country => {
                    return {
                        name: country,
                        data: proc.getChartDataRelative(this.props.data[country], (item, prev) => item.confirmed - (prev ? prev.confirmed : 0), 100)
                    }
                })
            },
            {
                title: { text: 'Daily Deaths (after reaching 100 cases)' },
                xAxis: {
                    title: { text: 'Days after reaching 100 cases' },
                    tickInterval: 5
                },
                series: this.props.countries.map(country => {
                    return {
                        name: country,
                        data: proc.getChartDataRelative(this.props.data[country], (item, prev) => item.deaths - (prev ? prev.deaths : 0), 100)
                    }
                })
            },
        ];

        if (this.props.countries.length > 0) {
            return <div>
                {this.props.countries.map(country =>
                    <div key={key++}>
                        <span>{country}</span>
                        <button onClick={() => this.props.removeCountryFromComparisonAction(country)}>X</button>
                    </div>
                )}
                <br/>
                {chartOptions.map(options =>
                    <HighchartsReact key={key++}
                                     highcharts={Highcharts}
                                     options={options}
                    />
                )}
            </div>;
        } else {
            return <h3>Please select countries for comparison on another tabs</h3>
        }
    }

}

