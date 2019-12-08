import axios from 'axios';
import { API } from '../../config';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const SET_CURRENT_USER = "SET_CURRENT_USER";


export const register = user => {
    return dispatch => {
        return axios.post(`${API}/register`, user)
        .then(response => response.data)
        .catch(err => err.response.data)
    }
}

export const login = user => {
    return dispatch => {
        return axios.post(`${API}/login`, user)
        .then(response => {
            const { token } = response.data;
            // Save to localStorage
            localStorage.setItem('jwt', token);
            // Set token to auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch({type: SET_CURRENT_USER, decoded})
        })
        .catch(err => err.response.data)
    }
}

export const logout = () => {
    return dispatch => {
        // Remove token from localStorage
        localStorage.removeItem('jwt');
        // Remove auth header for future requests
        setAuthToken(false)
        // Set the current user to {} which will set isAuthenticated to false
        const decoded = {}
        dispatch({type: SET_CURRENT_USER, decoded })
    }
}