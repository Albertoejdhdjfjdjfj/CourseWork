import {
  SET_SHOP_CATEGORY,
  REQUEST_PRODUCTS,
  REQUEST_PRODUCTS_ERROR,
  REQUEST_PRODUCTS_SUCCESS,
  SET_SEARCH_TEXT,
  SET_SEARCH_DISPLAY,
  SET_USER_ID
} from '../actions/actionsTypes';

const initialState = {
  headerPage: {
    category: '',
    products: false,
    search: '',
    searchDisplay: false
  },
  user: {
    id: false
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SHOP_CATEGORY:
      return { ...state, headerPage: { ...state.headerPage, category: action.payload } };
    case REQUEST_PRODUCTS:
      return { ...state, headerPage: { ...state.headerPage, products: 'loading' } };
    case REQUEST_PRODUCTS_SUCCESS:
      return { ...state, headerPage: { ...state.headerPage, products: action.payload } };
    case REQUEST_PRODUCTS_ERROR:
      return { ...state, headerPage: { ...state.headerPage, products: false } };
    case SET_SEARCH_TEXT:
      return { ...state, headerPage: { ...state.headerPage, search: action.payload } };
    case SET_SEARCH_DISPLAY:
      return {
        ...state,
        headerPage: { ...state.headerPage, searchDisplay: !state.headerPage.searchDisplay }
      };
    case SET_USER_ID:
      return { ...state, user: { ...state.user, id: action.payload } };
    default:
      return state;
  }
}
