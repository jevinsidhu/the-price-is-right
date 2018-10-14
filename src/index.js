import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Player from './Player'

import Landing from './Landing';
import Start from './Start';
import Waiting from './Waiting';
import Winner from './Winner';
import Loser from './Loser';
import Tie from './Tie';

const Root = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/player1" render={() => <Start isOne={true} /> }/>
                <Route exact path="/player2" render={() => <Start isOne={false} />} />
  
                {/* <Route exact path="/start" component={Start} /> */}
                <Route exact path="/waiting" component={Waiting} />
                <Route exact path="/winner" component={Winner} />
                <Route exact path="/loser" component={Loser} />
                <Route exact path="/tie" component={Tie} />

            </Switch>
        </BrowserRouter>
    )
}
render(<Root />, document.querySelector('#root'));
