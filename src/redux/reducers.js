// @flow
import * as types from './types';
import * as processors from "../processing/processDataUtils";

export type AppStore = {
    data: any,
    initialized: boolean,
    activeTab: number,
    selectedCountry: string,
}

const initialState: AppStore = {
    data: [],
    initialized: false,
    activeTab: 0,
    selectedCountry: 'Russia'
};

export default (state: AppStore = initialState, action: any) => {
    switch (action.type) {
        case types.LOAD_DATA_REQUEST:
            return {
                ...state,
                data: processors.filterEmptyRecords(action.data),
                countries: processors.dataToCountryList(action.data),
                globalViewByCountries: processors.dataToGlobalViewByCountries(action.data),
                initialized: true
            };
        case types.CHANGE_ACTIVE_TAB:
            return {
                ...state,
                activeTab: action.activeTab,
                selectedCountry: action.selectedCountry ? action.selectedCountry : state.selectedCountry,
            };
        default:
            return state
    }
}