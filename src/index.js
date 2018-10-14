import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Player from './Player'

import Landing from './Landing';

const Root = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/player1" render={() => <Player isOne={true} /> }/>
                <Route exact path="/player2" render={() => <Player isOne={false} />} />
            </Switch>
        </BrowserRouter>
    )
}
render(<Root />, document.querySelector('#root'));
