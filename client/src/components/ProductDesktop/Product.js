import React, { useState, useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import heart from '../../assets/images/heart.svg';
import plus from '../../assets/images/plus.svg';
import minus from '../../assets/images/minus.svg';
import './Product.css';

const Product = memo(() => {
  const [product, setProduct] = useState(false);
  const { id } = useParams();
  const [descActive, setDescActive] = useState(false);
  const [shippAndReturnActive, setShippAndReturnActive] = useState(false);
  const [fabricComposActive, setFabricComposActive] = useState(false);

  const products = useSelector((state) => state.headerPage.products);
  const userId = useSelector((state) => state.user.id);

  const addToBag = async () => {
    await fetch('http://localhost:3001/bag', {
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

  const addToFavorites = async () => {
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

  useEffect(() => {
    if (Array.isArray(products)) {
      setProduct(products.filter((item) => item.id === id)[0]);
    }
  }, [products]);

  return (
    product && (
      <div className="product">
        <Header />
        <div className="about_product">
          <span>
            <img src={product.images[0]} />
            <img src={product.images[1]} />
          </span>
          <div>
            <h3>{product.name}</h3>
            <span>
              {product.price.currency + ' '}${product.price.value}
            </span>
            <p>PRE-ORDER</p>

            <div>
              <div className="color">
                <p>COLOR</p>
                <div style={{ backgroundColor: product.color.hex }}></div>
              </div>

              <div className="size">
                <p>SIZE</p>
                <div>
                  {product.availableSizes.map((element) => (
                    <p key={element}>{element}</p>
                  ))}
                </div>
              </div>

              <button>
                <p onClick={addToBag}>ADD TO BAG</p>
                <div onClick={addToFavorites}>
                  <img src={heart} />
                </div>
              </button>
            </div>

            <div className="descrition">
              <div>
                <div onClick={() => setDescActive(!descActive)}>
                  <img src={descActive ? minus : plus} /> <p>PRODUCT DESCRIPTION</p>
                </div>
                {descActive && <p>{product.description}</p>}
              </div>

              <div>
                <div onClick={() => setShippAndReturnActive(!shippAndReturnActive)}>
                  <img src={shippAndReturnActive ? minus : plus} /> <p>SHIPPING & RETURNS</p>
                </div>
                <p></p>
              </div>

              <div>
                <div onClick={() => setFabricComposActive(!fabricComposActive)}>
                  <img src={fabricComposActive ? minus : plus} /> <p>FABRIC COMPOSITION</p>
                </div>
                <p></p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  );
});

export default Product;
