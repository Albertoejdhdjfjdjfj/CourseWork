import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import TopSection from './TopSection/TopSection';
import Categories from './CategoriesSection/Categories';
import Category from './Category/Category';
import SliderSection from './SliderSection/SliderSection';
import InstagramShop from './InstagramShop/InstagramShop';
import Footer from '../general/Footer/Footer';
import SearchResult from './SearchResult/SearchResult';
import Search from './Search/Search';
// import { fetchLiked,fetchBag } from '../../redux/actions/actions';

const HeaderPage = () => {
  const searchDisplay = useSelector((state) => state.headerPage.searchDisplay);

  return (
    <div>
      {searchDisplay ? <Search /> : <TopSection />}
      <SearchResult />
      <Categories />
      <Category />
      <SliderSection />
      <InstagramShop />
      <Footer />
    </div>
  );
};

export default HeaderPage;
