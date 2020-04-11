// @flow
import axios from 'axios';
import * as types from './types';

export type Actions = {
    loadDataAction: () => void,
    changeActiveTab: (number) => void,
    openCountryDetailAction: (string) => void,
    addCountryToComparisonAction: (string) => void,
    removeCountryFromComparisonAction: (string) => void,
    clearComparisonAction: () => void,
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

export const changeActiveTab = (activeTab: number) => (dispatch: any) => {
    dispatch({
        type: types.CHANGE_ACTIVE_TAB,
        activeTab: activeTab,
    });
};

export const openCountryDetailAction = (country: string) => (dispatch: any) => {
    dispatch({
        type: types.CHANGE_ACTIVE_TAB,
        activeTab: 2,
        selectedCountry: country,
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

