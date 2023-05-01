import { takeEvery, call, put, all } from 'redux-saga/effects';
import { FETCH_LIKED,DELETE_LIKED,ADD_LIKED } from '../actions/actionsTypes';
import {
  requestLiked,
  requestLikedSuccess,
  requestLikedError,
} from '../actions/actions';
import { host } from '../../assets/constans/config';

export function* rootSaga() {
  yield all([watchRequestLiked(),watchDeleteLiked(),watchAddLiked()]);
}

function* watchRequestLiked() {
  yield takeEvery(FETCH_LIKED, fetchLikedData);
}

function* watchDeleteLiked() {
  yield takeEvery(DELETE_LIKED, deleteLiked);
}

function* watchAddLiked() {
  yield takeEvery(ADD_LIKED, addLiked);
}

function* fetchLikedData(action) {
  try {
    yield put(requestLiked());
    const data = yield fetch(host + `products/liked`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
           Authorization: `Bearer ${action.payload}`
        }
      })
    
    if(data.status===400){
      return yield put(requestLikedError());
    }
    yield put(requestLikedSuccess(yield data.json()));
  } catch (error) {
    yield put(requestLikedError());
  }
}

function* deleteLiked(action) {
  yield call(() => {
      return fetch(host + 'products/liked/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${action.payload.token}`
        },
        body: JSON.stringify({
          id: action.payload.id
        })
      })})

      yield call(fetchLikedData, { payload: action.payload.token });
  
}

function* addLiked(action) {
  yield call(() => {
    return fetch(host + 'products/liked', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${action.payload.token}`
      },
      body: JSON.stringify({
        id: action.payload.id
      })
    })
  })

      yield call(fetchLikedData, { payload: action.payload.token });
  
}
