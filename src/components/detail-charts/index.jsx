// @flow
import React from 'react';

import { Combobox } from '../combobox'

type Props = {
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
        console.log(country);
        this.setState({ country: country });
    };

    render() {
        return <div>
            <Combobox items={this.props.countries} selected={this.state.country} onChange={this.handleChangeCountry}/>
        </div>;
    }

}

