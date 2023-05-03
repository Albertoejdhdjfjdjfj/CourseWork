import {
  SET_SHOP_CATEGORY,
  SET_SEARCH_TEXT,
  SET_SEARCH_DISPLAY,
  REQUEST_LIKED,
  REQUEST_LIKED_SUCCESS,
  REQUEST_LIKED_ERROR,
  PUSH_LIKED,
  REMOVE_LIKED,
  REQUEST_BAG,
  REQUEST_BAG_SUCCESS,
  REQUEST_BAG_ERROR,
  PUSH_BAG,
  REMOVE_BAG
} from '../actions/actionsTypes';

const initialState = {
  headerPage: {
    category: undefined,
    search: '',
    searchDisplay: false
  },
  products: {
    liked: [],
    bag: []
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SHOP_CATEGORY:
      return { ...state, headerPage: { ...state.headerPage, category: action.payload } };
    case SET_SEARCH_TEXT:
      return { ...state, headerPage: { ...state.headerPage, search: action.payload } };
    case SET_SEARCH_DISPLAY:
      return {
        ...state,
        headerPage: { ...state.headerPage, searchDisplay: !state.headerPage.searchDisplay }
      };

    //======================================================================================

    case REQUEST_LIKED:
      return {
        ...state,
        products: { ...state.products, liked: [] }
      };
    case REQUEST_LIKED_SUCCESS:
      return {
        ...state,
        products: { ...state.products, liked: action.payload }
      };
    case REQUEST_LIKED_ERROR:
      return {
        ...state,
        products: { ...state.products, liked: false }
      };
    case PUSH_LIKED:
      return {
        ...state,
        products: { ...state.products, liked: [...state.products.liked, action.payload] }
      };
    case REMOVE_LIKED:
      return {
        ...state,
        products: {
          ...state.products,
          liked: state.products.liked.filter((obj) => obj._id !== action.payload._id)
        }
      };

    //================================================================================

    case REQUEST_BAG:
      return {
        ...state,
        products: { ...state.products, bag: [] }
      };
    case REQUEST_BAG_SUCCESS:
      return {
        ...state,
        products: { ...state.products, bag: action.payload }
      };
    case REQUEST_BAG_ERROR:
      return {
        ...state,
        products: { ...state.products, bag: false }
      };
    default:
      return state;
  }
}
