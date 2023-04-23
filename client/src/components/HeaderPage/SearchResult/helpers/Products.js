import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import heart from '../../../../assets/images/heart.svg';
const Products = ({ products }) => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.id);
  const addToFavorites = async (product) => {
    await fetch('http://localhost:3001/favorites', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
        product: product
      })
    });
  };

  return (
    <div>
      {products.map((item) => (
        <div key={item.id}>
          <span>
            <img src={heart} onClick={() => addToFavorites(item)} />
          </span>
          <img src={item.images[0]} onClick={() => navigate(`/product/${item.id}`)} />
          <p>${item.price.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
