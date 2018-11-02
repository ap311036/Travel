// import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import { checkFirebaseUserAuth, visitorRecord } from './firebase';
import { login, logout } from "../redux/actions";
// ...

// 登入的任務
export function* loginMemberSaga(action) {
  // yield delay(0)
  yield put(login(action.user));
}

// 登出的任務
export function* logoutMemberSaga(action) {
  // yield delay(0)
  yield put(logout(action));
}

export default function* watchLoginMemberSaga() {
  try {
    const user = yield call(checkFirebaseUserAuth);
    console.log(user);
    yield put(login(user));
  } catch (error) {
    console.error(error);
  }
  yield call(visitorRecord);
  yield takeEvery('LOGIN_MEMBER_SAGA', loginMemberSaga);
  yield takeEvery('LOGOUT_MEMBER_SAGA', logoutMemberSaga);
}
