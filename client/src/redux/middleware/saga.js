import { takeEvery, call, put, all } from 'redux-saga/effects';
// import { FETCH_LIKED, FETCH_BAG} from '../actions/actionsTypes';
// import {
//   requestLiked,
//   requestLikedError,
//   requestLikedSuccess,
//   requestBag,
//   requestBagError,
//   requestBagSuccess,
// } from '../actions/actions';
// import { host } from '../../assets/constans/config';

export function* rootSaga() {
  yield all([]);
}

// function* watchRequestLiked() {
//   yield takeEvery(FETCH_LIKED, fetchLikedData);
// }

// function* watchRequestBag() {
//   yield takeEvery(FETCH_BAG, fetchBagData);
// }

// function* fetchLikedData(action) {
//   try {
//     yield put(requestLiked());
//     const data = yield call(() => {
//       return fetch(host + `products/liked`, {
//         headers: {
//           'Content-Type': 'application/json;charset=utf-8',
//           Authorization: `Bearer ${action.payload}`
//         }
//       }).then((res) => res.json());
//     });
//     yield put(requestLikedSuccess(data));
//   } catch (error) {
//     yield put(requestLikedError());
//   }
// }

// function* fetchBagData(action) {
//   try {
//     yield put(requestBag());
//     const data = yield call(() => {
//       return fetch(host + `products/bag`, {
//         headers: {
//           'Content-Type': 'application/json;charset=utf-8',
//           Authorization: `Bearer ${action.payload}`
//         }
//       }).then((res) => res.json());
//     });
//     yield put(requestBagSuccess(data));
//   } catch (error) {
//     yield put(requestBagError());
//   }
// }

