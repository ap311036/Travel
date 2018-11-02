import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/Router';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/index.scss';
import rootReducer from "./redux/reducers";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import createSagaMiddleware from 'redux-saga';
import mySaga from './saga';
import createLogger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware, createLogger),
)
sagaMiddleware.run(mySaga);

ReactDOM.render(
    <Provider store={store}>
      <Routes/>
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
