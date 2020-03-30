// @flow
import axios from 'axios';
import * as types from './types';


export const loadDataAction = () => (dispatch: any) => {
    console.log('Load Data Action');
    axios.get('https://pomber.github.io/covid19/timeseries.json')
        .then(({ data }) => {
            dispatch({
                type: types.LOAD_DATA_REQUEST,
                data: data
            });
        })
        .catch((error) => {
            // handle error
            console.log(error);
            alert("Error on loading data")
        });
};