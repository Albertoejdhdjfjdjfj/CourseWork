import React, { useEffect } from 'react';
import { fetchProducts } from './redux/actions/actions';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HeaderPage from './components/HeaderPage/HeaderPage';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Product from './components/ProductDesktop/Product';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Favorites from './components/Favorites/Favorites';

function App() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.id);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [id]);

  return (
    <div>
      <Routes>
        <Route path="/" element={id ? <HeaderPage /> : <Navigate to="/signIn" />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/product/:id" element={id ? <Product /> : <Navigate to="/signIn" />} />
        <Route path="/cart" element={id ? <ShoppingCart /> : <Navigate to="/signIn" />} />
        <Route path="/favorites" element={id ? <Favorites /> : <Navigate to="/signIn" />} />
      </Routes>
    </div>
  );
}

export default App;
