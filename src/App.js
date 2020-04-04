import React from 'react';
import {connect} from 'react-redux';
import * as actions from "./redux/actions";
import Tabs from './components/tabs'
import { Preloader } from './components/preloader'
import './App.css';

import type { AppStore } from './redux/reducers'
import type { Actions } from './redux/actions'

// TODO KK Форматирование: ширина графиков
// TODO KK Починить добавление стран несколько раз

class App extends React.Component<Actions & AppStore> {

    componentDidMount(): void {
        this.props.loadDataAction()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        } else {
            return (
                <div className="App">
                    <Tabs {...this.props}/>
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = {
    ...actions
};

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);
