import  { SET_CATEGORIES, CREATE_CATEGORY } from '../actions/categoriesActions';
import Category from '../../models/Category';

const initialState = {
    categories: []
}
 
const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CATEGORY:
            console.log(action.category);
            const newCategory = new Category(
                action.category._id,
                action.category.title,
                action.category.createdAt,
                action.category.updatedAt
            );
            return {
                ...state,
                categories: [...state.categories, newCategory]
            }
        case SET_CATEGORIES: 
            return {
                ...state,
                categories: action.categories
            }    
        default:
            return state
    }
}

export default categoriesReducer;