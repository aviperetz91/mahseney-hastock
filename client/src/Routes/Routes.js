import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../components/core/Home/Home';
import Auth from '../components/user/Auth/Auth';

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/auth' exact component={Auth} />
        </Switch>
    )
}

export default Routes;