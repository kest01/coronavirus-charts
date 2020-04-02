// @flow
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Combobox } from '../combobox'
import * as proc from '../../processing/processDataUtils.js'

import type { Data } from '../../processing/processDataUtils.js'

type Props = {
    data: Data,
    countries: Array<string>,
    country: string
}

type State = {
    country: string
}

export class DetailCharts extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            country: props.country,
        }
    }

    handleChangeCountry = (country: string) => {
        this.setState({ country: country });
    };

    render() {
        const chartOptions = [
            {
                title: { text: 'Total Cases' },
                xAxis: { type: 'datetime' },
                series: [{
                    name: this.state.country,
                    data: proc.getCountryChartData(this.props.data[this.state.country], item => item.confirmed)
                }]
            },
            {
                title: { text: 'Daily New Cases' },
                xAxis: { type: 'datetime' },
                series: [{
                    name: this.state.country,
                    data: proc.getCountryChartData(this.props.data[this.state.country], (item, prev) => item.confirmed - (prev ? prev.confirmed : 0)),
                    type: 'column',
                }]
            },
            {
                title: { text: 'Total cases chart' },
                xAxis: { type: 'datetime' },
                plotOptions: {
                    column: {
                        pointWidth: 10,
                    }
                },
                series: [{
                    name: 'Total',
                    data: proc.getCountryChartData(this.props.data[this.state.country], item => item.confirmed),
                    type: 'column',
                }, {
                    name: 'Recovered',
                    data: proc.getCountryChartData(this.props.data[this.state.country], item => item.recovered),
                    type: 'column',
                    pointPlacement: -0.2,
                    color: 'green'
                }, {
                    name: 'Deaths',
                    data: proc.getCountryChartData(this.props.data[this.state.country], item => item.deaths),
                    type: 'column',
                    pointPlacement: -0.4,
                    color: 'black'
                }]
            },
            {
                title: { text: 'Active Cases' },
                xAxis: { type: 'datetime' },
                series: [{
                    name: this.state.country,
                    data: proc.getCountryChartData(this.props.data[this.state.country], item => proc.getActive(item))
                }]
            },
            {
                title: { text: 'Daily New Deaths' },
                xAxis: { type: 'datetime' },
                series: [{
                    name: this.state.country,
                    data: proc.getCountryChartData(this.props.data[this.state.country], (item, prev) => item.deaths - (prev ? prev.deaths : 0)),
                    type: 'column',
                }]
            },
            {
                title: { text: 'Daily recovered' },
                xAxis: { type: 'datetime' },
                series: [{
                    name: this.state.country,
                    data: proc.getCountryChartData(this.props.data[this.state.country], (item, prev) => item.recovered - (prev ? prev.recovered : 0)),
                    type: 'column',
                }]
            },
        ];

        return <div>
            <Combobox items={this.props.countries}
                      selected={this.state.country}
                      onChange={this.handleChangeCountry}/>
            <br/>
            {chartOptions.map(options =>
                <HighchartsReact
                    highcharts={ Highcharts }
                    options={ options }
                />
            )}
        </div>;
    }

}

