import axios from 'axios';
import { API } from '../../config';

export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const SET_CATEGORIES = 'SET_CATEGORIES';

export const fetchCategories = () => {
    return dispatch => {
        return axios.get(`${API}/categories`)
        .then(response => {
            dispatch({ type: SET_CATEGORIES, categories: response.data })
        })
    }
}

export const createCategory = (category, userId) => {
    return dispatch => {
        return axios.post(`${API}/category/create/${userId}`, category)
        .then(response => {
            dispatch({ type: CREATE_CATEGORY, category: response.data }) 
            return response.data
        })
        .catch(err => err.response.data);
    }
} 