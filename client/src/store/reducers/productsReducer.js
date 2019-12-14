import  { SET_PRODUCTS, CREATE_PRODUCT } from '../actions/productsActions';
import Product from '../../models/Product';

const initialState = {
    products: []
}
 
const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT:
            console.log(action.product);
            const newProduct = new Product(
                action.product.category,
                action.product.id,
                action.product.title,
                action.product.description,
                action.product.photo,
                action.product.price,
                action.product.quantity,
                action.product.sold,
                action.product.shipping,
                action.product.createdAt,
                action.product.updatedAt
            );
            return {
                ...state,
                products: [...state.products, newProduct]
            }
        case SET_PRODUCTS: 
            return {
                ...state,
                products: action.products
            }    
        default:
            return state
    }
}

export default productsReducer;