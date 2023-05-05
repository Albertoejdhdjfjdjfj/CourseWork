import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchDisplay } from '../../../redux/actions/actions';
import Cookies from 'js-cookie';
import glass_black from '../../../assets/images/glass-black.svg';
import heart_black from '../../../assets/images/heart-black.svg';
import burger_black from '../../../assets/images/hamburger-menu-black.svg';
import pack_black from '../../../assets/images/shopping-cart-black.svg';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div>
        <img src={burger_black} className="menu_burger" />
        <p>NEW ARRIVALS</p>
        <p>SHOP</p>
        <p>COLLECTIONS</p>
      </div>

      <h1
        onClick={() => {
          navigate('/');
        }}
      >
        MODNIKKY
      </h1>

      <div>
        <p
          onClick={() => {
            dispatch(setSearchDisplay());
            navigate('/');
          }}
        >
          <img src={glass_black} /> SEARCH
        </p>
        <p
          onClick={() => {
            Cookies.get('modnikky_token')
              ? (Cookies.remove('modnikky_token'), navigate('/'))
              : navigate('/login');
          }}
        >
          {Cookies.get('modnikky_token') ? 'LOG OUT' : 'LOG IN'}
        </p>
        <p
          onClick={() => {
            navigate('/bag');
          }}
        >
          BAG
        </p>
        <img
          src={glass_black}
          onClick={() => {
            dispatch(setSearchDisplay());
            navigate('/');
          }}
          className="glass"
        />
        <img
          src={pack_black}
          onClick={() => {
            navigate('/bag');
          }}
          className="package"
        />
        <img
          src={heart_black}
          onClick={() => {
            navigate('/liked');
          }}
        />
      </div>
    </header>
  );
};

export default Header;
