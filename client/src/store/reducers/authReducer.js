import { SET_CURRENT_USER } from '../actions/authActions';
import isEmpty from '../../validation/is-empty';

const initialState = {
    isAuthenticated: false,
    user: {}
}
 
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.decoded), 
                user: action.decoded
            }
        default:
            return state
    }
}

export default authReducer;