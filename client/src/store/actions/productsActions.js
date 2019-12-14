import axios from 'axios';
import { API } from '../../config';

export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return dispatch => {
        return axios.get(`${API}/products`)
        .then(response => {
            dispatch({ type: SET_PRODUCTS, products: response.data })
        })
        .catch(err => console.log(err));
    }
}

export const createProduct = (product, userId) => {
    return dispatch => {
        return axios.post(`${API}/product/create/${userId}`, product)
        .then(response => {
            dispatch({ type: CREATE_PRODUCT, product: response.data }) 
            return response.data
        })
        .catch(err => err.response.data);
    }
} 