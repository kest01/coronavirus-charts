// @flow
import axios from 'axios';
import * as types from './types';

export type Actions = {
    loadDataAction: () => void,
    addCountryToComparisonAction: (string) => void,
    removeCountryFromComparisonAction: (string) => void,
    updateChartThresholdAction: (number) => void,
}

export const loadDataAction = () => (dispatch: any) => {
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

export const addCountryToComparisonAction = (country: string) => (dispatch: any) => {
    dispatch({
        type: types.ADD_COUNTRY_TO_COMPARISON,
        country,
    });
};

export const removeCountryFromComparisonAction = (country: string) => (dispatch: any) => {
    dispatch({
        type: types.REMOVE_COUNTRY_FROM_COMPARISON,
        country,
    });
};

export const updateChartThresholdAction = (newThreshold: number) => (dispatch: any) => {
    dispatch({
        type: types.UPDATE_CHART_THRESHOLD,
        newThreshold,
    });
};
