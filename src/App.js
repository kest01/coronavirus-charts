// @flow
import React from 'react';
import connect from './redux/containter';
import './App.css';
import Tabs from './components/tabs'
import { Preloader } from './components/preloader'

import type { AppStore } from './redux/reducers'

class App extends React.Component<AppStore> {

    componentDidMount(): void {
        console.log('loadDataAction')
        console.debug();
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

export default connect(App);
