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
    console.log(stateProps);
    console.log(dispatchProps);
    return {
        ...stateProps,
        ...dispatchProps,
        globalViewByCountries: processors.dataToGlobalViewByCountries(stateProps.data)
    }
};


export default connect(mapStateToProps, mapDispatchToProps, mergeProps);