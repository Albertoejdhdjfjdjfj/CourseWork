import React from 'react';
import { setShopCategory } from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import dress from '../../../assets/images/dress.svg';
import tees from '../../../assets/images/tees.svg';
import swimwear from '../../../assets/images/swimwear.svg';
import denim from '../../../assets/images/denim.svg';
import tops from '../../../assets/images/tops.svg';
import beauty from '../../../assets/images/beauty.svg';
import './Categories.css';

const Categories = () => { 
  const dispatch = useDispatch();
  const category = useSelector((state) => state.headerPage.category);

  const handleChangeStateBtns = (categoryName) => {
    if (category === categoryName) {
      dispatch(setShopCategory(undefined));
    } else {
      dispatch(setShopCategory(categoryName));
    }
  };

  return (
    <div className="categories">
      <h2>
        Shop by the <p>Category</p>
      </h2>
      <div>
        <div style={{backgroundColor: category==='Dresses'?'rgb(194, 194, 194)':''}}onClick={() => handleChangeStateBtns('Dresses')}>
          <img src={dress} />
          <p>Dresses</p>
        </div>
        <div style={{ backgroundColor: category==='Tees'?'rgb(194, 194, 194)':''}}onClick={() => handleChangeStateBtns('Tees')}>
          <img src={tees} />
          <p>Tees</p>
        </div>
        <div style={{ backgroundColor: category==='Swimwear'?'rgb(194, 194, 194)':''}}onClick={() => handleChangeStateBtns('Swimwear')}>
          <img src={swimwear} />
          <p>Swimwear</p>
        </div>
        <div style={{ backgroundColor: category==='Denim'?'rgb(194, 194, 194)':''}}onClick={() => handleChangeStateBtns('Denim')}>
          <img src={denim} />
          <p>Denim</p>
        </div>
        <div style={{ backgroundColor: category==='Tops'?'rgb(194, 194, 194)':''}}onClick={() => handleChangeStateBtns('Tops')}>
          <img src={tops} />
          <p>Tops</p>
        </div>
        <div style={{ backgroundColor: category==='Beauty'?'rgb(194, 194, 194)':''}}onClick={() => handleChangeStateBtns('Beauty')}>
          <img src={beauty} />
          <p>Beauty</p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
