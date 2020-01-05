import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../components/core/Home';
import Register from '../components/screens/user/Register';
import Login from '../components/screens/user/Login';
import UserDashboard from '../components/screens/user/UserDashboard';
import AdminDashboard from '../components/screens/user/AdminDashboard';
import AddCategory from '../components/screens/admin/AddCategory';
import AddProduct from '../components/screens/admin/AddProduct';

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