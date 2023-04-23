import { takeEvery, call, put, all } from 'redux-saga/effects';
import { FETCH_LIKED } from '../actions/actionsTypes';
import { requestLiked, requestLikedError, requestLikedSuccess } from '../actions/actions';
import { host } from '../../assets/constans/config';

export function* rootSaga() {
  yield all([watchRequestProducts()]);
}

function* watchRequestProducts() {
  yield takeEvery(FETCH_LIKED, fetchLikedData);
}

function* fetchLikedData(action) {
  try {
    yield put(requestLiked());
    const data = yield call(() => {
      return fetch(host+`products/liked`,
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${action.payload}`
        }
      }
      ).then((res) => res.json());
    });
     console.log(data)
    yield put(requestLikedSuccess(data));
  } catch (error) {
    yield put(requestLikedError());
  }
}
