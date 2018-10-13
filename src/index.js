import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './Landing';

const Root = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Landing} />
            </Switch>
        </BrowserRouter>
    )
}
render(<Root />, document.querySelector('#root'));
