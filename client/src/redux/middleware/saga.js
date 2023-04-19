import { takeEvery, call, put, all } from 'redux-saga/effects';
import { FETCH_PRODUCTS } from '../actions/actionsTypes';
import { requestProducts, requestProductsError, requestProductsSuccess } from '../actions/actions';

export function* rootSaga() {
  yield all([watchRequestProducts()]);
}

export function* watchRequestProducts() {
  yield takeEvery(FETCH_PRODUCTS, fetchProductsData);
}

export function* fetchProductsData() {
  try {
    yield put(requestProducts());
    const data = yield call(() => {
      return fetch(`https://if-modnikky-api.onrender.com/api/catalog`).then((res) => res.json());
    });

    yield put(requestProductsSuccess(data));
  } catch (error) {
    yield put(requestProductsError());
  }
}
