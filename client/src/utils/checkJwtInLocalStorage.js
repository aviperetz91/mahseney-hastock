import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import * as authActions from '../store/actions/authActions';

const checkJwtInLocalStorage = dispatch => {
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

export default checkJwtInLocalStorage;