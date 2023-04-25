import React, { useState, useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../general/Header/Header';
import Footer from '../general/Footer/Footer';
import { host } from '../../assets/constans/config';
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


  useEffect(() => {
    const fetchProduct = async () => {
      await fetch(host+`products/id?id=${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    };
    fetchProduct();
  }, []);

  const addBag=async(item)=>{
    await fetch(host+'products/bag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('modnikky_token')}`
      },
      body: JSON.stringify(item)
    })
  }

  const addLiked=async(item)=>{
    await fetch(host+'products/liked', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('modnikky_token')}`
      },
      body: JSON.stringify(item)
    })
  }

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
                <p onClick={() => addBag(product)}>ADD TO BAG</p>
                <div onClick={() =>addLiked(product)}>
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
