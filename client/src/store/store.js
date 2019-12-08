import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import authReducer from '../store/reducers/authReducer';

const initialState = {}

const rootReducer = combineReducers({
    auth: authReducer,
})

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(ReduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store;