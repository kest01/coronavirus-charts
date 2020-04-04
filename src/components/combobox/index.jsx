// @flow
import React from 'react';
import { List } from 'immutable';

type Props = {
    items: List<string>,
    selected?: string,
    onChange: (value: string) => void
}

export class Combobox extends React.Component<Props> {

    handleChange = (event: any) => {
        this.props.onChange(event.target.value)
    };

    render() {
        const {
            items,
            selected
        } = this.props;

        return <div>
            <select defaultValue={ selected } onChange={ this.handleChange }>
                {items.map(item => (
                    <option key={item}>{item}</option>
                ))}
            </select>
        </div>;
    }

}

