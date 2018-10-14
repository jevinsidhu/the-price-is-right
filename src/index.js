import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './Landing';
import Start from './Start';

const Root = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/Start" component={Start} />
            </Switch>
        </BrowserRouter>
    )
}
render(<Root />, document.querySelector('#root'));
