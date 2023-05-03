import {
  SET_SEARCH_TEXT,
  SET_SEARCH_DISPLAY,
  SET_SHOP_CATEGORY,
  ADD_LIKED,
  PUSH_LIKED,
  DELETE_LIKED,
  REMOVE_LIKED,
  FETCH_LIKED,
  REQUEST_LIKED,
  REQUEST_LIKED_SUCCESS,
  REQUEST_LIKED_ERROR,
  ADD_BAG,
  DELETE_BAG,
  FETCH_BAG,
  REQUEST_BAG,
  REQUEST_BAG_SUCCESS,
  REQUEST_BAG_ERROR
} from './actionsTypes';

import { createAction } from 'redux-actions';

export const setSearchText = createAction(SET_SEARCH_TEXT);

export const setSearchDisplay = createAction(SET_SEARCH_DISPLAY);

export const setShopCategory = createAction(SET_SHOP_CATEGORY);

//==================================================================

export const addLiked = createAction(ADD_LIKED);

export const pushLiked = createAction(PUSH_LIKED);

export const deleteLiked = createAction(DELETE_LIKED);

export const removeLiked = createAction(REMOVE_LIKED);

export const fetchLiked = createAction(FETCH_LIKED);

export const requestLiked = createAction(REQUEST_LIKED);

export const requestLikedSuccess = createAction(REQUEST_LIKED_SUCCESS);

export const requestLikedError = createAction(REQUEST_LIKED_ERROR);

//==================================================================

export const addBag = createAction(ADD_BAG);

export const deleteBag = createAction(DELETE_BAG);

export const fetchBag = createAction(FETCH_BAG);

export const requestBag = createAction(REQUEST_BAG);

export const requestBagSuccess = createAction(REQUEST_BAG_SUCCESS);

export const requestBagError = createAction(REQUEST_BAG_ERROR);
