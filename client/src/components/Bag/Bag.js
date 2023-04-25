import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import Header from '../general/Header/Header';
import Footer from '../general/Footer/Footer';
import { host } from '../../assets/constans/config';
import remove_icon from '../../assets/images/remove-icon.svg';
import maestro_logo from '../../assets/images/maestro-logo.svg';
import visa_logo from '../../assets/images/visa-logo.svg';
import './Bag.css';

const Bag = () => {
  const [data,setData]=useState(false)
  const navigate=useNavigate()

  const fetchProduct = async() => {
    const req = await fetch(host + 'products/bag', {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${Cookies.get('modnikky_token')}`
      },
    });

    if (req.status == 400) {
      navigate('/login')
    }

    const res = await req.json();
    return setData(res);
  };

  const deleteProduct = async (id) => {
    const req= await fetch(host+'products/bag/delete', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${Cookies.get('modnikky_token')}`
       },
       body: JSON.stringify({
          id: id
       })
     })
 
     if (req.status == 400) {
      return navigate('/bag')
     }
 
     return fetchProduct()
   }; 

  useEffect(()=>{
     fetchProduct()
  },[]
)

  return (
      data&&<div className="bag">
        <Header />
        <p>BAG {data.length}</p>
        <div className="products">
          {data.map((item,index) => (
            <div key={index}>
              <div>
                <img src={item.product.images[0]} />
                <div>
                  <p>{item.product.name}</p>
                  <span>USD {item.product.price.value}</span>
                  <div>
                    <p>COLOR: {item.product.color.name}</p>
                    <p>SIZE: {item.product.availableSizes[0]}</p>
                  </div>
                </div>
              </div>
              <span onClick={()=>deleteProduct(item._id)}>
                <img src={remove_icon} /> <p>REMOVE</p>
              </span>
              <hr />
            </div>
          ))}
        </div>
        <span>
          <p>
            USD{' '}
            {data.reduce(function (sum, elem) {
              return sum + Number(elem.product.price.value);
            }, 0)}
          </p>
          <button
            onClick={() => {
              sendProducts();
            }}
          >
            PROCED TO CHECKOUT
          </button>
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
