import {
  SET_SHOP_CATEGORY,
  SET_SEARCH_TEXT,
  SET_SEARCH_DISPLAY,
} from '../actions/actionsTypes';

const initialState = {
  headerPage: {
    category: undefined,
    search: '',
    searchDisplay: false
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
    default:
      return state;
  }
}
