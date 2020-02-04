import axios from 'axios';
import { API } from '../../config';

export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_PRODUCTS_BY_SELL = 'SET_PRODUCTS_BY_SELL';
export const SET_PRODUCTS_BY_ARRIVAL = 'SET_PRODUCTS_BY_ARRIVAL';

export const fetchProducts = (sortBy) => {
    return dispatch => {
        if(!sortBy) {
            return axios.get(`${API}/products?sortBy=${sortBy}&order=desc`)
            .then(response => {
                dispatch({ type: SET_PRODUCTS, products: response.data })
            })
        }
        else if(sortBy === 'sold') {
            return axios.get(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`)
            .then(response => {
                dispatch({ type: SET_PRODUCTS_BY_SELL, products: response.data })
            })
        }
        else if(sortBy === 'createdAt') {
            return axios.get(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`)
            .then(response => {
                dispatch({ type: SET_PRODUCTS_BY_ARRIVAL, products: response.data })
            })
        }
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
