// @flow
import React from 'react';
import './index.scss'

type Props = {
    onClick: (string) => void,
}

export default (props: Props) => (
    <button title="Add to comparison" className="add-button" onClick={props.onClick}>+</button>
)

