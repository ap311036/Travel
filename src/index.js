import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/Router';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/index.scss';
import { Provider } from "react-redux";
import { configureStore } from './redux';
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
      <Routes/>
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
