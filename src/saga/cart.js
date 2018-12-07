// import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import { addToCart, removeFromCart, cleanCart } from "../redux/actions";
import { getLocal } from '../redux/reducers/cart';
import { toast } from "react-toastify";
// ...

// 加入購物車的任務
export function* addToCartSaga(action) {
  // yield delay(0);
  toast.success("成功加入購物車");
  yield put(addToCart(action));
}

// 刪除購物車某商品
export function* removeFromCartSaga(action) {
  toast.warn("已刪除此項目");
  yield put(removeFromCart(action));
}

// 清空購物車
export function* cleanCartSaga(action) {
  yield put(cleanCart(action));
}

// 購物清單加入db
// export function* putDbSaga(action) {
//   // const obj = yield call(addOrder, action.user, action.cart);
//   yield put(putDb(action, action.user, action.cart))
//   // yield put(cleanCart(action));
// }

// Our watcher Saga: 在每个 INCREMENT_ASYNC action spawn 一个新的 incrementAsync 任务
export default function* watchCartSaga() {
  try {
    const cart = yield call(getLocal);
    if(cart){
      for(let i = 0; i < cart.length; i++){
        yield put(addToCart({ type: 'ADD_TO_CART', cart: cart[i] }));
      }
    }
  } catch (error) {
    // localStroage 沒有購物車資料
    // console.error(error);
  }
  yield takeEvery('ADD_TO_CART_SAGA', addToCartSaga);
  yield takeEvery('REMOVE_FROM_CART_SAGA', removeFromCartSaga);
  yield takeEvery('CLEAN_CART_SAGA', cleanCartSaga);
  // yield takeEvery('PUT_DB_SAGA', putDbSaga);
}
