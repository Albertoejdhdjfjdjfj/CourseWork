import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchDisplay } from '../../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Header.css';
import glass from '../../../assets/images/glass.svg';
import heart from '../../../assets/images/heart.svg';
import burger from '../../../assets/images/hamburger-menu-icon.svg';
import pack from '../../../assets/images/shopping-cart-icon.svg';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header>
      <div>
        <img src={burger} className="menu_burger" />
        <p>NEW ARRIVALS</p>
        <p>SHOP</p>
        <p>COLLECTIONS</p>
      </div>

      <h1>MODNIKKY</h1>

      <div>
        <p onClick={() => dispatch(setSearchDisplay())}>
          <img src={glass} /> SEARCH
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
          src={glass}
          onClick={() => {
            dispatch(setSearchDisplay());
          }}
          className="glass"
        />
        <img
          src={pack}
          onClick={() => {
            navigate('/bag');
          }}
          className="package"
        />
        <img
          src={heart}
          onClick={() => {
            navigate('/liked');
          }}
        />
      </div>
    </header>
  );
};

export default Header;
