import { takeEvery, call, put, all } from 'redux-saga/effects';
import { FETCH_LIKED, DELETE_LIKED, ADD_LIKED , FETCH_BAG, DELETE_BAG, ADD_BAG } from '../actions/actionsTypes';
import {
  removeLiked,
  pushLiked,
  requestLiked,
  requestLikedSuccess,
  requestLikedError,
  removeBag,
  pushBag,
  requestBag,
  requestBagSuccess,
  requestBagError
} from '../actions/actions';
import { host } from '../../assets/constans/config';

export function* rootSaga() {
  yield all([watchRequestLiked(), watchDeleteLiked(), watchAddLiked(),watchRequestBag(), watchDeleteBag(), watchAddBag()]);
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

function* watchRequestBag() {
  yield takeEvery(FETCH_BAG, fetchBagData);
}

function* watchDeleteBag() {
  yield takeEvery(DELETE_BAG, deleteBag);
}

function* watchAddBag() {
  yield takeEvery(ADD_BAG, addBag);
}

function* fetchLikedData(action) {
  try {
    // yield put(requestLiked());
    const data = yield fetch(host + `products/liked`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${action.payload}`
      }
    });

    if (data.status === 400) {
      return yield put(requestLikedError());
    }
    yield put(requestLikedSuccess(yield data.json()));
  } catch (error) {
    yield put(requestLikedError());
  }
}

function* deleteLiked(action) {
  yield put(removeLiked(action.payload.product));
  yield fetch(host + 'products/liked/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${action.payload.token}`
    },
    body: JSON.stringify({
      id: action.payload.product._id
    })
  });
}

function* addLiked(action) {
  yield put(pushLiked(action.payload.product));
  yield fetch(host + 'products/liked', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${action.payload.token}`
    },
    body: JSON.stringify({
      id: action.payload.product._id
    })
  });
}

function* fetchBagData(action) {
  try {
    const data = yield fetch(host + `products/bag`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${action.payload}`
      }
    });

    if (data.status === 400) {
      return yield put(requestBagError());
    }
    yield put(requestBagSuccess(yield data.json()));
  } catch (error) {
    yield put(requestBagError());
  }
}

function* deleteBag(action) {
  yield  fetch(host + 'products/bag/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${action.payload.token}`
    },
    body: JSON.stringify({
      id: action.payload.product._id
    })
  })

  yield call(fetchBagData,{payload:action.payload.token});
}

function* addBag(action) {
  yield fetch(host + 'products/bag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${action.payload.token}`
    },
    body: JSON.stringify({
      id: action.payload.product._id
    })
  });

  yield call(fetchBagData,{payload:action.payload.token});
}
