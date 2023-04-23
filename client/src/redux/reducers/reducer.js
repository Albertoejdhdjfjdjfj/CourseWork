import {
  SET_SHOP_CATEGORY,
  SET_SEARCH_TEXT,
  SET_SEARCH_DISPLAY,
  ADD_LIKED,
  REQUEST_LIKED ,
  REQUEST_LIKED_SUCCESS,
  REQUEST_LIKED_ERROR
} from '../actions/actionsTypes';

const initialState = {
  headerPage: {
    category: '',
    search: '',
    searchDisplay: false
  },
  products: {
    liked: [],
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SHOP_CATEGORY:
      return { ...state, headerPage: { ...state.headerPage, category: action.payload } };
    case REQUEST_LIKED:
      return { ...state, products: { ...state.products, liked: 'loading' } };
    case REQUEST_LIKED_SUCCESS:
      return { ...state, products: { ...state.products, liked: action.payload } };
    case REQUEST_LIKED_ERROR:
      return { ...state, products: { ...state.products, liked: false } };
    case ADD_LIKED:
      return { ...state, products: { ...state.products, liked: state.products.liked.concat(action.payload) } };
    case SET_SEARCH_TEXT:
      return { ...state, headerPage: { ...state.headerPage, search: action.payload } };
    case SET_SEARCH_DISPLAY:
      return {
        ...state,headerPage: { ...state.headerPage, searchDisplay: !state.headerPage.searchDisplay }
      };
    default:
      return state;
  }
}
