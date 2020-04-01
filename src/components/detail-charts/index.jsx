// @flow
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Combobox } from '../combobox'
import * as proc from '../../processing/processDataUtils.js'

import type { Data, DataItem } from '../../processing/processDataUtils.js'

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
        const totalCasesChartData = {
            title: { text: 'Total Cases' },
            xAxis: { type: 'datetime' },
            series: [{
                name: this.state.country,
                data: proc.getCountryChartData(this.props.data[this.state.country], item => item.confirmed)
            }]
        };

        const newCasesChartData = {
            title: { text: 'Daily New Cases' },
            xAxis: { type: 'datetime' },
            series: [{
                name: this.state.country,
                data: proc.getCountryChartData(this.props.data[this.state.country], (item, prev) => item.confirmed - (prev ? prev.confirmed : 0)),
                type: 'column',
            }]
        };

        return <div>
            <Combobox items={this.props.countries}
                      selected={this.state.country}
                      onChange={this.handleChangeCountry}/>
            <br/>
            <HighchartsReact
                highcharts={ Highcharts }
                options={ totalCasesChartData }
            />
            <HighchartsReact
                highcharts={ Highcharts }
                options={ newCasesChartData }
            />
        </div>;
    }

}

