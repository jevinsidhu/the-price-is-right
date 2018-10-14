import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './Landing';
import Start from './Start';
import Waiting from './Waiting';
import Winner from './Winner';
import Loser from './Loser';

const Root = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/start" component={Start} />
                <Route exact path="/waiting" component={Waiting} />
                <Route exact path="/winner" component={Winner} />
                <Route exact path="/loser" component={Loser} />
            </Switch>
        </BrowserRouter>
    )
}
render(<Root />, document.querySelector('#root'));
