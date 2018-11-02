import watchLoginMemberSaga from './member';
import watchCartSaga from './cart';
import watchProductSaga from "./product";
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    watchLoginMemberSaga(),
    watchCartSaga(),
    watchProductSaga(),
  ]);
}