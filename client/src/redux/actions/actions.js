import { SET_SEARCH_TEXT, SET_SEARCH_DISPLAY, SET_SHOP_CATEGORY,ADD_LIKED,DELETE_LIKED,FETCH_LIKED,REQUEST_LIKED,REQUEST_LIKED_SUCCESS,REQUEST_LIKED_ERROR } from './actionsTypes';

import { createAction } from 'redux-actions';

export const setSearchText = createAction(SET_SEARCH_TEXT);

export const setSearchDisplay = createAction(SET_SEARCH_DISPLAY);

export const setShopCategory = createAction(SET_SHOP_CATEGORY);

//==================================================================
export const addLiked = createAction(ADD_LIKED);

export const deleteLiked = createAction(DELETE_LIKED);

export const fetchLiked = createAction(FETCH_LIKED);

export const requestLiked = createAction(REQUEST_LIKED);

export const requestLikedSuccess = createAction(REQUEST_LIKED_SUCCESS);

export const requestLikedError = createAction(REQUEST_LIKED_ERROR);