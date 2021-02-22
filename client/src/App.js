import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import LoggedOut from './components/LoggedOut';
import './css/styles.css';


class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={LoggedOut} />
                    <Route path="/app" component={Home} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;