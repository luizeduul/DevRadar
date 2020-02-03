import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import DevUpdate from './components/DevUpdate';
import Home from './components/Home';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/devs/:dev_id" component={DevUpdate} />
            </Switch>
        </BrowserRouter>
    );
}