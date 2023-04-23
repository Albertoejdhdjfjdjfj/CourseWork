import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../general/Header/Header';
import Footer from '../general/Footer/Footer';
import './Liked.css';
import remove_icon from '../../assets/images/remove-icon.svg';

const Favorites = () => {
  const [data, setData] = useState(false);
  const userId = useSelector((state) => state.user.id);

  const fetchProduct = () => {
    fetch(`http://localhost:3001/favorites?userId=${userId}`)
      .then((res) => res.json())
      .then((json) => setData(json));
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:3001/favorites/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    fetchProduct();
  };

  useEffect(() => {
    fetch(`http://localhost:3001/favorites?userId=${userId}`)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    data !== 'loading' &&
    data && (
      <div className="favorites">
        <Header />
        <p>BAG {data.length}</p>
        <div>
          {data.map((item) => (
            <div key={item.id}>
              <div>
                <img src={item.product.images[0]} />
                <div>
                  <p>{item.product.name}</p>
                  <span>USD {item.product.price.value}</span>
                  <div>
                    <p>COLOR: {item.product.color.name}</p>
                    <p>SIZE: {item.product.availableSizes[0]}</p>
                    <p>QUANTITY: {1}</p>
                  </div>
                </div>
              </div>
              <span onClick={() => deleteProduct(item.id)}>
                <img src={remove_icon} /> <p>REMOVE</p>
              </span>
              <hr />
            </div>
          ))}
        </div>
        <Footer />
      </div>
    )
  );
};

export default Favorites;
