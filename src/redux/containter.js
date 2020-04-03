import {connect} from 'react-redux';
import * as actions from "./actions";
import * as processors from '../processing/processDataUtils'

const mapStateToProps = state => ({
    ...state
});

// TODO Import actions correctly
const mapDispatchToProps = dispatch => ({
    loadDataAction: () => dispatch(actions.loadDataAction()),
    changeActiveTab: (activeTab) => dispatch(actions.changeActiveTab(activeTab)),
    openCountryDetailAction: (country) => dispatch(actions.openCountryDetailAction(country)),
});

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
    }
};


export default connect(mapStateToProps, mapDispatchToProps, mergeProps);