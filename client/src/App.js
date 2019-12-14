import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import checkJwtInLocalStorage from './utils/checkJwtInLocalStorage';
import { fetchCategories } from './store/actions/categoriesActions';
import { fetchProducts } from './store/actions/productsActions';

import Toolbar from './components/core/Toolbar';
import Routes from './routes/Routes';

const App = () => {

  const dispatch = useDispatch();
  checkJwtInLocalStorage(dispatch);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  },[dispatch])

  return (
    <BrowserRouter>
      <Toolbar />
      <Routes />
    </BrowserRouter>
  )
}


export default App;
