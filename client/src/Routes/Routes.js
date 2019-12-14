import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../components/core/Home';
import Register from '../components/user/Register';
import Login from '../components/user/Login';
import UserDashboard from '../components/user/UserDashboard';
import AdminDashboard from '../components/user/AdminDashboard';
import AddCategory from '../components/admin/AddCategory';
import AddProduct from '../components/admin/AddProduct';

const Routes = () => {

    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/register' exact component={Register} />
            <Route path='/login' exact component={Login} />
            <Route path='/user/dashboard' exact component={UserDashboard} />
            <Route path='/admin/dashboard' exact component={AdminDashboard} />
            <Route path='/create/category' exact component={AddCategory} />
            <Route path='/create/product' exact component={AddProduct} />
        </Switch>
    )
}

export default Routes;