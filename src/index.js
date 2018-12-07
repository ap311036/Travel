import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/Router';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/index.scss';
import { Provider } from "react-redux";
import { configureStore } from './redux';
const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}

ReactDOM.render(
  <App/>
  , document.getElementById('root') || document.createElement('div')); // for testing purposes
registerServiceWorker();

export default App;
