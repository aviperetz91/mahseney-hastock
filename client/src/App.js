import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import * as authActions from './store/actions/authActions';

import Toolbar from './components/core/Toolbar';
import Routes from './routes/Routes';


const checkJwtInLS = dispatch => {
  if (localStorage.jwt) {
    // Set auth token header auth
    setAuthToken(localStorage.jwt);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwt);
    // Set user and isAuthenticated
    dispatch({ type: authActions.SET_CURRENT_USER, decoded });

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Logout user
      dispatch(authActions.logout());
      // Redirect to login
      window.location.href = '/login';
    }
  }
}

const App = () => {

  const dispatch = useDispatch();
  checkJwtInLS(dispatch);

  return (
    <BrowserRouter>
      <Toolbar />
      <Routes />
    </BrowserRouter>
  )
}


export default App;
