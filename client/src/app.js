import React, { Component, Fragment } from 'react';
import './css/styles.scss';
import Home from '../src/pages/Home';
import {BrowserRouter as Router} from "react-router-dom";
class App extends Component {
    render() {

        return (
            <Fragment>
                <Router>
                <Home/>
                </Router>
            </Fragment>
        );
    }
}

export default App;