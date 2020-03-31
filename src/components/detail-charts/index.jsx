// @flow
import React from 'react';

import { Combobox } from '../combobox'

type Props = {
    countries: Array<string>
}

export class DetailCharts extends React.Component<Props> {

    handleChangeCountry(country: string) {
        console.log(country);
    }

    render() {
        return <div>
            <Combobox items={this.props.countries} selected={'Russia'} onChange={this.handleChangeCountry}/>
        </div>;
    }

}

