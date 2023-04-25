import {
  SET_SEARCH_TEXT,
  SET_SEARCH_DISPLAY,
  SET_SHOP_CATEGORY
} from './actionsTypes';

import { createAction } from 'redux-actions';

export const setSearchText = createAction(SET_SEARCH_TEXT);

export const setSearchDisplay = createAction(SET_SEARCH_DISPLAY);

export const setShopCategory = createAction(SET_SHOP_CATEGORY);
