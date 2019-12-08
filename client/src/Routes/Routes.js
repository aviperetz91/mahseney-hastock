import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../components/core/Home';
import Register from '../components/user/Register';
import Login from '../components/user/Login';
import UserDashboard from '../components/user/UserDashboard';

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/register' exact component={Register} />
            <Route path='/login' exact component={Login} />
            <Route path='/user/dashboard' exact component={UserDashboard} />
        </Switch>
    )
}

export default Routes;