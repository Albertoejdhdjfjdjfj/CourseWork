import React, { useEffect } from 'react';
import { fetchBag, deleteBag } from '../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import Header from '../general/Header/Header';
import Footer from '../general/Footer/Footer';
import remove_icon from '../../assets/images/remove-icon.svg';
import maestro_logo from '../../assets/images/maestro-logo.svg';
import visa_logo from '../../assets/images/visa-logo.svg';
import './Bag.css';

const Bag = () => {
  const data = useSelector((state) => state.products.bag);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(fetchBag(Cookies.get('modnikky_token')));
  }, []);

  useEffect(() => {
    if (!data) {
      navigate('/login');
    }
  }, [data]);

  return (
    <div className="bag">
      <Header />
      <p>BAG {data && data.length}</p>
      <div className="products">
        {data &&
          data.map((item, index) => (
            <div key={index}>
              <hr />
              <div onClick={() => navigate(`/product/${item._id}`)}>
                <img src={item.images[0]} />
                <div>
                  <p>{item.name}</p>
                  <span>USD {item.price.value}</span>
                  <div>
                    <p>COLOR: {item.color.name}</p>
                    <p>SIZE: {item.size}</p>
                  </div>
                </div>
              </div>
              <span
                onClick={() => {
                  dispatch(deleteBag({ product: item, token: Cookies.get('modnikky_token') }));
                }}
              >
                <img src={remove_icon} /> <p>REMOVE</p>
              </span>
            </div>
          ))}
      </div>
      <span>
        <p>
          USD{' '}
          {data &&
            data.reduce(function (sum, elem) {
              return sum + Number(elem.price.value);
            }, 0)}
        </p>
        <button>PROCED TO CHECKOUT</button>
        <div>
          <img src={maestro_logo} />
          <img src={visa_logo} />
        </div>
      </span>
      <Footer />
    </div>
  );
};

export default Bag;
