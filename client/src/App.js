import React, { useEffect } from 'react';
import { fetchProducts } from './redux/actions/actions';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HeaderPage from './components/HeaderPage/HeaderPage';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Product from './components/ProductDesktop/Product';
import Bag from './components/Bag/Bag';
import Liked from './components/Liked/Liked';

function App() {
  return ( 
    <div>
      <Routes>
        <Route path="/" element={<HeaderPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/bag" element={<Bag />} />
        <Route path="/liked" element={<Liked />} />
      </Routes>
    </div>
  );
}

export default App;
