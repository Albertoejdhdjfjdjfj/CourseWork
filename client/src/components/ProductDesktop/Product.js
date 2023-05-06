import React, { useState, useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addBag, addLiked, deleteLiked } from '../../redux/actions/actions';
import Cookies from 'js-cookie';
import Header from '../general/Header/Header';
import Footer from '../general/Footer/Footer';
import { host } from '../../assets/constans/config';
import likeHeart from '../../assets/images/like-heart.svg';
import heart from '../../assets/images/heart.svg';
import plus from '../../assets/images/plus.svg';
import minus from '../../assets/images/minus.svg';
import './Product.css';

const Product = memo(() => {
  const [product, setProduct] = useState(false);
  const [size, setSize] = useState();
  const { id } = useParams();
  const [descActive, setDescActive] = useState(false);
  const [shippAndReturnActive, setShippAndReturnActive] = useState(false);
  const [fabricComposActive, setFabricComposActive] = useState(false);

  const dispatch = useDispatch();
  const likedData = useSelector((state) => state.products.liked);

  useEffect(() => {
    const fetchProduct = async () => {
      await fetch(host + `products/id?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data), setSize(data.availableSizes[0].split(',')[0]);
        });
    };
    fetchProduct();
  }, []);

  return (
    <div className="product">
      <Header />
      {product && (
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
                  {product.availableSizes[0].split(',').map((element) => (
                    <p
                      key={element}
                      onClick={() => setSize(element)}
                      className={size === element ? 'activeSize' : ''}
                    >
                      {element}
                    </p>
                  ))}
                </div>
              </div>

              <button>
                <p
                  onClick={() =>
                    dispatch(
                      addBag({ product: product, size: size, token: Cookies.get('modnikky_token') })
                    )
                  }
                >
                  ADD TO BAG
                </p>
                <div
                  onClick={() =>
                    likedData && likedData.some((el) => el._id === product._id)
                      ? dispatch(
                          deleteLiked({ product: product, token: Cookies.get('modnikky_token') })
                        )
                      : dispatch(
                          addLiked({ product: product, token: Cookies.get('modnikky_token') })
                        )
                  }
                >
                  <img
                    src={
                      likedData && likedData.some((el) => el._id === product._id)
                        ? likeHeart
                        : heart
                    }
                  />
                </div>
              </button>
            </div>

            <div className="description">
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
      )}
      <Footer />
    </div>
  );
});

export default Product;
