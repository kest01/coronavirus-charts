// @flow
import * as types from './types';

export type AppStore = {
    data: any,
    initialized: boolean,
}

const initialState: AppStore = {
    data: [],
    initialized: false
};

export default (state: AppStore = initialState, action: any) => {
    console.log(`Reducer executed for action ${action.type} `);
    console.log(state);

    switch (action.type) {
        case types.LOAD_DATA_REQUEST:
            return {
                ...state,
                data: action.data,
                initialized: true
            };
        default:
            return state
    }
}