import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';

import { BrowserRouter } from 'react-router-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import authReducer from './store/reducers/authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const AppRedux = () => (
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
)

ReactDOM.render(<AppRedux /> , document.getElementById('root'));
