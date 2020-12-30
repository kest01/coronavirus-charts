// @flow
import { List } from 'immutable';
import queryString from 'query-string';
import * as types from './types';
import * as processors from "../processing/processDataUtils";

import type { Data, CountrySummary } from "../processing/processDataUtils";

export type AppStore = {
    data: Data,
    countries: List<string>,
    globalViewByCountries: List<CountrySummary>,
    initialized: boolean,
    activeTab: number,
    chartThreshold: number,
    selectedCountry: string,
    comparisonCountries: List<string>,
}

export const initialState: AppStore = {
    data: List(),
    countries: List(),
    globalViewByCountries: List(),
    initialized: false,
    activeTab: 0,
    chartThreshold: 100,
    selectedCountry: 'Russia',
    comparisonCountries: List(),
};

export default (state: AppStore = initialState, action: any): AppStore => {
    switch (action.type) {
        case types.LOAD_DATA_REQUEST:
            return {
                ...state,
                data: processors.filterEmptyRecords(action.data),
                countries: processors.dataToCountryList(action.data),
                globalViewByCountries: processors.dataToGlobalViewByCountries(action.data),
                initialized: true
            };
        case types.LOCATION_CHANGE:
            const newTab = pathToTabIndex(action.payload.location.pathname);
            const newCountry = newTab === 2 ? queryString.parse(action.payload.location.search).country : undefined;
            return {
                ...state,
                activeTab: newTab,
                selectedCountry: newCountry ? newCountry : state.selectedCountry,
            };
        case types.ADD_COUNTRY_TO_COMPARISON:
            return {
                ...state,
                comparisonCountries: state.comparisonCountries.includes(action.country)
                    ? state.comparisonCountries
                    : state.comparisonCountries.push(action.country),
            };
        case types.REMOVE_COUNTRY_FROM_COMPARISON:
            return {
                ...state,
                comparisonCountries: state.comparisonCountries.filter(value => value !== action.country),
            };
        case types.UPDATE_CHART_THRESHOLD:
            return {
                ...state,
                chartThreshold: action.newThreshold,
            };
        default:
            return state
    }
}

const pathToTabIndex = (path: string): number => {
    switch (path) {
        case '/': return 0;
        case '/favorite': return 1;
        case '/details': return 2;
        case '/comparison': return 3;
        default: return 0;
    }
};