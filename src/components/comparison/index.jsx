// @flow
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { List } from 'immutable';
import * as proc from '../../processing/processDataUtils.js'

import type { Data } from '../../processing/processDataUtils.js'


type Props = {
    data: Data,
    countries: List<string>,
    removeCountryFromComparisonAction: (string) => void,
    updateChartThresholdAction: (number) => void,
    chartThreshold: number,
}

export class CountryComparison extends React.Component<Props> {

    updateChartThreshold = (event: any) => {
        const newThreshold = parseFloat(event.target.value);
        if (!isNaN(newThreshold)) {
            this.props.updateChartThresholdAction(newThreshold)
        }
    };

    render() {
        let key = 0;

        const chartOptions = [
            {
                title: { text: `Total Cases (after reaching ${this.props.chartThreshold} cases)` },
                xAxis: {
                    title: { text: `Days after reaching ${this.props.chartThreshold} cases` },
                    tickInterval: 5
                },
                series: this.props.countries.map(country => {
                    return {
                        name: country,
                        data: proc.getChartDataRelative(this.props.data[country], item => item.confirmed, this.props.chartThreshold)
                    }
                }).toArray()
            },
            {
                title: { text: `Daily Cases (after reaching ${this.props.chartThreshold} cases)` },
                xAxis: {
                    title: { text: `Days after reaching ${this.props.chartThreshold} cases` },
                    tickInterval: 5
                },
                series: this.props.countries.map(country => {
                    return {
                        name: country,
                        data: proc.getChartDataRelative(
                            this.props.data[country],
                            (item, prev) => item.confirmed - (prev ? prev.confirmed : 0),
                            this.props.chartThreshold
                        )
                    }
                }).toArray()
            },
            {
                title: { text: `Active Cases (after reaching ${this.props.chartThreshold} cases)` },
                xAxis: {
                    title: { text: `Days after reaching ${this.props.chartThreshold} cases` },
                    tickInterval: 5
                },
                series: this.props.countries.map(country => {
                    return {
                        name: country,
                        data: proc.getChartDataRelative(
                            this.props.data[country],
                            item => proc.getActive(item),
                            this.props.chartThreshold)
                    }
                }).toArray()
            },
            {
                title: { text: `Total Deaths (after reaching ${this.props.chartThreshold} cases)` },
                xAxis: {
                    title: { text: `Days after reaching ${this.props.chartThreshold} cases` },
                    tickInterval: 5
                },
                series: this.props.countries.map(country => {
                    return {
                        name: country,
                        data: proc.getChartDataRelative(
                            this.props.data[country],
                            item => item.deaths,
                            this.props.chartThreshold)
                    }
                }).toArray()
            },
            {
                title: { text: `Daily Deaths (after reaching ${this.props.chartThreshold} cases)` },
                xAxis: {
                    title: { text: `Days after reaching ${this.props.chartThreshold} cases` },
                    tickInterval: 5
                },
                series: this.props.countries.map(country => {
                    return {
                        name: country,
                        data: proc.getChartDataRelative(
                            this.props.data[country],
                            (item, prev) => item.deaths - (prev ? prev.deaths : 0),
                            this.props.chartThreshold)
                    }
                }).toArray()
            },
            {
                title: { text: `Daily Recovers (after reaching ${this.props.chartThreshold} cases)` },
                xAxis: {
                    title: { text: `Days after reaching ${this.props.chartThreshold} cases` },
                    tickInterval: 5
                },
                series: this.props.countries.map(country => {
                    return {
                        name: country,
                        data: proc.getChartDataRelative(
                            this.props.data[country],
                            (item, prev) => item.recovered - (prev ? prev.recovered : 0),
                            this.props.chartThreshold)
                    }
                }).toArray()
            },
        ];

        if (this.props.countries.isEmpty()) {
            return <h3>Please select countries for comparison on another tabs</h3>
        } else{
            return <div className="chart_container">
                {this.props.countries.map(country =>
                    <div key={key++}>
                        <span className={"comparison-county-label"}>{country}</span>
                        <button title='Remove country' className={"remove-county-button"} onClick={() => this.props.removeCountryFromComparisonAction(country)}>
                            <svg width="8" height="10" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg">
                                <line x1="1" y1="7" x2="7" y2="1" stroke="red" strokeWidth="1"/>
                                <line x1="1" y1="1" x2="7" y2="7" stroke="red" strokeWidth="1"/>
                            </svg>
                        </button>
                    </div>
                )}
                <br/>
                <span>Zero point</span>
                <input className={'chart-threshold-input'}
                       defaultValue={this.props.chartThreshold}
                       onChange={this.updateChartThreshold}/>
                <span>cases</span>
                <br/>
                {chartOptions.map(options =>
                    <HighchartsReact key={key++}
                                     highcharts={Highcharts}
                                     options={options}
                    />
                )}
            </div>;
        }
    }

}

