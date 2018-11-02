import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import mySaga from '../saga';
import createLogger from 'redux-logger';
import rootReducer from "./reducers";

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(sagaMiddleware, createLogger)
    )
  )
  sagaMiddleware.run(mySaga);
  return store;
}
export default configureStore;
