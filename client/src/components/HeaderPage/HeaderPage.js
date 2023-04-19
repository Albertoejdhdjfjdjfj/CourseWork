import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TopSection from './TopSection/TopSection';
import Categories from './CategoriesSection/Categories';
import Category from './Category/Category';
import SliderSection from './SliderSection/SliderSection';
import InstagramShop from './InstagramShop/InstagramShop';
import Footer from '../Footer/Footer';
import SearchResult from './SearchResult/SearchResult';
import Search from './Search/Search';

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
