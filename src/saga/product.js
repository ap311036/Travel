import { put, takeEvery, call } from 'redux-saga/effects';
import { receiveProducts } from "../redux/actions";
import { getProduct } from './firebase';

export function* getAllProductSaga() {
  const products = yield call(getProduct);
  yield put(receiveProducts(products));
}

// // Our watcher Saga: 在每个 INCREMENT_ASYNC action spawn 一个新的 incrementAsync 任务
export default function* watchProductSaga() {
  try {
    const products = yield call(getProduct);
    yield put(receiveProducts(products));
  } catch (error) {
    // console.error(error);
  }
  yield takeEvery('GET_ALL_PRODUCT_SAGA', getAllProductSaga);
}
