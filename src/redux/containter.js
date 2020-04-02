import {connect} from 'react-redux';
import * as actions from "./actions";
import * as processors from '../processing/processDataUtils'

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    loadDataAction: () => dispatch(actions.loadDataAction())
});

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        data: processors.filterEmptyRecords(stateProps.data),
        countries: processors.dataToCountryList(stateProps.data),
        globalViewByCountries: processors.dataToGlobalViewByCountries(stateProps.data)
    }
};


export default connect(mapStateToProps, mapDispatchToProps, mergeProps);