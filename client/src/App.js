import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import checkJwtInLocalStorage from './utils/checkJwtInLocalStorage';
import { fetchCategories } from './store/actions/categoriesActions';

import Toolbar from './components/core/Toolbar';
import Routes from './routes/Routes';

const App = () => {

  const dispatch = useDispatch();
  checkJwtInLocalStorage(dispatch);

  useEffect(() => {
    dispatch(fetchCategories());
  },[dispatch])

  return (
    <BrowserRouter>
      <Toolbar />
      <Routes />
    </BrowserRouter>
  )
}


export default App;
