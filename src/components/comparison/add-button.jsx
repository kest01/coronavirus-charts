// @flow
import React from 'react';

type Props = {
    onClick: (string) => void,
}

export default (props: Props) => (
    <button onClick={props.onClick}>+</button>
)

