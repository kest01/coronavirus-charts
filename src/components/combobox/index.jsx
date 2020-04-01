// @flow
import React from 'react';
// import './index.scss'

type Props = {
    items: Array<string>,
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

