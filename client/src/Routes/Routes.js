import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../components/screens/Home';
import Register from '../components/screens/user/Register';
import Login from '../components/screens/user/Login';
import UserDashboard from '../components/screens/user/UserDashboard';
import AdminDashboard from '../components/screens/admin/AdminDashboard';
import AddCategory from '../components/screens/admin/AddCategory';
import AddProduct from '../components/screens/admin/AddProduct';
import Shop from '../components/screens/Shop';

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
            <Route path='/shop' exact component={Shop} />
        </Switch>
    )
}

export default Routes;