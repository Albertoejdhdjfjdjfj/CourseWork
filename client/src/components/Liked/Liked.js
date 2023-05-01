import React, { useState, useEffect } from 'react';
import { fetchLiked,deleteLiked } from '../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import Header from '../general/Header/Header';
import Footer from '../general/Footer/Footer';
import { host } from '../../assets/constans/config';
import './Liked.css';
import remove_icon from '../../assets/images/remove-icon.svg';

const Liked = () => {
  const data=useSelector(state=>state.products.liked)
  const dispatch=useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchLiked(Cookies.get('modnikky_token')))
  }, []);

  useEffect(() => {
     if(!data){
      navigate('/login')
     }
  }, [data]);

  return (
    data && (
      <div className="liked">
        <Header />
        <p>BAG {data.length}</p>
        <div className="products">
          {data.map((item, index) => (
            <div key={index}>
              <div onClick={() => navigate(`/product/${item._id}`)}>
                <img src={item.images[0]} />
                <div>
                  <p>{item.name}</p>
                  <span>USD {item.price.value}</span>
                  <div>
                    <p>COLOR: {item.color.name}</p>
                    <p>SIZE: {item.availableSizes[0]}</p>
                  </div>
                </div>
              </div>
              <span onClick={() => {dispatch(deleteLiked({id:item._id,token:Cookies.get('modnikky_token')}));}}>
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

export default Liked;
