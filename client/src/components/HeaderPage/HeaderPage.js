import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLiked, fetchBag } from '../../redux/actions/actions';
import Cookies from 'js-cookie';
import TopSection from './TopSection/TopSection';
import Categories from './CategoriesSection/Categories';
import Category from './Category/Category';
import SliderSection from './SliderSection/SliderSection';
import InstagramShop from './InstagramShop/InstagramShop';
import Footer from '../general/Footer/Footer';
import SearchResult from './SearchResult/SearchResult';
import Search from './Search/Search';

const HeaderPage = () => {
  const searchDisplay = useSelector((state) => state.headerPage.searchDisplay);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLiked(Cookies.get('modnikky_token')));
    dispatch(fetchBag(Cookies.get('modnikky_token')));
  }, []);

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
